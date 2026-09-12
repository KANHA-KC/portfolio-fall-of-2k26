export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectCover {
  tone: string;
  accent: string;
  svg: string;
}

export interface Project {
  slug: string;
  n: string;
  title: string;
  year: string;
  category: string;
  filterCategory: 'ai' | 'data' | 'healthcare';
  role: string;
  thesis: string;
  cover: ProjectCover;
  metrics: ProjectMetric[];
  problem: string;
  idea: string;
  process: string[];
  design: string[];
  learned: string;
  nextSlug: string;
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  read: string;
  tag: string;
  excerpt: string;
  body: string[];
}

export interface Experiment {
  id: string;
  title: string;
  date: string;
  tag: string;
  desc: string;
  type: 'interactive-text' | 'interactive-switch' | 'interactive-canvas' | 'interactive-oracle';
}

export interface Principle {
  n: string;
  t: string;
  d: string;
}

export interface Interest {
  t: string;
  n: string;
}

export interface HumanContext {
  t: string;
  d: string;
}

export interface OrbitNode {
  title: string;
  tag: string;
  radius: number;
  speed: number;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  availability: string;
  socials: Record<string, string>;
}

export interface AboutData {
  story: string[];
  interests: Interest[];
  human: HumanContext[];
  orbit: OrbitNode[];
}

export type ThemeMode = 'light' | 'dark' | 'paper' | 'clay';
