"use client";

import Close from "@/Components/Icons/Close";
import ReactModal from "react-modal";

const Modal = ({ isOpen, onClose, className, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <button onClick={onClose} className="cursor-pointer">
        <Close className="w-6 h-6 mb-6" />
      </button>

      <div className={className}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
