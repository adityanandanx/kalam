import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "./axios";

type GenerateParams = {
  rate: number;
  paper_x: number;
  paper_y: number;
  font_size: number;
  line_spacing: number;
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  word_spacing: number;
  perturbation: {
    line_spacing: number;
    font_size: number;
    word_spacing: number;
    x_offset: number;
    y_offset: number;
    rotation: number;
  };
  font: string | null;
  background_color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  font_color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

type GenerateRequest = {
  text: string;
  params: GenerateParams;
};

type GenerateResponse = {
  images: Record<string, string>;
  page_count: number;
};

export function useListFonts() {
  return useQuery({
    queryKey: ["fonts"],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ fonts: string[] }>("/api/v1/fonts");
        return data.fonts;
      } catch (error) {
        toast.error("Failed to load fonts");
        throw error;
      }
    },
  });
}

export function useGenerateText() {
  return useMutation({
    mutationFn: async (request: GenerateRequest) => {
      try {
        const { data } = await api.post<GenerateResponse>(
          "/api/v1/generate",
          request
        );
        return data;
      } catch (error) {
        toast.error("Failed to generate handwritten text");
        throw error;
      }
    },
  });
}
