import { useState } from 'react';
import { RemoveTaskModal } from '../types/removeTaskModal';

type ResultType = {
  removeTaskModal: RemoveTaskModal;
  openRemoveTaskModal: (elementId: number) => void;
  closeRemoveTaskModal: () => void;
};

export const useRemoveTaskModal = (): ResultType => {
  const [removeTaskModal, setRemoveTaskModal] = useState<RemoveTaskModal>({
    isOpen: false,
    elementId: null,
  });

  const openRemoveTaskModal = (elementId: number): void => {
    setRemoveTaskModal({
      isOpen: true,
      elementId: elementId,
    });
  };

  const closeRemoveTaskModal = (): void => {
    setRemoveTaskModal({
      isOpen: false,
      elementId: null,
    });
  };

  return {
    removeTaskModal,
    openRemoveTaskModal,
    closeRemoveTaskModal,
  };
};
