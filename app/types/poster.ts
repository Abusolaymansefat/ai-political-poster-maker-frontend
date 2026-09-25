import { Template } from "./template";

export type PosterStatus =
  | "draft"
  | "generating"
  | "completed"
  | "failed";

export interface PosterFormData {
  name: string;
  designation: string;
  party?: string;
  organization?: string;
  union?: string;
  thana?: string;
  district?: string;
  occasion: string;
  headline: string;
}

export interface Poster {
  _id: string;
  userId: string;
  templateId: string | Template;

  formData: PosterFormData;

  uploadedPhotoUrls: string[];

  generatedImageUrl?: string;

  status: PosterStatus;

  regenerateCount: number;

  generationError?: string;

  createdAt: string;
  updatedAt: string;
}