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
  type: string;
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
