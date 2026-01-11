/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';
import { useResendVerficationMutation, useVerifyOtpMutation } from '@/redux/features/auth/auth.api';
import { showDashboardToast } from '@/components/ui/CustomToast';

export default function OTPVerifyPage() {
  const router = useRouter();

  const OTP_LENGTH = 6;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [email, setEmail] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendVerification, { isLoading: isResending }] =
    useResendVerficationMutation();

  useEffect(() => {
    const resetEmail = sessionStorage.getItem('resetEmail');

    if (!resetEmail) {
      router.push('/login/forgot-password');
      return;
    }

    setEmail((prev) => (prev === null ? resetEmail : prev));
    inputRefs.current[0]?.focus();
  }, [router]);


  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, OTP_LENGTH);

    if (!/^\d+$/.test(pasted)) return;

    const updatedOtp = [...otp];
    pasted.split('').forEach((char, i) => {
      updatedOtp[i] = char;
    });

    setOtp(updatedOtp);
    inputRefs.current[Math.min(pasted.length - 1, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join('');
    if (otpCode.length !== OTP_LENGTH) return;

    try {
      const res = await verifyOtp({
        email: email!,
        otp: otpCode,
      }).unwrap();

      if (res.success) {
        showDashboardToast({
          variant: "success",
          title: "OTP Verified",
          description: "Your OTP has been verified successfully.",
        });

        sessionStorage.setItem('resetOtp', otpCode);
        router.push('/login/set-password');
      }
    } catch (err: any) {
      showDashboardToast({
        variant: "error",
        title: "Verification Failed",
        description: err?.data?.message || "Invalid or expired OTP.",
      });
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      await resendVerification({ email }).unwrap();

      showDashboardToast({
        variant: "success",
        title: "OTP Sent",
        description: "A new OTP has been sent to your email.",
      });

      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      showDashboardToast({
        variant: "error",
        title: "Request Failed",
        description: err?.data?.message || "Failed to resend OTP. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#05060f] flex items-center justify-center p-4">
      <div className="w-full max-w-92 bg-[#101012] rounded-[24px] p-8">
        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-3 w-full">
            <p className="text-white text-2xl font-medium font-['Inter'] leading-[1.3] tracking-[0.12px] w-full">
              Enter OTP
            </p>
            <p className="text-white text-sm font-normal font-['Inter'] leading-[1.4] tracking-[0.07px] w-full">
              We have just sent you a 6-digit code via your email {email}
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6 items-center w-full">
            {/* OTP Input Fields */}
            <div className="flex gap-4 w-full justify-center">
              {otp.map((digit, index) => {
                const isFocused = focusedIndex === index;
                const hasValue = digit !== '';
                return (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={() => {
                      setFocusedIndex(index);
                      inputRefs.current[index]?.select();
                    }}
                    onBlur={() => setFocusedIndex(null)}
                    className={`bg-[rgba(8,14,30,0.6)] border rounded-[40px] w-10 h-10 text-center text-white text-xl font-medium font-['Inter'] focus:outline-none transition-colors ${isFocused || hasValue
                      ? 'border-[#00c27a]'
                      : 'border-[rgba(255,255,255,0.05)]'
                      }`}
                  />
                );
              })}
            </div>

            {/* Verify Button */}
            <div className="flex flex-col gap-3 w-full">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#38e07b] rounded-[48px] h-14 px-4.5 py-4 flex items-center justify-center gap-2.5 transition-opacity cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
              >
                <span className="text-[#1d1f2c] text-lg font-medium font-['Inter'] leading-[1.6]">
                  {isLoading ? 'Verifying...' : 'Verify'}
                </span>
              </button>

              {/* Resend Code Link */}
              <p className="text-[#d2d2d5] text-sm text-center font-normal font-['Inter'] leading-[1.6] tracking-[0.2px]">
                Didn&apos;t receive code?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className={`text-[#38e07b] transition-opacity cursor-pointer ${isResending ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
                    }`}
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
