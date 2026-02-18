import Cookies from "js-cookie";

export const UserService = {
  setTokens: (access: string, refresh: string) => {
    Cookies.set("access_token", access, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    Cookies.set("refresh_token", refresh, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
  },

  getAccessToken: () => Cookies.get("access_token"),

  getRefreshToken: () => Cookies.get("refresh_token"),

  clearTokens: () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  },

  isAuthenticated: () => {
    return !!Cookies.get("access_token");
  },
};
