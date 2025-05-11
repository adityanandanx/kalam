import { create } from "zustand";

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface Perturbation {
  line_spacing: number;
  font_size: number;
  word_spacing: number;
  x_offset: number;
  y_offset: number;
  rotation: number;
}

interface ControlsState {
  text: string;
  paper_x: number;
  paper_y: number;
  margins: Margins;
  font: string;
  font_size: number;
  line_spacing: number;
  word_spacing: number;
  background_color: Color;
  font_color: Color;
  perturbation: Perturbation;
  rate: number;
  setText: (text: string) => void;
  setPaperX: (x: number) => void;
  setPaperY: (y: number) => void;
  setMargins: (margins: Margins) => void;
  setFont: (font: string) => void;
  setFontSize: (size: number) => void;
  setLineSpacing: (spacing: number) => void;
  setWordSpacing: (spacing: number) => void;
  setBackgroundColor: (color: Color) => void;
  setFontColor: (color: Color) => void;
  setPerturbation: (perturbation: Perturbation) => void;
  setRate: (rate: number) => void;
}

export const useControlsStore = create<ControlsState>((set) => ({
  text: "Text to be converted to handwriting goes here.",
  paper_x: 667,
  paper_y: 945,
  margins: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  font: "hongzhi_handwriting",
  font_size: 30,
  line_spacing: 40,
  word_spacing: 1,
  background_color: { r: 255, g: 255, b: 255, a: 1 },
  font_color: { r: 0, g: 0, b: 0, a: 1 },
  perturbation: {
    line_spacing: 1,
    font_size: 1,
    word_spacing: 1,
    x_offset: 1,
    y_offset: 1,
    rotation: 0.05,
  },
  rate: 2,
  setText: (text) => set({ text }),
  setPaperX: (paper_x) => set({ paper_x }),
  setPaperY: (paper_y) => set({ paper_y }),
  setMargins: (margins) => set({ margins }),
  setFont: (font) => set({ font }),
  setFontSize: (font_size) => set({ font_size }),
  setLineSpacing: (line_spacing) => set({ line_spacing }),
  setWordSpacing: (word_spacing) => set({ word_spacing }),
  setBackgroundColor: (background_color) => set({ background_color }),
  setFontColor: (font_color) => set({ font_color }),
  setPerturbation: (perturbation) => set({ perturbation }),
  setRate: (rate) => set({ rate }),
}));
