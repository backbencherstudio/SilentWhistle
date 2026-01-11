/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Set New Password Page
 * 
 * @page
 * @route /login/set-password
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useResetPasswordMutation } from '@/redux/features/auth/auth.api';
import { showDashboardToast } from '@/components/ui/CustomToast';

/**
 * Set New Password Page Component
 * 
 * Allows users to set a new password
 */
export default function SetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('resetEmail');
    const storedOtp = sessionStorage.getItem('resetOtp');

    if (!storedEmail || !storedOtp) {
      router.push('/login/forgot-password');
      return;
    }

    setEmail(storedEmail);
    setOtp(storedOtp);
  }, [router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) return;

    if (password !== confirmPassword) {
      showDashboardToast({
        variant: "error",
        title: "Request Failed",
        description: 'Passwords do not match',
      });
      return;
    }

    if (!email || !otp) return;

    try {
      const res = await resetPassword({
        email,
        otp,
        new_password: password,
      }).unwrap();

      if (res.success) {
        showDashboardToast({
          variant: "success",
          title: "Password Updated",
          description: res.message || "Your password has been updated successfully.",
        });

        sessionStorage.removeItem('resetOtp');
        sessionStorage.removeItem('resetEmail');

        router.push('/login/success');
      }
    } catch (error: any) {
      showDashboardToast({
        variant: "error",
        title: "Request Failed",
        description: error?.data?.message || 'Failed to reset password',
      });
    }
  };


  return (
    <div className="min-h-screen bg-[#05060f] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background Ellipse 1 - Bottom Left */}
      <Image src="/dashboard/bottom-light.svg" alt='bg bottm' width={1025} height={1025} className='hidden md:block absolute left-0 bottom-0 object-contain' />


      {/* Background Ellipse 2 - Top Right */}
      <Image src="/dashboard/top-light.svg" alt='bg top' width={1025} height={1025} className='hidden md:block absolute right-0 top-0 object-contain' />

      {/* Set Password Card */}
      <div className="relative z-10 w-full max-w-146 bg-[#101012] rounded-[24px] p-6 sm:p-7 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-3 w-full">
            <p className="text-white text-2xl font-medium font-['Inter'] leading-[1.3] tracking-[0.12px] w-full">
              Set New Password
            </p>
            <p className="text-white text-sm font-normal font-['Inter'] leading-[1.4] tracking-[0.07px] w-full">
              Make sure it&apos;s strong and unique to keep your account secure.
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6 items-center w-full">
            <div className="flex flex-col gap-5 w-full">
              {/* Password Field */}
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="password"
                  className="text-white text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.2px]"
                >
                  Password
                </label>
                <div className="bg-[#101010] border border-[rgba(255,255,255,0.2)] rounded-[56px] h-14 px-5 py-5 flex items-center justify-between">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent text-[#dfe1e7] text-base font-normal font-['Inter'] leading-[1.6] outline-none placeholder:text-[#dfe1e7] placeholder:opacity-60"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 w-6 h-6 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-white text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.2px]"
                >
                  Confirm Password
                </label>
                <div className="bg-[#101010] border border-[rgba(255,255,255,0.2)] rounded-[56px] h-14 px-5 py-5 flex items-center justify-between">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent text-[#dfe1e7] text-base font-normal font-['Inter'] leading-[1.6] outline-none placeholder:text-[#dfe1e7] placeholder:opacity-60"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-2 w-6 h-6 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Update Password Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-[48px] h-14 px-4.5 py-4 w-full transition-opacity ${isLoading
                ? 'bg-[#38e07b] opacity-60 cursor-not-allowed'
                : 'bg-[#38e07b] hover:opacity-90'
                }`}
            >
              <span className="text-[#1d1f2c] text-lg font-medium">
                {isLoading ? 'Updating...' : 'Update Password'}
              </span>
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

