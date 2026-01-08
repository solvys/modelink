import { DMConversation } from "./types";

export const mockDMConversations: DMConversation[] = [
  {
    id: "dm-1",
    participant: {
      name: "Isabella Martinez",
      handle: "@isabellastudio",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop",
      platform: "instagram",
      verified: true,
      location: "NYC",
    },
    lastMessage: "Sending the updated moodboard now!",
    lastActivity: "2m",
    unreadCount: 2,
    messages: [
      {
        id: "dm-1-1",
        direction: "inbound",
        content: "Sending the updated moodboard now!",
        timestamp: "2026-01-07T16:08:00Z",
        status: "seen",
      },
      {
        id: "dm-1-2",
        direction: "outbound",
        content: "Amazing, let's align on lighting references too.",
        timestamp: "2026-01-07T16:05:00Z",
      },
      {
        id: "dm-1-3",
        direction: "inbound",
        content: "Need any sample poses from my portfolio?",
        timestamp: "2026-01-07T15:52:00Z",
      },
    ],
  },
  {
    id: "dm-2",
    participant: {
      name: "Alo Yoga",
      handle: "@aloyoga",
      avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=120&fit=crop",
      platform: "instagram",
      location: "LA",
    },
    lastMessage: "We loved your latest reel. Ready for a spring collab?",
    lastActivity: "1h",
    unreadCount: 0,
    messages: [
      {
        id: "dm-2-1",
        direction: "inbound",
        content: "We loved your latest reel. Ready for a spring collab?",
        timestamp: "2026-01-07T15:00:00Z",
        status: "delivered",
      },
      {
        id: "dm-2-2",
        direction: "outbound",
        content: "Absolutely! Can I send over rates and concepts?",
        timestamp: "2026-01-07T14:52:00Z",
      },
      {
        id: "dm-2-3",
        direction: "inbound",
        content: "Yes please, let's lock something by Friday.",
        timestamp: "2026-01-07T14:48:00Z",
      },
    ],
  },
  {
    id: "dm-3",
    participant: {
      name: "Linda · AI Strategist",
      handle: "@linda.ai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      platform: "whatsapp",
    },
    lastMessage: "I queued a reminder to follow up with Elite Models tomorrow.",
    lastActivity: "3h",
    unreadCount: 0,
    messages: [
      {
        id: "dm-3-1",
        direction: "inbound",
        content: "I queued a reminder to follow up with Elite Models tomorrow.",
        timestamp: "2026-01-07T13:10:00Z",
      },
      {
        id: "dm-3-2",
        direction: "outbound",
        content: "Thanks Linda! Can you summarize my open pitches?",
        timestamp: "2026-01-07T13:05:00Z",
      },
      {
        id: "dm-3-3",
        direction: "inbound",
        content: "Alo Yoga (awaiting moodboard), Elite Models (needs casting tape).",
        timestamp: "2026-01-07T13:00:00Z",
      },
    ],
  },
];

