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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(100,100,100,0.5)] text-center "
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-blue-950 rounded-lg shadow-lg p-6 w-full min-w-md mx-140 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-10 text-2xl text-gray-500 dark:text-white hover:text-blue-500"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
