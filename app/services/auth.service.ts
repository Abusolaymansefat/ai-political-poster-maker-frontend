import api from "@/lib/api";
import { LoginData, LoginResponse, RegisterData, User } from "../types/auth";


export const registerUser = async (
  data: RegisterData
) => {
  const response = await api.post<{
    success: boolean;
    data: User;
  }>("/auth/register", data);

  return response.data;
};

export const loginUser = async (
  data: LoginData
) => {
  const response = await api.post<{
    success: boolean;
    data: LoginResponse;
  }>("/auth/login", data);

  return response.data;
};