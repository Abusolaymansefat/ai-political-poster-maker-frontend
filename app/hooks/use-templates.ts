"use client";

import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "../services/template.service";


export const useTemplates = (
  occasionType?: string
) => {
  return useQuery({
    queryKey: [
      "templates",
      occasionType
    ],

    queryFn: () =>
      getTemplates(occasionType)
  });
};