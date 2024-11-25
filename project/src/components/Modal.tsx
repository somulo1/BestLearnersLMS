import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showCloseButton?: boolean;
  preventClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'lg',
  showCloseButton = true,
  preventClose = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!preventClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-md w-[95%] sm:w-full',
    md: 'max-w-lg w-[95%] sm:w-full',
    lg: 'max-w-2xl w-[95%] sm:w-full',
    xl: 'max-w-4xl w-[95%] sm:w-full',
    '2xl': 'max-w-6xl w-[95%] sm:w-full',
    'full': 'max-w-[95vw] w-full',
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="min-h-screen px-4 text-center">
        {/* This element is to trick the browser into centering the modal contents. */}
        <span 
          className="inline-block h-screen align-middle" 
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block ${sizeClasses[size]} my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-xl`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white rounded-t-xl">
            <h3
              className="text-xl font-semibold text-gray-900 sm:text-2xl"
              id="modal-headline"
            >
              {title}
            </h3>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full transition-colors duration-200"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="relative max-h-[calc(90vh-8rem)] overflow-y-auto">
            <div className="px-6 py-4 sm:px-8 sm:py-6">
              {children}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .modal-open {
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .modal-content {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
