// components/Modal.js
import { useEffect } from 'react';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleEscape = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(100,100,100,0.5)] text-center"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-blue-950 rounded-lg shadow-lg p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl text-gray-500 dark:text-white hover:text-gray-800"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
