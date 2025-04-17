import axios, { AxiosResponse } from 'axios';
import { Category, Task } from '../types/api';

class Api {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  // POST
  private async post<T>(endpoint: string, data?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(
        `${this.baseUrl}${endpoint}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to POST to ${endpoint}: ${error}`);
    }
  }

  // Получение всех задач
  async getTasks(): Promise<Task[]> {
    try {
      const response: AxiosResponse<Task[]> = await axios.get(
        `${this.baseUrl}/GetTasks`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch tasks: ${error}`);
    }
  }

  // Получение всех категорий
  async getCategories(): Promise<Category[]> {
    try {
      const response: AxiosResponse<Category[]> = await axios.get(
        `${this.baseUrl}/GetCategories`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch categories: ${error}`);
    }
  }

  // Удаление задачи
  async removeTask(taskId: number): Promise<number> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/RemoveTask/${taskId}`
      );
      return response.status;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete task: ${error}`);
    }
  }

  // Удаление категории
  async removeCategory(categoryId: number): Promise<number> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/RemoveCategory/${categoryId}`
      );
      return response.status;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete category: ${error}`);
    }
  }

  // Добавление задачи
  async addTask(payload: Task): Promise<Task> {
    return this.post<Task>('/AddTask', payload);
  }

  // Добавление категории
  async addCategory(payload: Category): Promise<Category> {
    return this.post<Category>('/AddCategory', {
      name: payload.name,
      description: payload.description,
    });
  }

  // Обновление задачи
  async updateTask(payload: Task): Promise<Task> {
    return this.post<Task>('/UpdateTask', payload);
  }

  // Обновление категории
  async updateCategory(payload: Category): Promise<Category> {
    return this.post<Category>('/UpdateCategory', {
      id: payload.id,
      name: payload.name,
      description: payload.description,
    });
  }
}

const api = new Api(
  import.meta.env.VITE_API_URL || 'http://localhost:8089/api/ToDoList'
);

export default api;
