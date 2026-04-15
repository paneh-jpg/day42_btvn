import axiosClient from "./axiosClient";

export const loginApi = async (email: string, password: string) => {
  const res = await axiosClient.post("/auth/signin", {
    email,
    password,
  });
  return res.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const res = await axiosClient.post("/auth/refresh-token", {
    refreshToken,
  });
  return res.data;
};
