import "../styles/Modal.css";
/**
 * a popup modal
 */
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }
  
  export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null; 
  
    return (
      <div
        className="modal-overlay"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-container">
          <div className="modal-header">
            <h2>{title}</h2>
            <button
              onClick={onClose}
              className="modal-close-btn"
            >
              &times;
            </button>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    );
  };