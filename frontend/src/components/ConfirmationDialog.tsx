import { Modal } from "./Modal";
import "../styles/ConfirmationDialog.css";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
  }
  
  export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
  }) => {
    if (!isOpen) return null;
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-actions">
          <button
            onClick={onClose}
            className="confirmation-actions-btn confirmation-cancel-btn"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="confirmation-actions-btn confirmation-confirm-btn"
          >
            Confirm
          </button>
        </div>
      </Modal>
    );
  };