import { useState } from "react";
import {
  setTokens,
  getAccessToken,
  getRefreshToken,
  removeTokens,
} from "../utils/token";

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessToken(),
  );
  const [refreshToken, setRefreshTokenState] = useState<string | null>(
    getRefreshToken(),
  );

  const login = (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshTokenState(refresh);
    setTokens(access, refresh);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshTokenState(null);
    removeTokens();
  };

  return {
    accessToken,
    refreshToken,
    login,
    logout,
  };
};
