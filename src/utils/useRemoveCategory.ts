import { useState } from 'react';
import { RemoveCategoryModal } from '../types/removeCategoryModal';

type ResultType = {
  removeCategoryModal: RemoveCategoryModal;
  openRemoveCategoryModal: (elementId: number) => void;
  closeRemoveCategoryModal: () => void;
};

export const useRemoveCategoryModal = (): ResultType => {
  const [removeCategoryModal, setRemoveCategoryModal] =
    useState<RemoveCategoryModal>({
      isOpen: false,
      elementId: null,
    });

  const openRemoveCategoryModal = (elementId: number): void => {
    setRemoveCategoryModal({
      isOpen: true,
      elementId: elementId,
    });
  };

  const closeRemoveCategoryModal = (): void => {
    setRemoveCategoryModal({
      isOpen: false,
      elementId: null,
    });
  };

  return {
    removeCategoryModal,
    openRemoveCategoryModal,
    closeRemoveCategoryModal,
  };
};
