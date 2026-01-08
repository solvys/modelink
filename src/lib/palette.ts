export type PaletteName = "blush" | "sage" | "lavender" | "custom";

export interface PaletteColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export const palettes: Record<PaletteName, PaletteColors> = {
  blush: {
    primary: "#F8E8E8",
    secondary: "#FDF5F5",
    accent: "#F0D8D8",
    background: "#FDF9F3",
  },
  sage: {
    primary: "#E8F0E8",
    secondary: "#F0F5F0",
    accent: "#D8E8D8",
    background: "#FDF9F3",
  },
  lavender: {
    primary: "#EDE8F5",
    secondary: "#F5F0FA",
    accent: "#E0D8ED",
    background: "#FDF9F3",
  },
  custom: {
    primary: "#F8E8E8",
    secondary: "#FDF5F5",
    accent: "#F0D8D8",
    background: "#FDF9F3",
  },
};

export function getPaletteColors(palette: PaletteName, customColors?: { primary: string; secondary: string; accent: string }): PaletteColors {
  if (palette === "custom" && customColors) {
    return {
      ...customColors,
      background: "#FDF9F3",
    };
  }
  return palettes[palette];
}

export function applyPaletteStyles(palette: PaletteName, customColors?: { primary: string; secondary: string; accent: string }): React.CSSProperties {
  const colors = getPaletteColors(palette, customColors);
  return {
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
    "--color-background": colors.background,
  } as React.CSSProperties;
}

