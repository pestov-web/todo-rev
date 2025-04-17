import { useState } from 'react';
import { AddEditModal, DeleteModal } from '../types/modals';

export const useDeleteModal = () => {
  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    isOpen: false,
    elementId: null,
    type: null,
  });

  const openDeleteModal = (type: DeleteModal['type'], elementId: number) => {
    setDeleteModal({
      isOpen: true,
      elementId: elementId,
      type: type,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      elementId: null,
      type: null,
    });
  };

  return {
    deleteModal,
    setDeleteModal,
    openDeleteModal,
    closeDeleteModal,
  };
};

export const useAddEditModal = () => {
  const [addEditModal, setAddEditModal] = useState<AddEditModal>({
    isOpen: false,
    type: null,
    variant: null,
    values: { id: null, name: '', categoryId: null, description: '' },
  });

  const openAddEditModal = (
    type: AddEditModal['type'],
    variant: AddEditModal['variant'],
    values?: AddEditModal['values']
  ) => {
    setAddEditModal({
      isOpen: true,
      type: type,
      variant: variant,
      values: values
        ? values
        : { id: null, name: '', categoryId: null, description: '' },
    });
  };

  const closeAddEditModal = () => {
    setAddEditModal({
      isOpen: false,
      type: null,
      variant: null,
      values: { id: null, name: '', categoryId: null, description: '' },
    });
  };

  return {
    addEditModal,
    setAddEditModal,
    openAddEditModal,
    closeAddEditModal,
  };
};
