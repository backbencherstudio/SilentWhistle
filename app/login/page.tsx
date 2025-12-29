/**
 * Login Page
 * 
 * @page
 * @route /login
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { UserService } from '@/service/user/user.service';

/**
 * Login Page Component
 * 
 * Renders the login page with email and password fields
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (UserService.isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept any email/password for now - verification will be added later
    if (email && password) {
      // Set authentication token (using a simple token for now)
      // TODO: Replace with actual token from API response
      UserService.setAuthToken('authenticated');
      console.log('Login attempt:', { email, password });
      // Navigate to dashboard after successful login
      router.push('/dashboard');
    }
  };

  const handleForgotPassword = () => {
    router.push('/login/forgot-password');
  };

  return (
    <div className="min-h-screen bg-[#05060f] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background Ellipse 1 - Bottom Left */}
      <div className="hidden md:block absolute left-[-97px] w-[525px] h-[525px] top-[707px] opacity-60 pointer-events-none">
        <div className="absolute inset-[-133.33%]">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain" 
            src="https://www.figma.com/api/mcp/asset/5a9eed22-57ef-4e3a-a32e-31be52eaeba5" 
          />
        </div>
      </div>

      {/* Background Ellipse 2 - Top Right */}
      <div className="hidden md:block absolute right-[-108px] w-[434px] h-[434px] top-[-108px] opacity-60 pointer-events-none">
        <div className="absolute inset-[-161.29%]">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain" 
            src="https://www.figma.com/api/mcp/asset/4b22f9bc-b738-4e28-b8cd-c2691181c921" 
          />
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[584px] bg-[#101012] rounded-[24px] p-6 sm:p-7 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center text-center w-full">
            <p className="text-white text-sm font-normal font-['Inter'] leading-[1.4] tracking-[0.07px] w-full">
              Hey! Welcome
            </p>
            <p className="text-white text-2xl font-medium font-['Inter'] leading-[1.3] tracking-[0.12px] w-full">
              Login to your Account
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
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-[7px] w-full">
              <label 
                htmlFor="password" 
                className="text-[#b2b5b8] text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px]"
              >
                Password
              </label>
              <div className="border border-white rounded-[48px] h-14 px-[18px] py-4 flex items-center justify-between bg-[#101012]">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-[#dfe1e7] text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px] outline-none placeholder:text-[#dfe1e7] placeholder:opacity-60"
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

            {/* Forgot Password Link */}
            <div className="flex justify-end w-full">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-white text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px] hover:opacity-70 transition-opacity text-right"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-[#38e07b] rounded-[48px] h-14 px-[18px] py-4 flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <span className="text-[#1d1f2c] text-lg font-medium font-['Inter'] leading-[1.6]">
                Login
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

