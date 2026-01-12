/**
 * Password Reset Success Page
 * 
 * @page
 * @route /login/success
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
      <Image src="/dashboard/bottom-light.svg" alt='bg bottm' width={1025} height={1025} className='hidden md:block absolute left-0 bottom-0 object-contain' />


      {/* Background Ellipse 2 - Top Right */}
      <Image src="/dashboard/top-light.svg" alt='bg top' width={1025} height={1025} className='hidden md:block absolute right-0 top-0 object-contain' />

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

