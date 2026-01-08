import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Camera,
  Star,
  Mail,
  Globe,
  Instagram,
  ChevronRight,
} from "lucide-react";

// Mock brand data
const mockBrandProfile = {
  id: "brand-glossier",
  name: "Glossier",
  slug: "glossier",
  logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&h=600&fit=crop",
  tagline: "Skin first. Makeup second. Smile always.",
  description: "Beauty company inspired by real life. We create skincare and makeup products that celebrate what makes you unique.",
  location: "New York, NY",
  founded: "2014",
  categories: ["Beauty", "Skincare", "Makeup", "Lifestyle"],
  stats: {
    campaigns: 156,
    collaborations: 89,
    reviews: "4.9",
  },
  socials: {
    instagram: "@glossier",
    website: "glossier.com",
    email: "hello@glossier.com",
  },
  recentWork: [
    {
      title: "You Look Good Campaign",
      model: "Sophia Laurent",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop",
    },
    {
      title: "Cloud Paint Launch",
      model: "Maya Rodriguez",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
    },
    {
      title: "Boy Brow Refresh",
      model: "James Chen",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    },
    {
      title: "Futuredew Feature",
      model: "Anna Smith",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
    },
  ],
  openCastings: [
    {
      title: "Spring 2026 Campaign",
      type: "Beauty",
      deadline: "Jan 25, 2026",
    },
    {
      title: "UGC Content Creators",
      type: "Social",
      deadline: "Ongoing",
    },
  ],
};

function BrandProfile() {
  const { slug } = useParams<{ slug: string }>();
  const brand = mockBrandProfile;

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
              Work With Us
            </button>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={brand.coverImage}
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
              src={brand.logo}
              alt={brand.name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-[#0a0a0a]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{brand.name}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400">
                  Brand
                </span>
              </div>
              <p className="text-xl text-white/60 mb-2 italic">{brand.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 text-white/60 mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {brand.location}
                </div>
                <span>Since {brand.founded}</span>
              </div>
              <p className="text-white/70 max-w-2xl mb-6">{brand.description}</p>
              <div className="flex flex-wrap gap-2">
                {brand.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1.5 rounded-full text-sm bg-white/5 text-white/70"
                  >
                    {cat}
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
            <Camera className="w-6 h-6 mx-auto mb-2 text-white/40" />
            <p className="text-3xl font-bold mb-1">{brand.stats.campaigns}</p>
            <p className="text-sm text-white/50">Campaigns</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center">
            <Camera className="w-6 h-6 mx-auto mb-2 text-white/40" />
            <p className="text-3xl font-bold mb-1">{brand.stats.collaborations}</p>
            <p className="text-sm text-white/50">Model Collabs</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center">
            <Star className="w-6 h-6 mx-auto mb-2 text-amber-400" />
            <p className="text-3xl font-bold mb-1">{brand.stats.reviews}</p>
            <p className="text-sm text-white/50">Avg Rating</p>
          </div>
        </motion.div>

        {/* Open Castings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Open Castings</h2>
            <Link
              to="/agency-match"
              className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {brand.openCastings.map((casting, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white mb-1">{casting.title}</p>
                    <p className="text-sm text-white/50">{casting.type}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-violet-500/10 text-violet-300">
                    {casting.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Recent Work */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brand.recentWork.map((work, i) => (
              <div key={i} className="group">
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-2">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="font-medium text-white/90 text-sm">{work.title}</p>
                <p className="text-xs text-white/50">with {work.model}</p>
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
          <h2 className="text-xl font-semibold mb-6">Connect With {brand.name}</h2>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${brand.socials.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-white/60" />
                <span>{brand.socials.email}</span>
              </a>
              <a
                href={`https://instagram.com/${brand.socials.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4 text-white/60" />
                <span>{brand.socials.instagram}</span>
              </a>
              <a
                href={`https://${brand.socials.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Globe className="w-4 h-4 text-white/60" />
                <span>{brand.socials.website}</span>
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default BrandProfile;

