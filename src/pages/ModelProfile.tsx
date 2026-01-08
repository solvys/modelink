import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Instagram,
  Mail,
  Globe,
  Calendar,
  MapPin,
} from "lucide-react";
import { getModelBySlug } from "@/api/models";
import { getAgencyById } from "@/api/agencies";
import { GallerySection } from "@/components/GallerySection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { BookingCalendar } from "@/components/BookingCalendar";
import { BWHCard } from "@/components/BWHCard";

function ModelProfile() {
  const { slug } = useParams<{ slug: string }>();
  const [bookingOpen, setBookingOpen] = useState(false);
  const model = slug ? getModelBySlug(slug) : null;

  if (!model) {
    return (
      <div className="min-h-screen bg-[--bg-base] flex flex-col items-center justify-center text-center gap-6 px-6">
        <p className="text-2xl font-semibold text-white">Model not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 hover:bg-white/90 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    );
  }

  const agency = getAgencyById(model.agencyId);

  return (
    <div className="min-h-screen bg-[--bg-base] text-white">
      {/* Background Accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-950/80 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            {agency?.logo && (
              <Link to={`/agencies/${agency.slug}`}>
                <img
                  src={agency.logo}
                  alt={agency.name}
                  className="h-8 w-8 rounded-lg object-cover hover:opacity-80 transition-opacity"
                />
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Profile Intro Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <img
                src={model.profilePhoto}
                alt={model.name}
                className="w-48 h-64 lg:w-64 lg:h-80 rounded-2xl object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">{model.name}</h1>
                {agency && (
                  <Link
                    to={`/agencies/${agency.slug}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Represented by {agency.name}
                  </Link>
                )}
              </div>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* BWH Combined Card */}
                <BWHCard
                  bust={model.stats.bust}
                  waist={model.stats.waist}
                  hips={model.stats.hips}
                  height={model.stats.height}
                  className="col-span-2"
                />

                {/* Additional Stats */}
                {model.stats.shoeSize && (
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-xs text-white/40 mb-1">Shoe Size</p>
                    <p className="text-lg font-semibold">{model.stats.shoeSize}</p>
                  </div>
                )}
                {model.stats.hairColor && (
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-xs text-white/40 mb-1">Hair</p>
                    <p className="text-lg font-semibold">{model.stats.hairColor}</p>
                  </div>
                )}
                {model.stats.eyeColor && (
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-xs text-white/40 mb-1">Eyes</p>
                    <p className="text-lg font-semibold">{model.stats.eyeColor}</p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={() => setBookingOpen(true)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold hover:bg-white/90 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Book Now
              </button>
            </div>
          </div>
        </motion.section>

        {/* Portfolio */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
          id="portfolio"
        >
          <GallerySection
            galleries={model.galleries}
            videos={model.videos}
            lookbookMode={false}
          />
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-16"
          id="experience"
        >
          <ExperienceTimeline experience={model.experience} />
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          id="contact"
        >
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex flex-wrap gap-4">
              {model.socials?.instagram && (
                <a
                  href={`https://instagram.com/${model.socials.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-pink-400" />
                  <span>{model.socials.instagram}</span>
                </a>
              )}
              {model.socials?.website && (
                <a
                  href={model.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span>Website</span>
                </a>
              )}
              {agency?.contactEmail && (
                <a
                  href={`mailto:${agency.contactEmail}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-5 h-5 text-white/60" />
                  <span>Contact via Agency</span>
                </a>
              )}
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {agency?.logo && (
              <img
                src={agency.logo}
                alt={agency.name}
                className="h-8 w-8 rounded-lg object-cover"
              />
            )}
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} {agency?.name || "ModelLink"}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Calendar Modal */}
      <BookingCalendar
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        modelName={model.name}
      />
    </div>
  );
}

export default ModelProfile;
