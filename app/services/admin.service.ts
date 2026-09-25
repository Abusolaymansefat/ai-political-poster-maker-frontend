import api from "@/lib/api";
import { Poster } from "../types/poster";
import { User } from "../types/auth";

export const getAdminUsers = async () => {
      const response = await api.get<{
            success: boolean;
            data: User[];
      }>("/admin/users");

      return response.data.data;
};

export const getAdminPosters = async () => {
      const response = await api.get<{
            success: boolean;
            data: Poster[];
      }>("/admin/posters");

      return response.data.data;
};

export const deleteAdminUser = async (
      id: string
) => {
      await api.delete(`/admin/users/${id}`);
};

export const deleteAdminPoster = async (
      id: string
) => {
      await api.delete(`/admin/posters/${id}`);
};