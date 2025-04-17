type TaskDialogProps = {
  onConfirm: () => Promise<void>;
  closeModal: () => void;
};

function RemoveTaskDialog(props: TaskDialogProps) {
  const { onConfirm, closeModal } = props;

  return (
    <div className="remove-task-dialog">
      <h2 className="modal__title">Удаление задачи</h2>
      <div className="remove-task-dialog__buttons">
        {' '}
        <button
          className="button remove-task-dialog__btn remove-task-dialog__btn_remove"
          onClick={onConfirm}
          type="button"
        >
          Да
        </button>
        <button
          className="button remove-task-dialog__btn remove-task-dialog__btn_close"
          onClick={closeModal}
          type="button"
        >
          Нет
        </button>
      </div>
    </div>
  );
}
export { RemoveTaskDialog };
