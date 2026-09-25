"use client";

import {
  useMutation,
  useQuery
} from "@tanstack/react-query";
import {
  createPoster,
  CreatePosterPayload,
  deletePoster,
  getMyPosters,
  getPoster,
  regeneratePoster
} from "../services/poster.service";


export const useCreatePoster = () => {
  return useMutation({
    mutationFn: (
      data: CreatePosterPayload
    ) => createPoster(data)
  });
};

export const useMyPosters = () => {
  return useQuery({
    queryKey: ["my-posters"],
    queryFn: getMyPosters
  });
};

export const usePoster = (
  id: string
) => {
  return useQuery({
    queryKey: ["poster", id],
    queryFn: () => getPoster(id),
    enabled: Boolean(id)
  });
};

export const useRegeneratePoster = () => {
  return useMutation({
    mutationFn: regeneratePoster
  });
};

export const useDeletePoster = () => {
  return useMutation({
    mutationFn: deletePoster
  });
};