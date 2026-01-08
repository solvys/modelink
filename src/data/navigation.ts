import {
  LayoutGrid,
  Smartphone,
  Sparkles,
  Users,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface CreatorHubNavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const creatorHubNavLinks: CreatorHubNavLink[] = [
  { href: "/", label: "Hub", icon: LayoutGrid },
  { href: "/feed", label: "Feed", icon: Smartphone },
  { href: "/discover", label: "Inspo", icon: Sparkles },
  { href: "/network", label: "Networking", icon: Users },
  { href: "/agency-match", label: "Jobs", icon: Briefcase },
];


