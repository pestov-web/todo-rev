import { useState } from 'react';
import { TaskModal } from '../types/taskModal';

export const useAddTaskModal = () => {
  const initialModalValues = {
    id: null,
    name: '',
    categoryId: null,
    description: '',
  };

  const [addTaskModal, setAddTaskModal] = useState<TaskModal>({
    isOpen: false,
    values: initialModalValues,
  });

  const openAddTaskModal = () => {
    setAddTaskModal({
      isOpen: true,
      values: initialModalValues,
    });
  };

  const closeAddTaskModal = () => {
    setAddTaskModal({
      isOpen: false,
      values: initialModalValues,
    });
  };

  return {
    addTaskModal,
    openAddTaskModal,
    closeAddTaskModal,
  };
};
