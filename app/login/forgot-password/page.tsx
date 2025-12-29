/**
 * Forgot Password Page
 * 
 * @page
 * @route /login/forgot-password
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Forgot Password Page Component
 * 
 * Allows users to enter their email to receive OTP
 */
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Store email for OTP verification page
      sessionStorage.setItem('resetEmail', email);
      // Navigate to OTP verification
      router.push('/login/otp-verify');
    }
  };

  return (
    <div className="min-h-screen bg-[#05060f] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background Ellipse 1 - Bottom Left */}
      <div className="hidden md:block absolute left-[-97px] w-[525px] h-[525px] top-[707px] opacity-60 pointer-events-none">
        <div className="absolute inset-[-133.33%]">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain" 
            src="https://www.figma.com/api/mcp/asset/67cc15b8-8b07-4aee-b6fb-25e1009a5cc1" 
          />
        </div>
      </div>

      {/* Background Ellipse 2 - Top Right */}
      <div className="hidden md:block absolute right-[-108px] w-[434px] h-[434px] top-[-108px] opacity-60 pointer-events-none">
        <div className="absolute inset-[-161.29%]">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain" 
            src="https://www.figma.com/api/mcp/asset/88a4934f-2cf1-4902-b642-36304ad01f6f" 
          />
        </div>
      </div>

      {/* Forgot Password Card */}
      <div className="relative z-10 w-full max-w-[584px] bg-[#101012] rounded-[24px] p-6 sm:p-7 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-0 w-full">
            <p className="text-white text-2xl font-medium font-['Inter'] leading-[1.3] tracking-[0.12px] w-full">
              Forgot Password
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6 w-full">
            {/* Email Field */}
            <div className="flex flex-col gap-[7px] w-full">
              <label 
                htmlFor="email" 
                className="text-[#b2b5b8] text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px]"
              >
                Email
              </label>
              <div className="border border-[#1d1f2c] rounded-[48px] h-14 px-[18px] py-4 flex items-center bg-[#101012]">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demoinfo@gmail.com"
                  className="flex-1 bg-transparent text-[#dfe1e7] text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px] outline-none placeholder:text-[#dfe1e7] placeholder:opacity-60"
                  required
                />
              </div>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="bg-[#38e07b] rounded-[48px] h-14 px-[18px] py-4 flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <span className="text-[#1d1f2c] text-lg font-medium font-['Inter'] leading-[1.6]">
                Send
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

