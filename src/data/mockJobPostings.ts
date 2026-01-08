import { JobPosting } from "./types";

export const mockJobPostings: JobPosting[] = [
  {
    id: "job-1",
    title: "Lead Model - Spring/Summer 2026 Campaign",
    company: "Gucci",
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
    location: "Milan, Italy",
    category: "editorial",
    description: "Seeking a lead model for our Spring/Summer 2026 ready-to-wear campaign. Looking for versatile talent with strong editorial experience and runway presence.",
    requirements: [
      "5+ years professional modeling experience",
      "Height: 5'9\" - 6'0\"",
      "Strong runway experience",
      "Available for 2-week shoot in March",
    ],
    compensation: "$15,000 - $25,000",
    deadline: "2026-01-25",
    postedAt: "2026-01-05",
    applicants: 47,
    tags: ["luxury", "editorial", "runway", "high-fashion"],
  },
  {
    id: "job-2",
    title: "Beauty Campaign - Skincare Line Launch",
    company: "Glossier",
    companyLogo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop",
    location: "New York, NY",
    isRemote: false,
    category: "beauty",
    description: "We're launching a new skincare line and need fresh faces to represent our brand. Looking for natural beauty and authentic personalities.",
    requirements: [
      "Clear, healthy skin",
      "Natural look preferred",
      "Experience with beauty campaigns a plus",
      "Must be comfortable on camera",
    ],
    compensation: "$5,000 - $8,000",
    deadline: "2026-01-20",
    postedAt: "2026-01-04",
    applicants: 128,
    tags: ["beauty", "skincare", "natural", "commercial"],
  },
  {
    id: "job-3",
    title: "Runway Models - Fashion Week 2026",
    company: "Council of Fashion Designers of America",
    companyLogo: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100&h=100&fit=crop",
    location: "New York, NY",
    category: "runway",
    description: "CFDA is casting models for New York Fashion Week Fall 2026. Multiple designers, multiple shows. Exclusive and non-exclusive opportunities available.",
    requirements: [
      "Professional runway experience required",
      "Height: 5'9\" minimum",
      "Available full week of Feb 10-17",
      "Own transportation within NYC",
    ],
    compensation: "$2,500 - $10,000 per show",
    deadline: "2026-02-01",
    postedAt: "2026-01-06",
    applicants: 312,
    tags: ["runway", "fashion-week", "nyfw", "high-fashion"],
  },
  {
    id: "job-4",
    title: "Brand Ambassador - Athleisure Campaign",
    company: "Alo Yoga",
    companyLogo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
    location: "Los Angeles, CA",
    isRemote: true,
    category: "lifestyle",
    description: "Seeking fitness-focused models/influencers for our year-long brand ambassador program. Includes content creation, events, and social media collaboration.",
    requirements: [
      "Active lifestyle and fitness background",
      "10K+ social media following",
      "Content creation experience",
      "Based in LA or willing to travel",
    ],
    compensation: "$3,000/month + product",
    deadline: "2026-01-30",
    postedAt: "2026-01-03",
    applicants: 89,
    tags: ["fitness", "lifestyle", "influencer", "ambassador"],
  },
  {
    id: "job-5",
    title: "Commercial Print - Tech Product Launch",
    company: "Apple",
    companyLogo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100&h=100&fit=crop",
    location: "Cupertino, CA",
    category: "commercial",
    description: "Apple is seeking diverse talent for upcoming product launch campaign. Looking for authentic, relatable individuals of all backgrounds.",
    requirements: [
      "Natural, authentic presence",
      "Comfortable with product handling",
      "Available for 3-day shoot",
      "All ethnicities and ages welcome",
    ],
    compensation: "$8,000 - $12,000",
    deadline: "2026-01-18",
    postedAt: "2026-01-02",
    applicants: 256,
    tags: ["commercial", "tech", "print", "diverse"],
  },
  {
    id: "job-6",
    title: "UGC Creator - Social Media Content",
    company: "Revolve",
    companyLogo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
    location: "Remote",
    isRemote: true,
    category: "influencer",
    description: "Create authentic user-generated content for our social channels. Perfect for models looking to build their content creation portfolio.",
    requirements: [
      "Strong personal brand on social media",
      "Experience creating reels/TikToks",
      "Own camera equipment preferred",
      "Consistent aesthetic",
    ],
    compensation: "$500 - $2,000 per deliverable",
    postedAt: "2026-01-06",
    applicants: 67,
    tags: ["ugc", "content-creator", "social-media", "remote"],
  },
];

export const getJobsByCategory = (category: string) =>
  mockJobPostings.filter((job) => job.category === category);

export const getRemoteJobs = () => mockJobPostings.filter((job) => job.isRemote);

export const searchJobs = (query: string) =>
  mockJobPostings.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

