"use client";

import {
      useMutation,
      useQuery,
      useQueryClient
} from "@tanstack/react-query";
import {
      deleteAdminPoster,
      deleteAdminUser,
      getAdminPosters,
      getAdminUsers
} from "../services/admin.service";

export const useAdminUsers = (enabled = true) =>
      useQuery({
            queryKey: ["admin-users"],
            queryFn: getAdminUsers,
            enabled
      });

export const useAdminPosters = (enabled = true) =>
      useQuery({
            queryKey: ["admin-posters"],
            queryFn: getAdminPosters,
            enabled
      });

export const useDeleteAdminUser = () => {
      const queryClient = useQueryClient();

      return useMutation({
            mutationFn: deleteAdminUser,
            onSuccess: () => {
                  queryClient.invalidateQueries({
                        queryKey: ["admin-users"]
                  });
                  queryClient.invalidateQueries({
                        queryKey: ["admin-posters"]
                  });
            }
      });
};

export const useDeleteAdminPoster = () => {
      const queryClient = useQueryClient();

      return useMutation({
            mutationFn: deleteAdminPoster,
            onSuccess: () => {
                  queryClient.invalidateQueries({
                        queryKey: ["admin-posters"]
                  });
            }
      });
};