/**
 * OTP Verification Page
 * 
 * @page
 * @route /login/otp-verify
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * OTP Verification Page Component
 * 
 * Allows users to enter 4-digit OTP code
 */
export default function OTPVerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Get email from sessionStorage
    const resetEmail = sessionStorage.getItem('resetEmail');
    if (resetEmail) {
      setEmail(resetEmail);
    } else {
      // If no email found, redirect to forgot password
      router.push('/login/forgot-password');
    }
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, [router]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < 4; i++) {
        newOtp[i] = pastedData[i] || '';
      }
      setOtp(newOtp);
      // Focus last filled input or last input
      const lastIndex = Math.min(pastedData.length - 1, 3);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length === 4) {
      // Accept any 4-digit code for now - verification will be added later
      console.log('OTP verification:', { email, otp: otpCode });
      // Navigate to set new password
      router.push('/login/set-password');
    }
  };

  const handleResend = () => {
    // TODO: Implement resend OTP logic
    console.log('Resend OTP to:', email);
    // Reset OTP inputs
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-[#05060f] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background Ellipse 1 - Bottom Left */}
      <div className="hidden md:block absolute left-[-97px] w-[525px] h-[525px] top-[707px] opacity-60 pointer-events-none">
        <div className="absolute inset-[-133.33%]">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain" 
            src="https://www.figma.com/api/mcp/asset/7ea6ac30-6a35-48e1-91ed-0d2ea924377f" 
          />
        </div>
      </div>

      {/* Background Ellipse 2 - Top Right */}
      <div className="hidden md:block absolute right-[-108px] w-[434px] h-[434px] top-[-108px] opacity-60 pointer-events-none">
        <div className="absolute inset-[-161.29%]">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain" 
            src="https://www.figma.com/api/mcp/asset/9b049881-d08e-4bc9-bda4-39ea741e6d49" 
          />
        </div>
      </div>

      {/* OTP Verification Card */}
      <div className="relative z-10 w-full max-w-[368px] bg-[#101012] rounded-[24px] p-6 sm:p-7 md:p-8">
        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-3 w-full">
            <p className="text-white text-2xl font-medium font-['Inter'] leading-[1.3] tracking-[0.12px] w-full">
              Enter OTP
            </p>
            <p className="text-white text-sm font-normal font-['Inter'] leading-[1.4] tracking-[0.07px] w-full">
              We have just sent you 4 digit code via your email {email || 'your email'}
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
                    className={`bg-[rgba(8,14,30,0.6)] border rounded-[40px] w-12 h-12 text-center text-white text-xl font-medium font-['Inter'] focus:outline-none transition-colors ${
                      isFocused || hasValue
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
                className="bg-[#38e07b] rounded-[48px] h-14 px-[18px] py-4 flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity"
              >
                <span className="text-[#1d1f2c] text-lg font-medium font-['Inter'] leading-[1.6]">
                  Verify
                </span>
              </button>

              {/* Resend Code Link */}
              <p className="text-[#d2d2d5] text-sm text-center font-normal font-['Inter'] leading-[1.6] tracking-[0.2px]">
                Didn't receive code?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#38e07b] hover:opacity-80 transition-opacity"
                >
                  Resend Code
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

