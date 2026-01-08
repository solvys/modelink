import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Users,
  Briefcase,
  Mail,
  Globe,
  Instagram,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock agency data
const mockAgencyProfile = {
  id: "agency-nova",
  name: "Nova Talent Group",
  slug: "nova-talent",
  logo: "https://fav.farm/novatalent.com",
  coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=600&fit=crop",
  description: "Premier talent management agency representing models, actors, and creators worldwide. Specializing in editorial, runway, and commercial work for top brands.",
  location: "New York, NY",
  founded: "2015",
  specialties: ["Editorial", "Runway", "Commercial", "Luxury"],
  stats: {
    models: 127,
    campaigns: 450,
    brands: 85,
  },
  socials: {
    instagram: "@novatalent",
    website: "novatalent.com",
    email: "bookings@novatalent.com",
  },
  featuredModels: [
    { id: "1", name: "Sophia Laurent", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop" },
    { id: "2", name: "Marcus Webb", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop" },
    { id: "3", name: "Maya Rodriguez", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop" },
    { id: "4", name: "James Chen", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop" },
  ],
  recentCampaigns: [
    { brand: "Gucci", type: "Fall Campaign", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop" },
    { brand: "Dior", type: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop" },
    { brand: "Versace", type: "Runway", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop" },
  ],
};

function AgencyProfile() {
  const { slug } = useParams<{ slug: string }>();
  const agency = mockAgencyProfile; // In real app, fetch by slug

  return (
    <div className="min-h-screen bg-[--bg-base] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-950/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <button className="px-5 py-2 rounded-xl bg-white text-gray-900 font-medium hover:bg-white/90 transition-colors">
              Contact Agency
            </button>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={agency.coverImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="-mt-16 relative z-10 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={agency.logo}
              alt={agency.name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-[#0a0a0a]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{agency.name}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                  Agency
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-white/60 mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {agency.location}
                </div>
                <span>Est. {agency.founded}</span>
              </div>
              <p className="text-white/70 max-w-2xl mb-6">{agency.description}</p>
              <div className="flex flex-wrap gap-2">
                {agency.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1.5 rounded-full text-sm bg-white/5 text-white/70"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-white/40" />
            <p className="text-3xl font-bold mb-1">{agency.stats.models}</p>
            <p className="text-sm text-white/50">Models</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center">
            <Briefcase className="w-6 h-6 mx-auto mb-2 text-white/40" />
            <p className="text-3xl font-bold mb-1">{agency.stats.campaigns}</p>
            <p className="text-sm text-white/50">Campaigns</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center">
            <Globe className="w-6 h-6 mx-auto mb-2 text-white/40" />
            <p className="text-3xl font-bold mb-1">{agency.stats.brands}</p>
            <p className="text-sm text-white/50">Brand Partners</p>
          </div>
        </motion.div>

        {/* Featured Models */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Featured Talent</h2>
            <button className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {agency.featuredModels.map((model) => (
              <Link
                key={model.id}
                to={`/models/${model.id}`}
                className="group"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="font-medium text-white/90 group-hover:text-white transition-colors">
                  {model.name}
                </p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Recent Campaigns */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Campaigns</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {agency.recentCampaigns.map((campaign, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-white">{campaign.brand}</p>
                  <p className="text-sm text-white/50">{campaign.type}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-16"
        >
          <h2 className="text-xl font-semibold mb-6">Get In Touch</h2>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${agency.socials.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-white/60" />
                <span>{agency.socials.email}</span>
              </a>
              <a
                href={`https://instagram.com/${agency.socials.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4 text-white/60" />
                <span>{agency.socials.instagram}</span>
              </a>
              <a
                href={`https://${agency.socials.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Globe className="w-4 h-4 text-white/60" />
                <span>{agency.socials.website}</span>
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default AgencyProfile;

