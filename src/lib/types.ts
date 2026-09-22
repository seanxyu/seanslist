// Sean's List — shared types

export type Category =
  | "community"
  | "housing"
  | "jobs"
  | "personals"
  | "services"
  | "for_sale";

export type ReactionType = "upvote" | "downvote" | "curiosity" | "interest";

export interface Listing {
  id: string;
  anonHandle: string;
  avatarSeed: string;
  category: Category;
  subcategory: string;
  title: string;
  body: string;
  metadata: {
    price?: number;
    location?: string;
    salaryRange?: string;
    skills?: string[];
    [key: string]: unknown;
  };
  status: "live" | "pending" | "removed";
  isCurated?: boolean;
  createdAt: string; // ISO timestamp
  expiresAt: string; // ISO timestamp
  viewCount: number;
}

export interface Comment {
  id: string;
  listingId: string;
  anonHandle: string;
  avatarSeed: string;
  body: string;
  isAgent: boolean;
  createdAt: string;
}

export interface Reaction {
  type: ReactionType;
  count: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  community: "community",
  housing: "housing",
  jobs: "jobs",
  personals: "personals",
  services: "services",
  for_sale: "for sale",
};

export const SUBCATEGORIES: Record<Category, string[]> = {
  community: ["activities", "artists", "childcare", "classes", "events", "general", "musicians", "pets"],
  housing: ["apartments", "housing swap", "parking", "real estate", "storage"],
  jobs: ["accounting", "admin / office", "art / media", "business", "customer service", "education", "engineering", "finance", "general labor", "human resource", "internet engineering", "legal", "marketing", "non-profit", "retail", "sales", "software", "technical support", "telecommute"],
  personals: ["activity partners", "missed connections", "romance", "strictly platonic"],
  services: ["automotive", "beauty", "computer", "creative", "cycle", "event", "farm & garden", "financial", "labor / move", "legal", "lessons", "marine", "pet", "real estate", "skilled trade", "sm biz"],
  for_sale: ["antiques", "appliances", "arts & crafts", "cameras", "clothing", "computers", "electronics", "furniture", "garage sale", "jewelry", "musical instruments", "sporting", "tools", "video gaming"],
};

export const REACTION_TYPES: { type: ReactionType; glyph: string; label: string }[] = [
  { type: "upvote", glyph: "👍", label: "upvote" },
  { type: "downvote", glyph: "👎", label: "downvote" },
  { type: "curiosity", glyph: "🤔", label: "curiosity" },
  { type: "interest", glyph: "✨", label: "interest" },
];
