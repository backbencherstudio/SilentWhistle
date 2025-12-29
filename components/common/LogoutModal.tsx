/**
 * Logout Confirmation Modal Component
 * 
 * A modal component that asks for confirmation before logging out.
 * Matches the current UI design with dark theme and responsive layout.
 * 
 * @component
 * @example
 * <LogoutModal isOpen={true} onClose={() => {}} onConfirm={() => {}} />
 */

'use client';

import { useEffect } from 'react';

/**
 * Props for LogoutModal component
 */
interface LogoutModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback function to close the modal */
  onClose: () => void;
  /** Callback function to confirm logout */
  onConfirm: () => void;
}

/**
 * Logout Confirmation Modal Component
 * 
 * Displays a confirmation dialog before logging out
 */
export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
        aria-hidden="true"
      >
        {/* Modal Content */}
        <div
          className="relative z-[101] w-full max-w-[400px] bg-[#101012] border border-[#1a1a1a] rounded-[16px] p-6 sm:p-7 md:p-8 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-6 w-full">
            {/* Modal Header */}
            <div className="flex flex-col gap-2 text-center w-full">
              <p className="text-white text-2xl font-semibold font-['Inter'] leading-[1.3] tracking-[0.12px] w-full">
                Confirm Logout
              </p>
              <p className="text-[#b2b5b8] text-sm font-normal font-['Inter'] leading-[1.4] tracking-[0.07px] w-full">
                Are you sure you want to log out? You will need to sign in again to access your account.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Cancel Button */}
              <button
                onClick={onClose}
                className="flex-1 bg-[#181818] border border-[#1d1f2c] rounded-[48px] h-12 px-6 py-3 flex items-center justify-center hover:bg-[#1f1f1f] hover:border-[#2a2a2a] transition-all duration-200"
              >
                <span className="text-white text-base font-medium font-['Inter'] leading-[1.6]">
                  Cancel
                </span>
              </button>

              {/* Confirm Logout Button */}
              <button
                onClick={onConfirm}
                className="flex-1 bg-[#38e07b] rounded-[48px] h-12 px-6 py-3 flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span className="text-[#1d1f2c] text-base font-medium font-['Inter'] leading-[1.6]">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

