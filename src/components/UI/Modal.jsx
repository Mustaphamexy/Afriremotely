import React from 'react'

const Modal = ({ children, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-lg" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex justify-end p-4 border-b border-neutral-200">
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal