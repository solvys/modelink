export interface Notification {
  id: string;
  type: "message" | "booking" | "system" | "opportunity" | "milestone";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
}

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "message",
    title: "Vogue Magazine",
    description: "We loved your recent editorial work and would like to discuss a collaboration.",
    timestamp: "2 hours ago",
    read: false,
    avatar: "https://fav.farm/vogue.com",
    actionUrl: "/network",
  },
  {
    id: "notif-2",
    type: "booking",
    title: "New Booking Request",
    description: "Harper & Co. has requested you for a campaign shoot on Jan 15.",
    timestamp: "5 hours ago",
    read: false,
    actionUrl: "/agency-match",
  },
  {
    id: "notif-3",
    type: "opportunity",
    title: "Job Match Found",
    description: "3 new opportunities match your profile preferences.",
    timestamp: "1 day ago",
    read: false,
    actionUrl: "/agency-match",
  },
  {
    id: "notif-4",
    type: "milestone",
    title: "Profile Milestone",
    description: "Congratulations! Your profile has reached 10K views this month.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "notif-5",
    type: "system",
    title: "Portfolio Updated",
    description: "Your portfolio changes have been published successfully.",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "notif-6",
    type: "message",
    title: "Sarah Chen",
    description: "Following up on our conversation about the spring campaign...",
    timestamp: "3 days ago",
    read: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    actionUrl: "/network",
  },
];

