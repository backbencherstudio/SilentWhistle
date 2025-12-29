/**
 * Password Reset Success Page
 * 
 * @page
 * @route /login/success
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Password Reset Success Page Component
 * 
 * Shows success message after password reset
 */
export default function SuccessPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // Clear session storage
    sessionStorage.removeItem('resetEmail');
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#05060f] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background Ellipse 1 - Bottom Left */}
      <div className="hidden md:block absolute left-[-97px] w-[525px] h-[525px] top-[707px] opacity-60 pointer-events-none">
        <div className="absolute inset-[-133.33%]">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain" 
            src="https://www.figma.com/api/mcp/asset/681597a3-efb1-4d6d-9ef4-8ddf2b8556a8" 
          />
        </div>
      </div>

      {/* Background Ellipse 2 - Top Right */}
      <div className="hidden md:block absolute right-[-108px] w-[434px] h-[434px] top-[-108px] opacity-60 pointer-events-none">
        <div className="absolute inset-[-161.29%]">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain" 
            src="https://www.figma.com/api/mcp/asset/7d3d5c4a-01ab-44b4-b050-be8539c35942" 
          />
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="relative z-10 w-full max-w-[368px] bg-[#0d130e] border border-[#1a1a1a] rounded-[16px] p-5 sm:p-6 md:p-8">
          <div className="flex flex-col gap-6 items-center w-full">
            {/* Success Message */}
            <div className="flex flex-col gap-2 text-center w-full">
              <p className="text-white text-2xl font-semibold font-['Inter'] leading-[1.3] tracking-[0.12px] w-full">
                Successful
              </p>
              <p className="text-[#e9e9ea] text-sm font-normal font-['Inter'] leading-[1.4] tracking-[0.07px] w-full">
                Your password has been updated successfully
              </p>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="bg-[#38e07b] rounded-[40px] h-12 px-[61px] py-3 flex items-center justify-center hover:opacity-90 transition-opacity w-full"
            >
              <span className="text-[#1d1f2c] text-lg font-medium font-['Inter'] leading-[1.6]">
                Login
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

