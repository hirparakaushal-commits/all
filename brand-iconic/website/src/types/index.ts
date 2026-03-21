export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  heroDescription: string;
  problem: {
    title: string;
    description: string;
    painPoints: string[];
  };
  approach: {
    title: string;
    steps: { title: string; description: string }[];
  };
  deliverables: string[];
  results: {
    metric: string;
    value: string;
    description: string;
  };
  faqs: { question: string; answer: string }[];
}

export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  heroImage: string;
  resultMetric: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: { label: string; value: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  target: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: number;
  thumbnail: string;
  featured?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}
