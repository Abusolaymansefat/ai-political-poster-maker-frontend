import { User } from "@/app/types/auth";

export const saveAuth = (
  token: string,
  user: User
) => {
  localStorage.setItem("token", token);
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(
    localStorage.getItem("token")
  );
};