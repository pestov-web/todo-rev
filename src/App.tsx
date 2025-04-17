import { Route, Routes } from 'react-router';
import Header from './components/ui/Header';
import List from './components/taskCategoryList/List';
import ReactModal from 'react-modal';
import FormModal from './components/forms/FormModal';
import DeleteDialog from './components/forms/DeleteDialog';
import { useAddEditModal, useDeleteModal } from './utils/useModal';
import { useData } from './utils/useData';
import AddEditForm from './components/forms/AddEditForm';
import { Category, Task } from './types/api';
import { AddEditModal } from './types/modals';

ReactModal.setAppElement('#root');

function App() {
  const { deleteModal, openDeleteModal, closeDeleteModal } = useDeleteModal();
  const { addEditModal, openAddEditModal, closeAddEditModal } =
    useAddEditModal();
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

  const handleDelete = async () => {
    if (!deleteModal.elementId || !deleteModal.type) return;
    if (deleteModal.type === 'task') {
      await deleteTask(deleteModal.elementId);
    } else {
      await deleteCategory(deleteModal.elementId);
    }
    closeDeleteModal();
  };

  const handleAddEdit = async (values: AddEditModal['values']) => {
    console.log(values);
    const { type, variant } = addEditModal;
    if (!type || !variant || !values) return;
    if (type === 'task') {
      if (variant === 'add') {
        await addTask(values as Task);
      } else if (variant === 'edit') {
        await updateTask(values as Task);
      }
    } else if (type === 'category') {
      if (variant === 'add') {
        await addCategory(values as Category);
      } else if (variant === 'edit') {
        await updateCategory(values as Category);
      }
    }

    closeAddEditModal();
  };

  return (
    <>
      <Header openAddEditModal={openAddEditModal} />
      <main className="main">
        <section>
          <Routes>
            <Route
              path="/"
              element={
                <List
                  data={tasks}
                  categories={categories}
                  loading={loading}
                  onDeleteClick={openDeleteModal}
                  openAddEditModal={openAddEditModal}
                />
              }
            />
            <Route
              path="/categories"
              element={
                <List
                  data={categories}
                  loading={loading}
                  onDeleteClick={openDeleteModal}
                  openAddEditModal={openAddEditModal}
                />
              }
            />
          </Routes>
        </section>
      </main>
      {/* Delete Modal */}
      <FormModal isOpen={deleteModal.isOpen} type="delete">
        <DeleteDialog
          modalData={deleteModal}
          onConfirm={handleDelete}
          closeDeleteModal={closeDeleteModal}
        />
      </FormModal>
      {/* Add/Edit Modal */}
      <FormModal isOpen={addEditModal.isOpen}>
        <AddEditForm
          categories={categories}
          modalData={addEditModal}
          closeModal={closeAddEditModal}
          onSubmit={handleAddEdit}
        />
      </FormModal>
    </>
  );
}

export default App;
