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
  text: "",
  paper_x: 2480,
  paper_y: 3508,
  margins: {
    top: 200,
    bottom: 200,
    left: 200,
    right: 200,
  },
  font: "",
  font_size: 48,
  line_spacing: 1.5,
  word_spacing: 1,
  background_color: { r: 255, g: 255, b: 255, a: 1 },
  font_color: { r: 0, g: 0, b: 0, a: 1 },
  perturbation: {
    line_spacing: 0,
    font_size: 0,
    word_spacing: 0,
    x_offset: 0,
    y_offset: 0,
    rotation: 0,
  },
  rate: 1,
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
