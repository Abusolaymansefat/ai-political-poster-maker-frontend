export type OccasionType =
  | "victory-day"
  | "condolence"
  | "campaign"
  | "greeting"
  | "eid";

export interface Template {
  _id: string;
  title: string;
  occasionType: OccasionType;
  thumbnailUrl: string;
  backgroundUrl: string;
  layoutConfig: {
    photoSlots?: number;
    headlinePosition?: string;
    photoLayout?: string;
    footer?: boolean;
    colors?: string[];
  };
  isActive: boolean;
  createdAt: string;
}