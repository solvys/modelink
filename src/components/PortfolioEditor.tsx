"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  GripVertical,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Type,
  Palette,
  LayoutGrid,
  Save,
  Undo,
  Image,
  Grid2x2,
  Sparkles,
  Globe,
  Rocket,
  UploadCloud,
  Share2,
  Link2,
  Star,
  Check,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  name: string;
  type: "hero" | "gallery" | "experience" | "contact" | "stats" | "video";
  visible: boolean;
}

const defaultSections: Section[] = [
  { id: "hero", name: "Profile Hero", type: "hero", visible: true },
  { id: "stats", name: "Stats Card", type: "stats", visible: true },
  { id: "gallery", name: "Portfolio Gallery", type: "gallery", visible: true },
  { id: "video", name: "Video Reel", type: "video", visible: true },
  { id: "experience", name: "Experience Timeline", type: "experience", visible: true },
  { id: "contact", name: "Get In Touch", type: "contact", visible: true },
];

const sectionRegistry = defaultSections.reduce<Record<string, Section>>((acc, section) => {
  acc[section.id] = { ...section };
  return acc;
}, {});

const cloneSection = (id: Section["id"]) => ({ ...sectionRegistry[id] });

const createTemplateSections = (order: Array<{ id: Section["id"]; visible?: boolean }>) =>
  order.map(({ id, visible = true }) => ({ ...cloneSection(id), visible }));

const fonts = [
  { id: "playfair", name: "Playfair Display", class: "font-serif" },
  { id: "inter", name: "Inter", class: "font-sans" },
  { id: "outfit", name: "Outfit", class: "font-outfit" },
  { id: "great-vibes", name: "Great Vibes", class: "font-cursive-primary" },
];

const colorPresets = [
  { id: "blush", primary: "#F4C2C2", secondary: "#89CFF0", accent: "#FFFFFF" },
  { id: "sage", primary: "#B4C7B4", secondary: "#E8F0E8", accent: "#4A5D4A" },
  { id: "lavender", primary: "#E6E6FA", secondary: "#9370DB", accent: "#4B0082" },
  { id: "midnight", primary: "#1a1a2e", secondary: "#16213e", accent: "#0f3460" },
  { id: "sunset", primary: "#FF6B6B", secondary: "#FFA07A", accent: "#FFD93D" },
];

interface MediaAsset {
  id: string;
  url: string;
  label: string;
  sectionId: string | null;
  featured: boolean;
}

interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  badge?: string;
  sections: Section[];
}

interface AnimationSettings {
  preset: "fade" | "slide" | "zoom";
  duration: number;
  delay: number;
  easing: "easeInOut" | "easeOut" | "anticipate";
}

interface SeoSettings {
  title: string;
  description: string;
  slug: string;
  keywords: string[];
  ogImage: string;
}

interface PublishSettings {
  isPublished: boolean;
  version: string;
  lastPublishedAt: string;
  previewUrl: string;
  shareUrl: string;
}

const initialMediaAssets: MediaAsset[] = [
  {
    id: "media-1",
    url: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80",
    label: "Editorial rooftop",
    sectionId: "hero",
    featured: true,
  },
  {
    id: "media-2",
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    label: "Studio portrait",
    sectionId: "gallery",
    featured: false,
  },
  {
    id: "media-3",
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    label: "Runway moment",
    sectionId: "experience",
    featured: false,
  },
];

const templateLibrary: TemplateDefinition[] = [
  {
    id: "minimal",
    name: "Minimal Grid",
    description: "Hero, stats, gallery, and contact on a clean vertical flow.",
    badge: "Popular",
    sections: createTemplateSections([
      { id: "hero" },
      { id: "stats" },
      { id: "gallery" },
      { id: "contact" },
    ]),
  },
  {
    id: "editorial",
    name: "Editorial Narrative",
    description: "Story-driven layout with video and experience timelines.",
    sections: createTemplateSections([
      { id: "hero" },
      { id: "video" },
      { id: "experience" },
      { id: "gallery" },
      { id: "contact" },
    ]),
  },
  {
    id: "studio",
    name: "Studio Showcase",
    description: "Gallery-first approach, perfect for campaign decks.",
    sections: createTemplateSections([
      { id: "gallery" },
      { id: "stats" },
      { id: "video" },
      { id: "contact" },
    ]),
  },
];

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const animationVariants = {
  fade: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slide: {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
  },
} as const;

const easingOptions: AnimationSettings["easing"][] = ["easeOut", "easeInOut", "anticipate"];

type EditorTab =
  | "sections"
  | "typography"
  | "colors"
  | "media"
  | "layouts"
  | "animations"
  | "seo"
  | "publish";

export function PortfolioEditor() {
  const [sections, setSections] = useState<Section[]>(defaultSections);
  const [activeTab, setActiveTab] = useState<EditorTab>("sections");
  const [selectedFont, setSelectedFont] = useState("playfair");
  const [selectedPreset, setSelectedPreset] = useState("blush");
  const [customColors, setCustomColors] = useState({
    primary: "#F4C2C2",
    secondary: "#89CFF0",
    accent: "#FFFFFF",
  });
  const [mediaLibrary, setMediaLibrary] = useState<MediaAsset[]>(initialMediaAssets);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateLibrary[0]?.id ?? "minimal");
  const [animationSettings, setAnimationSettings] = useState<AnimationSettings>({
    preset: "fade",
    duration: 0.6,
    delay: 0.08,
    easing: "easeOut",
  });
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    title: "Aria Chen — Portfolio",
    description: "Editorial, commercial, and runway blends guided by modern styling.",
    slug: "aria-chen",
    keywords: ["modeling", "editorial", "digital portfolio"],
    ogImage: initialMediaAssets[0]?.url ?? "",
  });
  const [publishSettings, setPublishSettings] = useState<PublishSettings>({
    isPublished: false,
    version: "v1.0.0",
    lastPublishedAt: "",
    previewUrl: "modelink.com/aria-chen",
    shareUrl: "https://modelink.com/aria-chen",
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const moveSection = (index: number, direction: "up" | "down") => {
    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    [newSections[index], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[index],
    ];
    setSections(newSections);
  };

  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  };

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const tabs: { id: EditorTab; label: string; icon: React.ReactNode }[] = [
    { id: "sections", label: "Sections", icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "typography", label: "Typography", icon: <Type className="w-4 h-4" /> },
    { id: "colors", label: "Colors", icon: <Palette className="w-4 h-4" /> },
    { id: "media", label: "Media", icon: <Image className="w-4 h-4" /> },
    { id: "layouts", label: "Layouts", icon: <Grid2x2 className="w-4 h-4" /> },
    { id: "animations", label: "Motion", icon: <Sparkles className="w-4 h-4" /> },
    { id: "seo", label: "SEO", icon: <Globe className="w-4 h-4" /> },
    { id: "publish", label: "Publish", icon: <Rocket className="w-4 h-4" /> },
  ];

  const handleMediaUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const uploads = await Promise.all(
      Array.from(fileList).map(
        (file) =>
          new Promise<MediaAsset>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                id: `media-${createId()}`,
                url: reader.result as string,
                label: file.name.replace(/\.[^/.]+$/, ""),
                sectionId: null,
                featured: false,
              });
            };
            reader.readAsDataURL(file);
          })
      )
    );

    setMediaLibrary((prev) => [...uploads, ...prev]);
  };

  const toggleFeaturedAsset = (assetId: string) => {
    setMediaLibrary((prev) =>
      prev.map((asset) =>
        asset.id === assetId ? { ...asset, featured: !asset.featured } : asset
      )
    );
  };

  const assignAssetToSection = (assetId: string, sectionValue: string) => {
    setMediaLibrary((prev) =>
      prev.map((asset) =>
        asset.id === assetId
          ? { ...asset, sectionId: sectionValue === "" ? null : sectionValue }
          : asset
      )
    );
  };

  const removeAsset = (assetId: string) => {
    setMediaLibrary((prev) => prev.filter((asset) => asset.id !== assetId));
  };

  const handleApplyTemplate = (templateId: string) => {
    const template = templateLibrary.find((entry) => entry.id === templateId);
    if (!template) return;

    setSections(template.sections.map((section) => ({ ...section })));
    setSelectedTemplateId(templateId);
  };

  const handleAnimationSettingChange = <K extends keyof AnimationSettings>(
    key: K,
    value: AnimationSettings[K]
  ) => {
    setAnimationSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSeoFieldChange = <K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) => {
    setSeoSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleKeywordInput = (value: string) => {
    const keywords = value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
    handleSeoFieldChange("keywords", keywords);
  };

  const bumpVersion = (version: string) => {
    const [, major = "1", minor = "0", patch = "0"] = version.match(/^v?(\d+)\.(\d+)\.(\d+)$/) || [];
    const nextPatch = Number(patch) + 1;
    return `v${major}.${minor}.${nextPatch}`;
  };

  const handlePublishToggle = () => {
    setPublishSettings((prev) => ({
      ...prev,
      isPublished: !prev.isPublished,
    }));
  };

  const handlePublish = () => {
    if (isPublishing) return;
    setIsPublishing(true);
    setTimeout(() => {
      setPublishSettings((prev) => ({
        ...prev,
        isPublished: true,
        lastPublishedAt: new Date().toISOString(),
        version: bumpVersion(prev.version),
      }));
      setIsPublishing(false);
    }, 1000);
  };

  const handleCopyShareUrl = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
      return;
    }
    try {
      await navigator.clipboard.writeText(publishSettings.shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviewClick = () => {
    if (typeof window === "undefined") return;
    window.open(
      publishSettings.shareUrl || `https://${publishSettings.previewUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const sectionOptions = useMemo(
    () => sections.map((section) => ({ id: section.id, name: section.name })),
    [sections]
  );

  const keywordInputValue = seoSettings.keywords.join(", ");
  const lastPublishedLabel = publishSettings.lastPublishedAt
    ? new Date(publishSettings.lastPublishedAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Not published yet";

  return (
    <div className="relative min-h-screen pt-28 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Portfolio Studio</h1>
            <p className="text-white/60 mt-2">
              Customize your public portfolio layout and style
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
              <Undo className="w-4 h-4" /> Reset
            </button>
            <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-gray-900 font-medium hover:bg-white/90 transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Editor Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-80 flex-shrink-0"
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-white text-gray-900"
                      : "bg-transparent text-white/70 hover:bg-white/[0.06]"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-transparent border border-white/[0.06] rounded-2xl p-5">
              {activeTab === "sections" && (
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl bg-[--bg-input] border border-white/[0.04] transition-opacity",
                        !section.visible && "opacity-50"
                      )}
                    >
                      <GripVertical className="w-4 h-4 text-white/30 cursor-grab" />
                      <span className="flex-1 text-sm text-white font-medium">
                        {section.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveSection(index, "up")}
                          disabled={index === 0}
                          className="p-1 rounded text-white/40 hover:text-white disabled:opacity-30"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSection(index, "down")}
                          disabled={index === sections.length - 1}
                          className="p-1 rounded text-white/40 hover:text-white disabled:opacity-30"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleVisibility(section.id)}
                          className="p-1 rounded text-white/40 hover:text-white"
                        >
                          {section.visible ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => removeSection(section.id)}
                          className="p-1 rounded text-white/40 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-dashed border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors">
                    <Plus className="w-4 h-4" /> Add Section
                  </button>
                </div>
              )}

              {activeTab === "typography" && (
                <div className="space-y-4">
                  <p className="text-sm text-white/50">
                    Choose a font for your portfolio
                  </p>
                  <div className="space-y-2">
                    {fonts.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font.id)}
                        className={cn(
                          "w-full p-4 rounded-xl text-left transition-all",
                          selectedFont === font.id
                            ? "bg-white text-gray-900"
                            : "bg-[--bg-input] text-white hover:bg-white/[0.05]",
                          font.class
                        )}
                      >
                        <span className="text-lg">{font.name}</span>
                        <p
                          className={cn(
                            "text-sm mt-1",
                            selectedFont === font.id
                              ? "text-gray-600"
                              : "text-white/40"
                          )}
                        >
                          The quick brown fox jumps
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "colors" && (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-white/50 mb-3">Color Presets</p>
                    <div className="grid grid-cols-5 gap-2">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setSelectedPreset(preset.id);
                            setCustomColors({
                              primary: preset.primary,
                              secondary: preset.secondary,
                              accent: preset.accent,
                            });
                          }}
                          className={cn(
                            "aspect-square rounded-xl transition-all",
                            selectedPreset === preset.id
                              ? "ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]"
                              : ""
                          )}
                          style={{ backgroundColor: preset.primary }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-white/50">Custom Colors</p>
                    {(["primary", "secondary", "accent"] as const).map((key) => (
                      <div key={key} className="flex items-center gap-3">
                        <input
                          type="color"
                          value={customColors[key]}
                          onChange={(e) =>
                            setCustomColors((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          className="w-10 h-10 rounded-lg cursor-pointer border-0"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white capitalize">
                            {key}
                          </p>
                          <p className="text-xs text-white/40 uppercase">
                            {customColors[key]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="space-y-4">
                  <div
                    className="rounded-2xl border border-dashed border-white/15 bg-black/10 p-4 text-center text-white/70 cursor-pointer hover:border-white/40 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud className="w-6 h-6 mx-auto mb-2 text-white/60" />
                    <p className="text-sm font-semibold text-white">Drag & drop assets</p>
                    <p className="text-xs text-white/50">PNG, JPG or WebP • up to 25MB each</p>
                    <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-4 py-1.5 text-xs font-semibold">
                      <Plus className="w-3 h-3" />
                      Upload files
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(event) => {
                        void handleMediaUpload(event.target.files);
                        event.target.value = "";
                      }}
                    />
                  </div>

                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                    {mediaLibrary.length === 0 && (
                      <p className="text-sm text-white/60 text-center py-6">
                        Upload imagery to start building your studio library.
                      </p>
                    )}
                    {mediaLibrary.map((asset) => (
                      <div
                        key={asset.id}
                        className="rounded-2xl border border-white/10 bg-[--bg-input] overflow-hidden"
                      >
                        <div className="relative h-36">
                          <img
                            src={asset.url}
                            alt={asset.label}
                            className="w-full h-full object-cover"
                          />
                          {asset.featured && (
                            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-0.5 text-[11px] font-semibold text-gray-900">
                              <Star className="w-3 h-3" fill="currentColor" />
                              Spotlight
                            </span>
                          )}
                        </div>
                        <div className="p-3 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-white">{asset.label}</p>
                              <p className="text-xs text-white/50 flex items-center gap-1 mt-0.5">
                                <Tag className="w-3 h-3" />
                                {asset.sectionId
                                  ? sections.find((section) => section.id === asset.sectionId)?.name
                                  : "Unassigned"}
                              </p>
                            </div>
                            <button
                              onClick={() => removeAsset(asset.id)}
                              className="p-1 rounded-full text-white/60 hover:text-rose-300 hover:bg-white/10 transition-colors"
                              aria-label="Remove asset"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wide text-white/40 mb-1 block">
                              Assign to section
                            </label>
                            <select
                              value={asset.sectionId ?? ""}
                              onChange={(e) => assignAssetToSection(asset.id, e.target.value)}
                              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white/80 focus:border-white/50 outline-none"
                            >
                              <option value="">Unassigned</option>
                              {sectionOptions.map((section) => (
                                <option key={section.id} value={section.id}>
                                  {section.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            onClick={() => toggleFeaturedAsset(asset.id)}
                            className={cn(
                              "w-full flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                              asset.featured
                                ? "border-amber-300/70 text-amber-200"
                                : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                            )}
                          >
                            <Star
                              className="w-4 h-4"
                              fill={asset.featured ? "currentColor" : "none"}
                            />
                            {asset.featured ? "Featured visual" : "Mark as featured"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "layouts" && (
                <div className="space-y-3 max-h-[430px] overflow-y-auto pr-1">
                  {templateLibrary.map((template) => (
                    <div
                      key={template.id}
                      className={cn(
                        "rounded-2xl border p-4 space-y-3 transition-colors",
                        selectedTemplateId === template.id
                          ? "border-white/40 bg-white/10"
                          : "border-white/10 bg-white/5"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-semibold text-white">{template.name}</p>
                          <p className="text-xs text-white/60 mt-1">{template.description}</p>
                        </div>
                        {template.badge && (
                          <span className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] uppercase tracking-wide text-white/80">
                            {template.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-[11px] uppercase text-white/50">
                        {template.sections.map((section) => (
                          <span
                            key={`${template.id}-${section.id}`}
                            className="rounded-full border border-white/15 px-2 py-0.5"
                          >
                            {section.name}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleApplyTemplate(template.id)}
                        className={cn(
                          "w-full rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                          selectedTemplateId === template.id
                            ? "bg-white text-gray-900"
                            : "border border-white/15 text-white/80 hover:border-white/40"
                        )}
                      >
                        {selectedTemplateId === template.id ? "Template Active" : "Use Template"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "animations" && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-white/60 mb-2">Entrance preset</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(["fade", "slide", "zoom"] as const).map((preset) => (
                        <button
                          key={preset}
                          onClick={() => handleAnimationSettingChange("preset", preset)}
                          className={cn(
                            "rounded-xl border px-3 py-2 text-sm font-semibold capitalize transition-colors",
                            animationSettings.preset === preset
                              ? "bg-white text-gray-900"
                              : "border-white/15 text-white/70 hover:border-white/40"
                          )}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-wide text-white/40">
                      Duration ({animationSettings.duration.toFixed(1)}s)
                    </label>
                    <input
                      type="range"
                      min={0.3}
                      max={1.2}
                      step={0.1}
                      value={animationSettings.duration}
                      onChange={(e) =>
                        handleAnimationSettingChange("duration", parseFloat(e.target.value))
                      }
                      className="w-full"
                    />
                    <label className="text-xs uppercase tracking-wide text-white/40">
                      Stagger ({animationSettings.delay.toFixed(2)}s)
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={0.3}
                      step={0.01}
                      value={animationSettings.delay}
                      onChange={(e) =>
                        handleAnimationSettingChange("delay", parseFloat(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wide text-white/40">
                      Easing
                    </label>
                    <select
                      value={animationSettings.easing}
                      onChange={(e) =>
                        handleAnimationSettingChange("easing", e.target.value as AnimationSettings["easing"])
                      }
                      className="mt-1 w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white focus:border-white/50 outline-none"
                    >
                      {easingOptions.map((easing) => (
                        <option key={easing} value={easing}>
                          {easing}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                      Live Preview
                    </p>
                    <motion.div
                      variants={animationVariants[animationSettings.preset]}
                      initial="initial"
                      animate="animate"
                      transition={{
                        duration: animationSettings.duration,
                        ease: animationSettings.easing,
                        delay: animationSettings.delay,
                      }}
                      className="rounded-xl border border-white/10 bg-white/10 p-4 space-y-2"
                    >
                      <p className="text-sm font-semibold text-white">Motion feels ready</p>
                      <p className="text-xs text-white/60">
                        Sections will animate using this preset and timing on publish.
                      </p>
                    </motion.div>
                  </div>
                </div>
              )}

              {activeTab === "seo" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wide text-white/40 mb-1 block">
                      Meta Title
                    </label>
                    <input
                      value={seoSettings.title}
                      onChange={(e) => handleSeoFieldChange("title", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white focus:border-white/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-white/40 mb-1 block">
                      Meta Description
                    </label>
                    <textarea
                      value={seoSettings.description}
                      onChange={(e) => handleSeoFieldChange("description", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white focus:border-white/50 outline-none"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-white/40 mb-1 block">
                      Portfolio Slug
                    </label>
                    <div className="flex items-center rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white/70">
                      <span className="text-white/40 text-xs mr-2">modelink.com/</span>
                      <input
                        value={seoSettings.slug}
                        onChange={(e) => handleSeoFieldChange("slug", e.target.value)}
                        className="flex-1 bg-transparent text-white text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-white/40 mb-1 block">
                      Keywords (comma separated)
                    </label>
                    <input
                      value={keywordInputValue}
                      onChange={(e) => handleKeywordInput(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white focus:border-white/50 outline-none"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs uppercase tracking-wide text-white/40">
                        Open Graph image
                      </p>
                      <span className="text-[10px] text-white/40">
                        Uses first media if none selected
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {mediaLibrary.slice(0, 4).map((asset) => (
                        <button
                          key={`og-${asset.id}`}
                          onClick={() => handleSeoFieldChange("ogImage", asset.url)}
                          className={cn(
                            "relative h-20 rounded-2xl overflow-hidden border",
                            seoSettings.ogImage === asset.url
                              ? "border-white"
                              : "border-white/15 hover:border-white/40"
                          )}
                        >
                          <img
                            src={asset.url}
                            alt={asset.label}
                            className="w-full h-full object-cover"
                          />
                          {seoSettings.ogImage === asset.url && (
                            <Check className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 space-y-2">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/40">Preview</p>
                    <div className="rounded-xl bg-white text-gray-900 p-3 space-y-1">
                      <p className="text-xs text-gray-500">{publishSettings.previewUrl}</p>
                      <p className="text-sm font-semibold">{seoSettings.title}</p>
                      <p className="text-xs text-gray-600 line-clamp-2">{seoSettings.description}</p>
                      <div className="text-[10px] uppercase tracking-wide text-emerald-600 mt-1">
                        {seoSettings.keywords.slice(0, 3).join(" • ")}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "publish" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-[--bg-input] p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/40">Status</p>
                      <p className="text-sm font-semibold text-white">
                        {publishSettings.isPublished ? "Live on modelink.com" : "Draft only"}
                      </p>
                      <p className="text-xs text-white/50">{lastPublishedLabel}</p>
                    </div>
                    <button
                      onClick={handlePublishToggle}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                        publishSettings.isPublished
                          ? "bg-white text-gray-900"
                          : "border border-white/20 text-white hover:border-white/40"
                      )}
                    >
                      {publishSettings.isPublished ? "Unpublish" : "Enable live"}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-[--bg-input] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-white/40">Share link</p>
                          <p className="text-sm text-white">{publishSettings.shareUrl}</p>
                        </div>
                        <button
                          onClick={() => void handleCopyShareUrl()}
                          className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:border-white/40 transition-colors"
                        >
                          <Link2 className="w-3 h-3" />
                          {copySuccess ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <p className="text-xs text-white/50">
                        Share this preview with clients or collaborators before publishing.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[--bg-input] p-4">
                      <p className="text-xs uppercase tracking-wide text-white/40">Version</p>
                      <p className="text-sm font-semibold text-white">{publishSettings.version}</p>
                      <p className="text-xs text-white/50">
                        {publishSettings.lastPublishedAt ? "Last shipped" : "Not live yet"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handlePreviewClick}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:border-white/40 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Open preview
                    </button>
                    <button
                      onClick={handlePublish}
                      disabled={isPublishing}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-gray-900 px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60"
                    >
                      <Rocket className="w-4 h-4" />
                      {isPublishing ? "Publishing..." : "Publish to web"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1 mt-[3.25rem]"
          >
            <div className="bg-transparent border border-white/[0.06] rounded-2xl overflow-hidden">
              {/* Browser Frame */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[--bg-input] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="flex-1 mx-8">
                  <div className="bg-white/5 rounded-lg px-4 py-1.5 text-sm text-white/40 text-center">
                    modelink.com/aria-chen
                  </div>
                </div>
              </div>

              {/* Preview Content */}
              <div
                className="p-8 min-h-[500px]"
                style={{
                  background: `linear-gradient(135deg, ${customColors.primary}15, ${customColors.secondary}15)`,
                }}
              >
                {sections
                  .filter((s) => s.visible)
                  .map((section) => (
                    <div
                      key={section.id}
                      className="mb-6 p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <p className="text-white/60 text-sm uppercase tracking-wider">
                        {section.name}
                      </p>
                      <div className="mt-4 h-20 rounded-xl bg-white/5 flex items-center justify-center">
                        <span className="text-white/30 text-sm">
                          Preview Content
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

