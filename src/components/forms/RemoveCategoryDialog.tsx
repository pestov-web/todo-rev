type RemoveCategoryDialogProps = {
  onConfirm: () => Promise<void>;
  closeModal: () => void;
};

function RemoveCategoryDialog(props: RemoveCategoryDialogProps) {
  const { onConfirm, closeModal } = props;

  return (
    <div className="remove-category-dialog">
      <h2 className="modal__title">Удаление категории</h2>
      <div className="remove-category-dialog__buttons">
        {' '}
        <button
          className="button remove-category-dialog__btn remove-category-dialog__btn_delete"
          onClick={onConfirm}
          type="button"
        >
          Да
        </button>
        <button
          className="button remove-category-dialog__btn remove-category-dialog__btn_close"
          onClick={closeModal}
          type="button"
        >
          Нет
        </button>
      </div>
    </div>
  );
}

export { RemoveCategoryDialog };
