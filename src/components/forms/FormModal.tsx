import ReactModal from 'react-modal';

function FormModal({
  children,
  isOpen,
  type,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  type?: string;
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      className={`modal modal_${type}`}
      overlayClassName="modal__overlay"
    >
      {children}
    </ReactModal>
  );
}

export default FormModal;
