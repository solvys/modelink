// Profile Types
export type ProfileType = "model" | "agency" | "brand";

export interface ModelStats {
  height: string;
  bust?: string;
  waist?: string;
  hips?: string;
  shoeSize?: string;
  hairColor?: string;
  eyeColor?: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  brand?: string;
  date?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  credit?: string;
}

export interface Gallery {
  id: string;
  genre: "formal" | "streetwear" | "summer" | "commercial" | "editorial" | "custom";
  label: string;
  images: GalleryImage[];
  videos?: Video[];
}

export interface Experience {
  id: string;
  brand: string;
  projectType: string;
  industry?: string[];
  date?: string;
  location?: string;
  link?: string;
  tags?: string[];
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
  website?: string;
  email?: string;
}

export interface AgencyCustomization {
  palette: "blush" | "sage" | "lavender" | "custom";
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  font: "inter" | "outfit" | "playfair" | "custom";
  logoPlacement: "header" | "footer" | "both";
}

export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo: string;
  customization: AgencyCustomization;
  models: string[];
  contactEmail?: string;
  description?: string;
  location?: string;
}

export interface Model {
  id: string;
  name: string;
  slug: string;
  agencyId: string;
  stats: ModelStats;
  profilePhoto: string;
  videos: Video[];
  galleries: Gallery[];
  experience: Experience[];
  socials?: SocialLinks;
  availability?: "available" | "limited" | "unavailable";
  profileType?: ProfileType;
}

// Dashboard Types
export interface Appointment {
  id: string;
  date: string;
  time: string;
  client: string;
  type: string;
  status: "confirmed" | "pending" | "completed";
}

export interface PlatformImpression {
  id: string;
  platform: string;
  impressions: number;
  change: number;
}

export interface PostPerformance {
  id: string;
  platform: string;
  title: string;
  engagementRate: number;
  reach: number;
  postedAt: string;
  thumbnail?: string;
}

export interface Integration {
  id: string;
  platform: string;
  status: "connected" | "pending" | "disconnected";
  handle?: string;
  dashboardUrl?: string;
  lastSync?: string;
}

export interface AgencyProfile {
  id: string;
  name: string;
  specialties: string[];
  location: string;
  openBriefs: number;
  contactEmail?: string;
  logo?: string;
  description?: string;
}

export interface CustomizationSettings {
  fontFamily: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface DashboardData {
  appointments: Appointment[];
  impressions: PlatformImpression[];
  topPosts: PostPerformance[];
  integrations: Integration[];
  agencies: AgencyProfile[];
  customization: CustomizationSettings;
}

// Inbox Types
export type InboxPlatform = "instagram" | "tiktok" | "email" | "twitter" | "linkedin";

export interface InboxMessage {
  id: string;
  platform: InboxPlatform;
  senderName: string;
  senderAvatar?: string;
  senderHandle?: string;
  subject?: string;
  preview: string;
  fullMessage?: string;
  timestamp: string;
  isRead: boolean;
  isStarred?: boolean;
  type: "dm" | "collaboration" | "booking" | "general";
}

// Job Postings Types
export type JobCategory = "editorial" | "commercial" | "runway" | "beauty" | "lifestyle" | "brand" | "influencer";

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  isRemote?: boolean;
  category: JobCategory;
  description: string;
  requirements?: string[];
  compensation?: string;
  deadline?: string;
  postedAt: string;
  applicants?: number;
  tags?: string[];
}

// Booking Calendar Types
export interface BookingSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  bookedBy?: string;
  type?: string;
}

// Social Networking Types
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorType: ProfileType;
  content: string;
  images?: string[];
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  hashtags?: string[];
  isLiked?: boolean;
  isSaved?: boolean;
  sourceUrl?: string;
}

export interface Connection {
  id: string;
  name: string;
  avatar: string;
  type: ProfileType;
  title?: string;
  location?: string;
  mutualConnections?: number;
  isFollowing?: boolean;
  isConnected?: boolean;
  specialties?: string[];
}

export type DMChannel = "instagram" | "tiktok" | "whatsapp" | "email";

export interface DMMessage {
  id: string;
  content: string;
  timestamp: string;
  direction: "inbound" | "outbound";
  status?: "delivered" | "seen";
}

export interface DMConversation {
  id: string;
  participant: {
    name: string;
    handle: string;
    avatar: string;
    platform: DMChannel;
    verified?: boolean;
    location?: string;
  };
  lastMessage: string;
  lastActivity: string;
  unreadCount: number;
  messages: DMMessage[];
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "message" | "booking" | "job" | "connection";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  avatar?: string;
}

export interface Story {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  media: string;
  mediaType: "image" | "video";
  createdAt: string;
  expiresAt: string;
  views?: number;
  isViewed?: boolean;
}

export interface Hashtag {
  id: string;
  name: string;
  postsCount: number;
  trending?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  items: string[];
  itemType: "post" | "job" | "profile";
  createdAt: string;
}

// KPI Types
export interface KPI {
  id: string;
  label: string;
  value: number;
  change?: number;
  changeLabel?: string;
  icon?: string;
}

// Note Types
export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
