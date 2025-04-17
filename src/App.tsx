import { Route, Routes } from 'react-router';
import ReactModal from 'react-modal';

import { useData } from './utils/useData';
import { Header } from './components/ui/Header.tsx';
import { TaskList } from './components/taskCategoryList/TaskList.tsx';
import { CategoryList } from './components/taskCategoryList/CategoryList.tsx';

import { useRemoveTaskModal } from './utils/useRemoveTask.ts';
import { useRemoveCategoryModal } from './utils/useRemoveCategory.ts';
import { RemoveTaskDialog } from './components/forms/RemoveTaskDialog.tsx';
import { RemoveCategoryDialog } from './components/forms/RemoveCategoryDialog.tsx';
import { FormModal } from './components/forms/FormModal.tsx';
import { useAddTaskModal } from './utils/useAddTask.ts';

import { Task } from './types/task.ts';
import { AddTaskForm } from './components/forms/AddTaskForm.tsx';
import { Category } from './types/category.ts';
import { useAddCategoryModal } from './utils/useAddCategory.ts';
import { AddCategoryForm } from './components/forms/AddCategoryForm.tsx';
import { useEditTaskModal } from './utils/useEditTask.ts';
import { EditCategoryForm } from './components/forms/EditCategoryForm.tsx';
import { useEditCategoryModal } from './utils/useEditCategory.ts';
import { EditTaskForm } from './components/forms/EditTaskForm.tsx';

ReactModal.setAppElement('#root');

function App() {
  const {
    tasks,
    categories,
    loading,
    addTask,
    updateTask,
    deleteTask,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useData();

  const { removeTaskModal, openRemoveTaskModal, closeRemoveTaskModal } =
    useRemoveTaskModal();

  const {
    removeCategoryModal,
    openRemoveCategoryModal,
    closeRemoveCategoryModal,
  } = useRemoveCategoryModal();

  const { addTaskModal, openAddTaskModal, closeAddTaskModal } =
    useAddTaskModal();

  const { addCategoryModal, openAddCategoryModal, closeAddCategoryModal } =
    useAddCategoryModal();

  const { editTaskModal, openEditTaskModal, closeEditTaskModal } =
    useEditTaskModal();

  const { editCategoryModal, openEditCategoryModal, closeEditCategoryModal } =
    useEditCategoryModal();

  // удаление задачи
  const handleRemoveTask = async () => {
    await deleteTask(removeTaskModal.elementId as number);
    closeRemoveTaskModal();
  };

  // удаление категории
  const handleRemoveCategory = async () => {
    await deleteCategory(removeCategoryModal.elementId as number);
    closeRemoveCategoryModal();
  };

  // добавление задачи
  const handleAddTask = async (values: Task) => {
    await addTask(values);
    closeAddTaskModal();
  };

  // добавление категории
  const handleAddCategory = async (values: Category) => {
    await addCategory(values);
    closeAddCategoryModal();
  };

  // редактирование задачи
  const handleEditTask = async (values: Task) => {
    await updateTask(values);
    closeEditTaskModal();
  };

  // редактирование категории
  const handleEditCategory = async (values: Category) => {
    await updateCategory(values);
    closeEditCategoryModal();
  };

  return (
    <>
      <Header
        openAddTaskModal={openAddTaskModal}
        openAddCategoryModal={openAddCategoryModal}
      />
      <main className="main">
        <section>
          <Routes>
            <Route
              path="/"
              element={
                <TaskList
                  data={tasks}
                  categories={categories}
                  loading={loading}
                  openRemoveModal={openRemoveTaskModal}
                  openEditModal={openEditTaskModal}
                />
              }
            />
            <Route
              path="/categories"
              element={
                <CategoryList
                  data={categories}
                  loading={loading}
                  openRemoveModal={openRemoveCategoryModal}
                  openEditModal={openEditCategoryModal}
                />
              }
            />
          </Routes>
        </section>
      </main>
      {/* Remove Modals */}
      <FormModal isOpen={removeTaskModal.isOpen} type="delete">
        <RemoveTaskDialog
          onConfirm={handleRemoveTask}
          closeModal={closeRemoveTaskModal}
        />
      </FormModal>
      <FormModal isOpen={removeCategoryModal.isOpen} type="delete">
        <RemoveCategoryDialog
          onConfirm={handleRemoveCategory}
          closeModal={closeRemoveCategoryModal}
        />
      </FormModal>
      {/* Add/Edit Modal */}
      <FormModal isOpen={addTaskModal.isOpen}>
        <AddTaskForm
          categories={categories}
          closeModal={closeAddTaskModal}
          onSubmit={handleAddTask}
        />
      </FormModal>
      <FormModal isOpen={addCategoryModal.isOpen}>
        <AddCategoryForm
          closeModal={closeAddCategoryModal}
          onSubmit={handleAddCategory}
        />
      </FormModal>
      <FormModal isOpen={editCategoryModal.isOpen}>
        <EditCategoryForm
          modalData={editCategoryModal.values}
          closeModal={closeEditCategoryModal}
          onSubmit={handleEditCategory}
        />
      </FormModal>
      <FormModal isOpen={editTaskModal.isOpen}>
        <EditTaskForm
          categories={categories}
          modalData={editTaskModal.values}
          closeModal={closeEditTaskModal}
          onSubmit={handleEditTask}
        />
      </FormModal>
    </>
  );
}

export { App };
