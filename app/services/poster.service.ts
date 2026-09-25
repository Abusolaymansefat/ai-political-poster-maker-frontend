import api from "@/lib/api";
import { Poster } from "../types/poster";


export interface CreatePosterPayload {
  templateId: string;

  name: string;
  designation: string;

  party?: string;
  organization?: string;

  union?: string;
  thana?: string;
  district?: string;

  occasion: string;
  headline: string;

  photos: File[];
}

export const createPoster = async (
  data: CreatePosterPayload
) => {
  const formData = new FormData();

  formData.append(
    "templateId",
    data.templateId
  );

  formData.append(
    "name",
    data.name
  );

  formData.append(
    "designation",
    data.designation
  );

  formData.append(
    "party",
    data.party || ""
  );

  formData.append(
    "organization",
    data.organization || ""
  );

  formData.append(
    "union",
    data.union || ""
  );

  formData.append(
    "thana",
    data.thana || ""
  );

  formData.append(
    "district",
    data.district || ""
  );

  formData.append(
    "occasion",
    data.occasion
  );

  formData.append(
    "headline",
    data.headline
  );

  data.photos.forEach((photo) => {
    formData.append(
      "photos",
      photo
    );
  });

  const response = await api.post<{
    success: boolean;
    data: Poster;
  }>("/posters", formData);

  return response.data.data;
};

export const getPoster = async (
  id: string
) => {
  const response = await api.get<{
    success: boolean;
    data: Poster;
  }>(`/posters/${id}`);

  return response.data.data;
};

export const getMyPosters = async () => {
  const response = await api.get<{
    success: boolean;
    data: Poster[];
  }>("/posters/my-posters");

  return response.data.data;
};

export const regeneratePoster = async (
  id: string
) => {
  const response = await api.post<{
    success: boolean;
    data: Poster;
  }>(`/posters/${id}/regenerate`);

  return response.data.data;
};

export const deletePoster = async (
  id: string
) => {
  await api.delete(`/posters/${id}`);
};