import { DeleteModal } from '../../types/modals';

function DeleteDialog({
  modalData,
  onConfirm,
  closeDeleteModal,
}: {
  modalData: DeleteModal;
  onConfirm: () => Promise<void>;
  closeDeleteModal: () => void;
}) {
  const handleDelete = async () => {
    try {
      await onConfirm();
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting item:', error);
      throw new Error(`Failed to delete ${modalData.type}: ${error}`);
    }
  };

  const handleClose = () => {
    closeDeleteModal();
  };

  return (
    <div className="delete-dialog">
      <h2 className="modal__title">
        {modalData.type === 'task' ? 'Удаление задачи' : 'Удаление категории'}
      </h2>
      <div className="delete-dialog__buttons">
        {' '}
        <button
          className="button delete-dialog__btn delete-dialog__btn_delete"
          onClick={handleDelete}
          type="button"
        >
          Да
        </button>
        <button
          className="button delete-dialog__btn delete-dialog__btn_close"
          onClick={handleClose}
          type="button"
        >
          Нет
        </button>
      </div>
    </div>
  );
}

export default DeleteDialog;
