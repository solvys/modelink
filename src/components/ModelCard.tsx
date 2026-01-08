"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Model } from "@/data/types";

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <Link to={`/models/${model.slug}`}>
      <motion.div
        className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-soft-gray"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={model.profilePhoto}
          alt={model.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{model.name}</h3>
          <div className="flex flex-wrap gap-2 text-sm text-white/90">
            {model.stats.height && <span>{model.stats.height}</span>}
            {model.stats.hairColor && <span>• {model.stats.hairColor}</span>}
            {model.stats.eyeColor && <span>• {model.stats.eyeColor}</span>}
          </div>
          {model.availability && (
            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  model.availability === "available"
                    ? "bg-green-500 text-white"
                    : model.availability === "limited"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {model.availability === "available"
                  ? "Available"
                  : model.availability === "limited"
                  ? "Limited"
                  : "Unavailable"}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

