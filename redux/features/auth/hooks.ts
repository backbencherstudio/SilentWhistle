import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import baseApi from "../baseApi";
import { useAdminLoginMutation } from "./auth.api";
import {
  logOut as reduxLogout,
  selectCurrentRole,
  selectCurrentToken,
} from "./auth.slice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const [loginAsAdmin, ctx] = useAdminLoginMutation();
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);

  function logOut() {
    dispatch(reduxLogout());
    dispatch(baseApi.util.resetApiState());
  }

  return {
    token,
    role,
    isAuthenticated: !!token,
    loginAsAdmin,
    logOut,
    ...ctx,
  };
}
