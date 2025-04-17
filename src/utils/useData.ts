import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/task.ts';
import { Category } from '../types/category.ts';
import { api } from './apiController';

export const useData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [tasksData, categoriesData] = await Promise.all([
        api.getTasks(),
        api.getCategories(),
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (error) {
      throw new Error(`${error}, Failed to fetch data`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTask = useCallback(async (task: Task) => {
    api
      .addTask(task)
      .then((res) => {
        setTasks((prev: Task[]) => [...prev, res]);
      })
      .catch((err) => {
        console.error('Ошибка:', err);
      });
  }, []);

  const updateTask = useCallback(async (task: Task) => {
    api
      .updateTask(task)
      .then((res) => {
        setTasks((prev: Task[]) =>
          prev.map((item: Task) => (item.id === task.id ? res : item))
        );
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    api
      .removeTask(id)
      .then(() => {
        setTasks((prev: Task[]) => prev.filter((task) => task.id !== id));
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });
  }, []);

  const addCategory = useCallback(async (category: Category) => {
    api
      .addCategory(category)
      .then((res) => {
        setCategories((prev: Category[]) => [...prev, res]);
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });
  }, []);

  const updateCategory = useCallback(async (category: Category) => {
    api
      .updateCategory(category)
      .then((res) => {
        setCategories((prev: Category[]) =>
          prev.map((item: Category) => (item.id === category.id ? res : item))
        );
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });
  }, []);

  const deleteCategory = useCallback(async (id: number) => {
    api
      .removeCategory(id)
      .then(() => {
        setCategories((prev: Category[]) =>
          prev.filter((category) => category.id !== id)
        );
        setTasks((prev: Task[]) =>
          prev.map((task) =>
            task.categoryId === id ? { ...task, categoryId: null } : task
          )
        );
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });
  }, []);

  return {
    tasks,
    categories,
    loading,
    addTask,
    updateTask,
    deleteTask,
    addCategory,
    updateCategory,
    deleteCategory,
    refreshData: fetchData,
  };
};
