import { IAuthUserRole } from "./auth.slice";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  authorization: {
    type: string;
    access_token: string;
    refresh_token: string;
  };
  type: IAuthUserRole;
}

export interface ILogoutResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface IVerifyOtpPayload {
  email: string;
  otp: string;
}

export interface IVerifyOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface IResendVerificationPayload {
  email: string;
}

export interface IResendVerificationResponse {
	success: boolean,
	statusCode: number,
	message: string
}

export interface IResetPasswordPayload {
  email: string;
  otp: string;
  new_password:string
}

export interface IResetPasswordResponse {
	success: boolean,
	statusCode: number,
	message: string
}
