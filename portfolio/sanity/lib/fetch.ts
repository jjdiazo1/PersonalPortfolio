import { client, isSanityConfigured } from './client'
import {
  siteConfigQuery,
  heroQuery,
  aboutQuery,
  educationQuery,
  projectsQuery,
  projectBySlugQuery,
  jobsQuery,
  skillsQuery,
} from './queries'
import type { SiteConfig, HeroData, AboutData, Education, Project, Job, Skill } from '@/lib/types'

// Static fallbacks — used when Sanity is not yet configured
import headerFallback from '@/lib/header-data.json'
import footerFallback from '@/lib/footer-data.json'
import heroFallback from '@/lib/hero-data.json'
import aboutFallback from '@/lib/about-data.json'
import profileFallback from '@/lib/profile-data.json'
import skillsFallback from '@/lib/skills-data.json'
import projectsFallback from '@/lib/projects.json'

const opts = { next: { revalidate: 60, tags: ['sanity'] } }

async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured || !client) return null
  try {
    return await client.fetch<T>(query, params, opts)
  } catch {
    return null
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const data = await sanityFetch<SiteConfig>(siteConfigQuery)
  return data ?? {
    logo: headerFallback.logo,
    statusLabel: headerFallback.statusLabel,
    navItems: headerFallback.navItems,
    footerLinks: footerFallback.links,
  }
}

export async function getHeroData(): Promise<HeroData> {
  const data = await sanityFetch<HeroData>(heroQuery)
  return data ?? {
    firstName: 'Juan Jose',
    lastName: 'Díaz',
    typewriterText: 'Systems Engineer · Founder · Making cool stuff',
    profilePhotoUrl: '/Profile.png',
    stats: heroFallback.stats,
    tickerItems: heroFallback.tickerItems,
  }
}

export async function getAboutData(): Promise<AboutData> {
  const data = await sanityFetch<AboutData>(aboutQuery)
  return data ?? {
    statement: aboutFallback.statement,
    bio: aboutFallback.bio,
    links: aboutFallback.links,
  }
}

export async function getEducation(): Promise<Education[]> {
  const data = await sanityFetch<Education[]>(educationQuery)
  return data ?? [
    { name: 'National Institute of Applied Sciences Lyon', short: 'INSA Lyon', degree: 'Master in Computer Science', period: '2025 – 2027', location: 'Lyon, France', logo: '/Logos/insa.png' },
    { name: 'Universidad de Los Andes', short: 'Uniandes', degree: 'Systems and Computer Science Engineering', period: '2022 – 2026', location: 'Bogotá, Colombia', logo: '/Logos/uniandes.png' },
    { name: 'National Service of Apprenticeship', short: 'SENA', degree: 'Computer and Systems Technician', period: '2019 – 2021', location: 'Colombia', logo: '/Logos/sena.png' },
  ]
}

export async function getProjects(): Promise<Project[]> {
  const data = await sanityFetch<Project[]>(projectsQuery)
  if (data) return data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (projectsFallback.projects as any[]).map((p): Project => ({
    _id: String(p.id),
    slug: p.slug ?? String(p.id),
    title: p.title,
    category: p.category,
    description: p.description,
    fullDescription: p.fullDescription ?? p.description,
    tags: p.tags ?? [],
    image: p.image ?? '',
    heroImage: p.heroImage ?? p.image ?? '',
    additionalImages: p.additionalImages ?? [],
    client: p.client,
    year: p.year,
    timeline: p.timeline,
    role: p.role,
    liveUrl: p.liveUrl,
  }))
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await sanityFetch<Project>(projectBySlugQuery, { slug })
  if (data) return data
  const projects = await getProjects()
  return projects.find((p) => p.slug === slug) ?? null
}

export async function getJobs(): Promise<Job[]> {
  const data = await sanityFetch<Job[]>(jobsQuery)
  return data ?? []
}

export async function getSkills(): Promise<Skill[]> {
  const data = await sanityFetch<Skill[]>(skillsQuery)
  return data ?? skillsFallback
}
