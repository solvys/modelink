import { Agency } from "./types";

export const mockAgencies: Agency[] = [
  {
    id: "agency-1",
    name: "Elite Models",
    slug: "elite-models",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    customization: {
      palette: "blush",
      font: "inter",
      logoPlacement: "header",
    },
    models: ["model-1", "model-2"],
  },
  {
    id: "agency-2",
    name: "Premier Talent",
    slug: "premier-talent",
    logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop",
    customization: {
      palette: "sage",
      font: "outfit",
      logoPlacement: "both",
    },
    models: ["model-3"],
  },
];

