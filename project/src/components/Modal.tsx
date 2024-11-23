import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-lg', // Increased size for smaller modals
    md: 'max-w-xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-[90vw]',
    'full': 'max-w-[98vw]', // Nearly full width for larger modals
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-8 pt-8 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} sm:max-h-[95vh]`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white px-8 py-6 sm:px-10">
            <div className="flex items-center justify-between">
              <h3
                className="text-2xl font-semibold leading-8 text-gray-900"
                id="modal-headline"
              >
                {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-full p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[calc(95vh-10rem)] overflow-y-auto px-8 py-6 sm:px-10 text-base sm:text-lg">
            <div className="relative">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
