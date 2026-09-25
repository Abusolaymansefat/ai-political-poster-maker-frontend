import api from "@/lib/api";
import { Template } from "../types/template";

export const getTemplates = async (
  occasionType?: string
) => {
  const response = await api.get<{
    success: boolean;
    data: Template[];
  }>("/templates", {
    params: occasionType
      ? { occasionType }
      : {}
  });

  return response.data.data;
};

export const getTemplate = async (
  id: string
) => {
  const response = await api.get<{
    success: boolean;
    data: Template;
  }>(`/templates/${id}`);

  return response.data.data;
};