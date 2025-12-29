/**
 * Set New Password Page
 * 
 * @page
 * @route /login/set-password
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Set New Password Page Component
 * 
 * Allows users to set a new password
 */
export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && confirmPassword && password === confirmPassword) {
      // Accept any password for now - validation will be added later
      console.log('Password updated');
      // Show success modal and navigate
      router.push('/login/success');
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
            src="https://www.figma.com/api/mcp/asset/de9931af-84a6-4c5f-a5ec-fc3b310a2935" 
          />
        </div>
      </div>

      {/* Background Ellipse 2 - Top Right */}
      <div className="hidden md:block absolute right-[-108px] w-[434px] h-[434px] top-[-108px] opacity-60 pointer-events-none">
        <div className="absolute inset-[-161.29%]">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain" 
            src="https://www.figma.com/api/mcp/asset/59f7df12-74b2-43a9-b4a0-ff579c22d464" 
          />
        </div>
      </div>

      {/* Set Password Card */}
      <div className="relative z-10 w-full max-w-[584px] bg-[#101012] rounded-[24px] p-6 sm:p-7 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-3 w-full">
            <p className="text-white text-2xl font-medium font-['Inter'] leading-[1.3] tracking-[0.12px] w-full">
              Set New Password
            </p>
            <p className="text-white text-sm font-normal font-['Inter'] leading-[1.4] tracking-[0.07px] w-full">
              Make sure it's strong and unique to keep your account secure.
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
              className="bg-[#38e07b] rounded-[48px] h-14 px-[18px] py-4 flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity w-full"
            >
              <span className="text-[#1d1f2c] text-lg font-medium font-['Inter'] leading-[1.6]">
                Update Password
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

