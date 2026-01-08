import { DashboardData } from "./types";

export const dashboardData: DashboardData = {
  appointments: [
    {
      id: "appt-1",
      date: "2026-01-09",
      time: "10:00 AM",
      client: "Vogue Editorial",
      type: "Editorial Fitting",
      status: "confirmed",
    },
    {
      id: "appt-2",
      date: "2026-01-11",
      time: "2:30 PM",
      client: "Sephora",
      type: "Campaign Shoot",
      status: "pending",
    },
    {
      id: "appt-3",
      date: "2026-01-14",
      time: "9:00 AM",
      client: "Harper & Co.",
      type: "Runway Rehearsal",
      status: "confirmed",
    },
  ],
  impressions: [
    { id: "imp-ig", platform: "Instagram", impressions: 182000, change: 12 },
    { id: "imp-tt", platform: "TikTok", impressions: 94000, change: 5 },
    { id: "imp-yt", platform: "YouTube", impressions: 31000, change: -3 },
  ],
  topPosts: [
    {
      id: "post-1",
      platform: "Instagram",
      title: "FW25 Graffiti Runway",
      engagementRate: 6.3,
      reach: 88000,
      postedAt: "2025-12-28",
    },
    {
      id: "post-2",
      platform: "TikTok",
      title: "Backstage BTS",
      engagementRate: 9.1,
      reach: 56000,
      postedAt: "2025-12-30",
    },
    {
      id: "post-3",
      platform: "YouTube",
      title: "Glow Routine Reel",
      engagementRate: 4.4,
      reach: 21000,
      postedAt: "2026-01-03",
    },
  ],
  integrations: [
    {
      id: "integration-instagram",
      platform: "Instagram",
      status: "connected",
      handle: "@modelink",
      dashboardUrl: "https://www.instagram.com/professional_dashboard",
      lastSync: "2026-01-07T08:00:00Z",
    },
    {
      id: "integration-tiktok",
      platform: "TikTok",
      status: "connected",
      handle: "@modelink",
      dashboardUrl: "https://www.tiktok.com/creatoranalytics",
      lastSync: "2026-01-06T22:00:00Z",
    },
    {
      id: "integration-youtube",
      platform: "YouTube",
      status: "pending",
      handle: "@modelinkstudio",
      dashboardUrl: "https://studio.youtube.com/",
    },
  ],
  agencies: [
    {
      id: "agency-nova",
      name: "Nova Talent Group",
      specialties: ["Editorial", "Runway"],
      location: "New York",
      openBriefs: 2,
      contactEmail: "cast@novatalent.com",
    },
    {
      id: "agency-atelier",
      name: "Atelier Worldwide",
      specialties: ["Commercial", "Luxury"],
      location: "Paris",
      openBriefs: 4,
      contactEmail: "bookings@atelierworldwide.com",
    },
    {
      id: "agency-pulse",
      name: "Pulse Collective",
      specialties: ["Beauty", "Creator"],
      location: "Los Angeles",
      openBriefs: 1,
      contactEmail: "hi@pulsecollective.com",
    },
  ],
  customization: {
    fontFamily: "Playfair Display",
    colors: {
      primary: "#F4C2C2",
      secondary: "#89CFF0",
      accent: "#FFFFFF",
    },
  },
};

export const availableFonts = ["Playfair Display", "Inter", "Outfit", "Great Vibes"];

