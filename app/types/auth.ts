export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}