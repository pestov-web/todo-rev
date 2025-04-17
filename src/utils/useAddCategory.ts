import { useState } from 'react';
import { CategoryModal } from '../types/categoryModal';

export const useAddCategoryModal = () => {
  const initialModalValues = { id: null, name: '', description: '' };

  const [addCategoryModal, setAddCategoryModal] = useState<CategoryModal>({
    isOpen: false,
    values: initialModalValues,
  });

  const openAddCategoryModal = () => {
    setAddCategoryModal({
      isOpen: true,
      values: initialModalValues,
    });
  };

  const closeAddCategoryModal = () => {
    setAddCategoryModal({
      isOpen: false,
      values: initialModalValues,
    });
  };

  return {
    addCategoryModal,
    openAddCategoryModal,
    closeAddCategoryModal,
  };
};
