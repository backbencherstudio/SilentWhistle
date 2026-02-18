"use client";

import { useAppDispatch } from "@/redux/store";
import Cookies from "js-cookie";
import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  setCredentials,
  IAuthUserRole,
} from "./auth.slice";

function useInitiateAuthState() {
  const dispatch = useAppDispatch();
  const token = useSelector(selectCurrentToken);
  const isAppLoading = token === false;

  useEffect(() => {
    const [savedToken, refreshToken, savedRole] = [
      "access_token",
      "refresh_token",
      "role",
    ].map((key) => Cookies.get(key));

    dispatch(
      setCredentials({
        token: savedToken || null,
        role: (savedRole as IAuthUserRole) || null,
        refreshToken: refreshToken || null,
      }),
    );
  }, [dispatch]);

  return { isAppLoading };
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const { isAppLoading } = useInitiateAuthState();

  if (isAppLoading) return null;

  return <>{children}</>;
}
