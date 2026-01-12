/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Forgot Password Page
 * 
 * @page
 * @route /login/forgot-password
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForgotPasswordMutation } from '@/redux/features/auth/auth.api';
import { showDashboardToast } from '@/components/ui/CustomToast';

/**
 * Forgot Password Page Component
 * 
 * Allows users to enter their email to receive OTP
 */
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showDashboardToast({
        variant: "error",
        title: "Email Required",
        description: "Please enter your email to continue.",
      });
      return;
    }

    try {
      const res = await forgotPassword({ email }).unwrap();

      showDashboardToast({
        variant: "success",
        title: "OTP Sent",
        description: res.message || "An OTP has been sent to your email.",
      });

      sessionStorage.setItem("resetEmail", email);


      setTimeout(() => {
        router.push("/login/otp-verify");
      }, 400);

    } catch (error: any) {
      showDashboardToast({
        variant: "error",
        title: "Request Failed",
        description: error?.data?.message || "Something went wrong. Try again.",
      });

    }
    router.push('/login/otp-verify');
  };

  return (
    <div className="min-h-screen bg-[#05060f] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Image src="/dashboard/bottom-light.svg" alt='bg bottm' width={1025} height={1025} className='hidden md:block absolute left-0 bottom-0 object-contain' />


      {/* Background Ellipse 2 - Top Right */}
      <Image src="/dashboard/top-light.svg" alt='bg top' width={1025} height={1025} className='hidden md:block absolute right-0 top-0 object-contain' />
      {/* Forgot Password Card */}
      <div className="relative z-10 w-full max-w-146 bg-[#101012] rounded-[24px] p-6 sm:p-7 md:p-8">
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
            <div className="flex flex-col gap-1.75 w-full">
              <label
                htmlFor="email"
                className="text-[#b2b5b8] text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px]"
              >
                Email
              </label>
              <div className="border border-[#1d1f2c] rounded-[48px] h-14 px-4.5 py-4 flex items-center bg-[#101012]">
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
              className="bg-[#38e07b] rounded-[48px] h-14 px-4.5 py-4 flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <span className="text-[#1d1f2c] text-lg font-medium font-['Inter'] leading-[1.6]">
                {isLoading ? "Sending..." : "Send"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

