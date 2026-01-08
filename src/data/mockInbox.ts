import { InboxMessage } from "./types";

export const mockInboxMessages: InboxMessage[] = [
  {
    id: "msg-1",
    platform: "instagram",
    senderName: "Vogue",
    senderAvatar: "https://fav.farm/vogue.com",
    senderHandle: "@voguemagazine",
    preview: "We loved your recent editorial work and would like to discuss a potential feature...",
    fullMessage: "Hi there! We loved your recent editorial work and would like to discuss a potential feature in our upcoming Spring issue. Please let us know your availability for a call this week.",
    timestamp: "2026-01-07T10:30:00Z",
    isRead: false,
    isStarred: true,
    type: "collaboration",
  },
  {
    id: "msg-2",
    platform: "email",
    senderName: "Chanel",
    senderAvatar: "https://fav.farm/chanel.com",
    subject: "Booking Request - March Campaign",
    preview: "Following up on our conversation about the spring campaign shoot...",
    fullMessage: "Following up on our conversation about the spring campaign shoot. We have confirmed the dates for March 15-18 and would love to have you on board. Budget and terms attached.",
    timestamp: "2026-01-07T09:15:00Z",
    isRead: false,
    type: "booking",
  },
  {
    id: "msg-3",
    platform: "tiktok",
    senderName: "Dior",
    senderAvatar: "https://fav.farm/dior.com",
    senderHandle: "@dior",
    preview: "Hey! We're launching a new collection and would love to partner with you...",
    timestamp: "2026-01-06T18:45:00Z",
    isRead: true,
    type: "collaboration",
  },
  {
    id: "msg-4",
    platform: "instagram",
    senderName: "Louis Vuitton",
    senderAvatar: "https://fav.farm/louisvuitton.com",
    senderHandle: "@louisvuitton",
    preview: "Your portfolio is incredible! Would you be interested in our SS26 campaign?",
    timestamp: "2026-01-06T14:20:00Z",
    isRead: true,
    type: "dm",
  },
  {
    id: "msg-5",
    platform: "email",
    senderName: "Gucci",
    senderAvatar: "https://fav.farm/gucci.com",
    subject: "New Casting Call - Luxury Brand",
    preview: "Exciting opportunity! We're casting for our Fall 2026 campaign...",
    timestamp: "2026-01-06T11:00:00Z",
    isRead: true,
    isStarred: true,
    type: "booking",
  },
  {
    id: "msg-6",
    platform: "linkedin",
    senderName: "Prada",
    senderAvatar: "https://fav.farm/prada.com",
    preview: "We've been following your work and would love to discuss representation...",
    timestamp: "2026-01-05T16:30:00Z",
    isRead: true,
    type: "general",
  },
  {
    id: "msg-7",
    platform: "twitter",
    senderName: "Harper's Bazaar",
    senderAvatar: "https://fav.farm/harpersbazaar.com",
    senderHandle: "@harpersbazaar",
    preview: "DM: Loved your recent runway appearance! Would you be available for a quick interview?",
    timestamp: "2026-01-05T12:00:00Z",
    isRead: true,
    type: "collaboration",
  },
];

export const getUnreadCount = () => mockInboxMessages.filter((m) => !m.isRead).length;

export const getMessagesByPlatform = (platform: string) =>
  mockInboxMessages.filter((m) => m.platform === platform);

export const getStarredMessages = () => mockInboxMessages.filter((m) => m.isStarred);

