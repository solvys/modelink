import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractVideoId(url: string): { type: "youtube" | "vimeo" | "direct"; id?: string } {
  if (url.includes("youtube.com/watch") || url.includes("youtu.be/")) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return { type: "youtube", id: match?.[1] };
  }
  if (url.includes("vimeo.com/")) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return { type: "vimeo", id: match?.[1] };
  }
  return { type: "direct" };
}

export function getVideoThumbnail(url: string): string {
  const video = extractVideoId(url);
  if (video.type === "youtube" && video.id) {
    return `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  }
  if (video.type === "vimeo" && video.id) {
    return `https://vumbnail.com/${video.id}.jpg`;
  }
  return "";
}

