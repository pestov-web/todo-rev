import { useState } from 'react';
import { CategoryModal } from '../types/categoryModal';
import { Category } from '../types/category';

export const useEditCategoryModal = () => {
  const initialModalValues = { id: null, name: '', description: '' };

  const [editCategoryModal, setEditCategoryModal] = useState<CategoryModal>({
    isOpen: false,
    values: initialModalValues,
  });

  const openEditCategoryModal = (values: Category) => {
    setEditCategoryModal({
      isOpen: true,
      values: values,
    });
  };

  const closeEditCategoryModal = () => {
    setEditCategoryModal({
      isOpen: false,
      values: initialModalValues,
    });
  };

  return {
    editCategoryModal,
    openEditCategoryModal,
    closeEditCategoryModal,
  };
};
