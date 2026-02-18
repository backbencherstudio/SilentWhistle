import { RootState } from "@/redux/store";
import { UserService } from "@/service/user/user.service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SetCredentialsPayload {
  token?: string | null;
  role?: IAuthUserRole | null;
  refreshToken?: string | null;
}

export type IAuthUserRole = "user" | "admin";
interface AuthState {
  token: string | null | false;
  refreshToken: string | null;
  role: IAuthUserRole | null;
}

const initialState: AuthState = {
  token: false,
  refreshToken: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { token = null, role = null, refreshToken = null } = action.payload;
      state.token = token;
      state.role = role;

      if (token && refreshToken) {
        UserService.setTokens(token, refreshToken);
      }
    },
    logOut: (state) => {
      state.token = null;
      state.role = null;
      UserService.clearTokens();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRole = (state: RootState) => state.auth.role;
