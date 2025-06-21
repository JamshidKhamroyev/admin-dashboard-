import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ children, isOpen, onClose }) => {
  const { mode } = useSelector(state => state.mode);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`relative rounded-sm p-3 shadow-lg md:w-1/3 max-md:w-[96%] mx-auto ${
          mode ? 'bg-white text-[#010112]' : 'dark_mode'
        }`}
      >
        <button
          className="absolute cursor-pointer top-3 right-3 text-xl text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;