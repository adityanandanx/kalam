import { clsx, type ClassValue } from "clsx";
import { RgbaColor } from "react-colorful";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToRgba(hex: string): RgbaColor {
  // Remove leading '#' if present
  hex = hex.replace(/^#/, "");

  let r: number,
    g: number,
    b: number,
    a: number = 255;

  if (hex.length === 3 || hex.length === 4) {
    // Expand short notation to full
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
    if (hex.length === 4) a = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 6 || hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16);
  } else {
    throw new Error("Invalid hex color format");
  }

  return {
    r,
    g,
    b,
    a: a / 255,
  };
}

export function rgbaToHex({ r, g, b, a = 1 }: RgbaColor): string {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");

  const alpha = Math.round(a * 255);

  return a === 1
    ? `#${toHex(r)}${toHex(g)}${toHex(b)}`
    : `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
}
