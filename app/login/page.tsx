/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Login Page
 *
 * @page
 * @route /login
 */

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { UserService } from "@/service/user/user.service";
import Image from "next/image";
import { useAdminLoginMutation } from "@/redux/features/auth/auth.api";
import { showDashboardToast } from "@/components/ui/CustomToast";
import { getErrorMessage } from "@/lib/utils";
import { useAuth } from "@/redux/features/auth/hooks";

/**
 * Login Page Component
 *
 * Renders the login page with email and password fields
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginAsAdmin, isLoading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showDashboardToast({
        variant: "error",
        title: "Missing Credentials",
        description: "Email and password are required.",
      });
      return;
    }
    try {
      await loginAsAdmin({ email, password }).unwrap();

      showDashboardToast({
        variant: "success",
        title: "Login Successful",
        description: "Welcome back!",
      });

      router.push("/dashboard");
    } catch (error: any) {
      showDashboardToast({
        variant: "error",
        title: "Login Failed",
        description: getErrorMessage(error, "Invalid credentials. Try again."),
      });
    }
  };

  const handleForgotPassword = () => {
    router.push("/login/forgot-password");
  };

  return (
    <div className="min-h-screen bg-[#05060f] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background Ellipse 1 - Bottom Left */}

      <Image
        src="/dashboard/bottom-light.svg"
        alt="bg bottm"
        width={1025}
        height={1025}
        className="hidden md:block absolute left-0 bottom-0 object-contain"
      />

      {/* Background Ellipse 2 - Top Right */}
      <Image
        src="/dashboard/top-light.svg"
        alt="bg top"
        width={1025}
        height={1025}
        className="hidden md:block absolute right-0 top-0 object-contain"
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-146 bg-[#101012] rounded-[24px] p-6 sm:p-7 md:p-8">
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
            <div className="flex flex-col gap-1.75 w-full">
              <label
                htmlFor="email"
                className="text-[#b2b5b8] text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px]"
              >
                Email
              </label>
              <div className="border focus-within:border-white border-[#1d1f2c] rounded-[48px] h-14 px-4.5 py-4 flex items-center bg-[#101012]">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent text-[#dfe1e7] text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px] outline-none placeholder:text-[#dfe1e7] placeholder:opacity-60"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.75 w-full">
              <label
                htmlFor="password"
                className="text-[#b2b5b8] text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px]"
              >
                Password
              </label>
              <div className="border focus-within:border-white border-[#1d1f2c] rounded-[48px] h-14 px-4.5 py-4 flex items-center justify-between bg-[#101012]">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent text-[#dfe1e7] text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px] outline-none placeholder:text-[#dfe1e7] placeholder:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 w-6 h-6 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
                className="text-white text-base font-normal font-['Inter'] leading-[1.6] tracking-[0.08px] hover:opacity-70 transition-opacity text-right cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-[#38e07b] rounded-[48px] h-14 px-4.5 py-4 flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span className="text-[#1d1f2c] text-lg font-medium font-['Inter'] leading-[1.6]">
                {isLoading ? "Logging in..." : "Login"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
