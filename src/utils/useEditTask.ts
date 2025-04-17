import { useState } from 'react';
import { TaskModal } from '../types/taskModal';
import { Task } from '../types/task';

export const useEditTaskModal = () => {
  const initialModalValues = {
    id: null,
    name: '',
    categoryId: null,
    description: '',
  };

  const [editTaskModal, setEditTaskModal] = useState<TaskModal>({
    isOpen: false,
    values: initialModalValues,
  });

  const openEditTaskModal = (values: Task) => {
    setEditTaskModal({
      isOpen: true,
      values: values,
    });
  };

  const closeEditTaskModal = () => {
    setEditTaskModal({
      isOpen: false,
      values: initialModalValues,
    });
  };

  return {
    editTaskModal,
    openEditTaskModal,
    closeEditTaskModal,
  };
};
