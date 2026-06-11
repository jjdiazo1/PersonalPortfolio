export interface SiteConfig {
  logo: string
  statusLabel: string
  navItems: string[]
  footerLinks: { label: string; href: string }[]
}

export interface HeroData {
  firstName: string
  lastName: string
  typewriterText: string
  profilePhotoUrl: string
  profilePhotoMobileUrl?: string
  stats: { value: string; label: string }[]
  tickerItems: string[]
}

export interface AboutData {
  statement: string
  bio: string[]
  links: { label: string; href: string }[]
}

export interface Education {
  name: string
  short: string
  degree: string
  period: string
  location: string
  logo: string
}

export interface Project {
  _id: string
  slug: string
  title: string
  category: string
  description: string
  fullDescription: string
  tags: string[]
  image: string
  heroImage: string
  additionalImages: string[]
  client?: string
  year?: string
  timeline?: string
  role?: string
  liveUrl?: string
  featuredInHero?: boolean
}

export interface Job {
  _id: string
  title: string
  company: string
  type: string
  period: string
  location: string
  description: string
  bullets: string[]
  skills: string[]
  logo: string
}

export interface Skill {
  skill: string
  logo: string
}
