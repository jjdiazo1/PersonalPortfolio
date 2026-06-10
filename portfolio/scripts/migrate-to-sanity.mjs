/**
 * Migrates all local JSON data + public images into Sanity.
 * Run once: node scripts/migrate-to-sanity.mjs
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local (or env).
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createReadStream } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// ── Load env ────────────────────────────────────────────────────────────────
const envPath = path.join(ROOT, '.env.local')
const env = fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [k, ...v] = line.split('=')
    if (k?.trim()) acc[k.trim()] = v.join('=').trim()
    return acc
  }, {})

const PROJECT_ID    = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET       = env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const SANITY_TOKEN  = env.SANITY_TOKEN

if (!PROJECT_ID || PROJECT_ID === 'your_project_id_here') {
  console.error('❌  Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local first')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_TOKEN,
})

// ── Helper: upload a local public image ─────────────────────────────────────
const assetCache = {}

async function uploadImage(publicPath) {
  if (!publicPath) return null
  if (assetCache[publicPath]) return assetCache[publicPath]

  const filePath = path.join(ROOT, 'public', publicPath)
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠  Image not found, skipping: ${filePath}`)
    return null
  }

  const ext      = path.extname(publicPath).slice(1).toLowerCase()
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
                 : ext === 'png'  ? 'image/png'
                 : ext === 'webp' ? 'image/webp'
                 : ext === 'gif'  ? 'image/gif'
                 : 'image/jpeg'

  process.stdout.write(`  ↑ Uploading ${publicPath} ... `)
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: path.basename(publicPath),
    contentType: mimeType,
  })
  console.log(`✓  (${asset._id})`)
  assetCache[publicPath] = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  return assetCache[publicPath]
}

// ── Create or replace a singleton document ──────────────────────────────────
async function upsert(doc) {
  return client.createOrReplace(doc)
}

// ── 1. Site Config ───────────────────────────────────────────────────────────
async function migrateSiteConfig() {
  console.log('\n📄 Site Config')
  await upsert({
    _id:         'siteConfig',
    _type:       'siteConfig',
    logo:        'JJD',
    statusLabel: 'available for projects',
    navItems:    ['work', 'about', 'education'],
    footerLinks: [
      { _key: 'email',    label: 'Email',    href: 'mailto:jj.diazoo@gmail.com' },
      { _key: 'github',   label: 'GitHub',   href: 'https://github.com/jjdiazo1' },
      { _key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/jjdiazo' },
    ],
  })
  console.log('  ✓ siteConfig')
}

// ── 2. Hero ──────────────────────────────────────────────────────────────────
async function migrateHero() {
  console.log('\n🦸 Hero')
  const photo = await uploadImage('/Profile.png')
  await upsert({
    _id:            'hero',
    _type:          'hero',
    firstName:      'Juan Jose',
    lastName:       'Díaz',
    typewriterText: 'Systems Engineer · Founder · Making cool stuff',
    profilePhoto:   photo,
    stats: [
      { _key: 's1', value: '6+',   label: 'Years of CS study' },
      { _key: 's2', value: '2',    label: 'Startups' },
      { _key: 's3', value: 'Open', label: 'For Work' },
      { _key: 's4', value: '3+',   label: 'Past jobs in the field' },
      { _key: 's5', value: 'LYN',  label: 'Lyon, FR' },
    ],
    tickerItems: [
      'Lyon, France',
      'Working on 2 startups',
      'Systems Engineer',
      'Computer Science',
      'Founder',
    ],
  })
  console.log('  ✓ hero')
}

// ── 3. About ─────────────────────────────────────────────────────────────────
async function migrateAbout() {
  console.log('\n📝 About')
  await upsert({
    _id:       'about',
    _type:     'about',
    statement: 'I build digital products from the foundations — code, architecture, and the moment when the idea becomes real.',
    bio: [
      "Systems and Computer Engineering student at Universidad de Los Andes, Bogotá. I build products end-to-end — from architecture decisions to the last pixel — with a founder's sense of urgency and an engineer's rigor.",
      "I care about systems that scale and interfaces that feel inevitable. When I'm not shipping, I'm exploring the intersection of product design and distributed systems.",
    ],
    links: [
      { _key: 'github',   label: '→ GitHub',   href: 'https://github.com/jjdiazo1' },
      { _key: 'linkedin', label: '→ LinkedIn', href: 'https://linkedin.com/in/jjdiazo' },
      { _key: 'email',    label: '→ Email',    href: 'mailto:jj.diazoo@gmail.com' },
    ],
  })
  console.log('  ✓ about')
}

// ── 4. Education ─────────────────────────────────────────────────────────────
async function migrateEducation() {
  console.log('\n🎓 Education')
  const schools = [
    { name: 'National Institute of Applied Sciences Lyon', short: 'INSA Lyon', degree: 'Master in Computer Science', period: '2025 – 2027', location: 'Lyon, France', logo: '/Logos/insa.png', order: 1 },
    { name: 'Universidad de Los Andes', short: 'Uniandes', degree: 'Systems and Computer Science Engineering', period: '2022 – 2026', location: 'Bogotá, Colombia', logo: '/Logos/uniandes.png', order: 2 },
    { name: 'National Service of Apprenticeship', short: 'SENA', degree: 'Computer and Systems Technician', period: '2019 – 2021', location: 'Colombia', logo: '/Logos/sena.png', order: 3 },
  ]
  for (const s of schools) {
    const id = `education-${s.short.toLowerCase().replace(/\s+/g, '-')}`
    await upsert({ _id: id, _type: 'education', ...s })
    console.log(`  ✓ ${s.short}`)
  }
}

// ── 5. Skills ────────────────────────────────────────────────────────────────
async function migrateSkills() {
  console.log('\n⚡ Skills')
  const skills = [
    { skill: 'JavaScript', logo: '/Logos/js.png' },
    { skill: 'Flutter',    logo: '/Logos/flutter.png' },
    { skill: 'Java',       logo: '/Logos/java.png' },
    { skill: 'Python',     logo: '/Logos/python.png' },
    { skill: 'React',      logo: '/Logos/react.png' },
    { skill: 'C',          logo: '/Logos/c.png' },
    { skill: 'Swift',      logo: '/Logos/swift.png' },
    { skill: 'XCode',      logo: '/Logos/xcode.png' },
    { skill: 'PostgreSQL', logo: '/Logos/postgre.png' },
    { skill: 'MongoDB',    logo: '/Logos/mongo.png' },
    { skill: 'Premiere Pro', logo: '/Logos/premiere.png' },
    { skill: 'Git',        logo: '/Logos/git.png' },
    { skill: 'Matplotlib', logo: '/Logos/matplotlib.png' },
    { skill: 'Excel',      logo: '/Logos/excel.png' },
    { skill: 'Illustrator', logo: '/Logos/illustrator.png' },
  ]
  for (const [i, s] of skills.entries()) {
    const id = `skill-${s.skill.toLowerCase().replace(/[\s.]+/g, '-')}`
    await upsert({ _id: id, _type: 'skill', ...s, order: i + 1 })
    console.log(`  ✓ ${s.skill}`)
  }
}

// ── 6. Jobs / Experience ─────────────────────────────────────────────────────
async function migrateJobs() {
  console.log('\n💼 Experience')
  const jobs = [
    {
      title: 'AI Engineering Intern',
      company: 'Conformitee',
      type: 'Internship',
      period: 'May 2026 – Present',
      location: 'Lyon, France · On-site',
      description: 'Developing full-stack AI features and agentic workflows for a RegTech platform focused on regulatory compliance (KYC, document verification) using Angular and Python.',
      bullets: [
        'Enhance system security through testing, validation, and hardening practices to improve platform robustness and compliance.',
        'Work on an AI module for document intelligence, including automatic data extraction and form pre-filling for compliance workflows.',
      ],
      skills: ['LangGraph', 'Agentic AI', 'Angular', 'Python'],
      logo: '/Logos/conformitee.png',
      order: 1,
    },
    {
      title: 'AI Engineering Consultant',
      company: 'Intersektion',
      type: 'Contract · Part-time · START-IF Program',
      period: 'Feb 2026 – Apr 2026',
      location: 'Lyon, France · Hybrid',
      description: 'Built an AI orchestration backend integrating APIs, Tavily and AWS Bedrock. Designed a first data pipeline for FEC Carbon analysis (S3, Lambda, AI processing). Contributed to ESG-focused data solutions for real-world use cases.',
      bullets: [
        'Delivered a final pitch to stakeholders with strong positive feedback.',
        'Collaborated in a team of 7 engineers in an industry-driven project.',
      ],
      skills: ['AWS', 'Amazon Bedrock', 'Tavily'],
      logo: '/Logos/intersektion.png',
      order: 2,
    },
    {
      title: 'Mobile Application Development TA — iOS & Flutter',
      company: 'Universidad de Los Andes',
      type: 'Contract · Part-time',
      period: 'Aug 2025 – Dec 2025',
      location: 'Remote',
      description: 'Architected and developed a cross-platform mobile marketplace for university materials, making 80+ contributions to the core codebase.',
      bullets: [
        'Mentored students in software architecture, debugging, and UI/UX best practices for mobile environments.',
        'Integrated advanced features including Augmented Reality (AR) for product visualization and AI-driven search indexing.',
        'Designed and implemented a data pipeline (PostgreSQL → BigQuery → Looker Studio) to track user behavior and business metrics.',
      ],
      skills: ['iOS Development', 'Flutter', 'Firebase', 'BigQuery'],
      logo: '/Logos/uniandes.png',
      order: 3,
    },
    {
      title: 'Founder & Developer',
      company: 'Early To Wear',
      type: 'Self-employed',
      period: 'Mar 2024 – Dec 2025',
      location: 'Lyon, France · Hybrid',
      description: 'Founded and developed an AI-powered fashion recommendation platform utilizing CLIP (Contrastive Language-Image Pre-training) and vector databases for visual search.',
      bullets: [
        'Scaled the project internationally, securing a spot in the entrepreneurship center of the Rhône-Alpes region (France) for further incubation.',
        'Successfully piloted the MVP during Innovation Week at Universidad de los Andes, onboarding 6 fashion brands as initial partners.',
        'Built the full-stack infrastructure using Next.js, Node.js, and Medusa.js, focusing on scalable architecture and user-centric design.',
        'Iterated product features based on rapid user testing and hypothesis validation in both the Colombian and French markets.',
      ],
      skills: ['Next.js', 'Python', 'CLIP', 'Vector Databases', 'Lean Startup'],
      logo: '/Logos/etw.png',
      order: 4,
    },
    {
      title: 'Full Stack Developer',
      company: 'Hotel Juan María',
      type: 'Contract',
      period: 'Dec 2024 – Nov 2025',
      location: 'Remote',
      description: 'Led the digital transformation of a hospitality business by replacing a 15-year-old legacy system with a modern Next.js and Payload CMS platform.',
      bullets: [
        'Increased direct digital revenue by over 20% by building a custom internal booking engine that eliminated third-party intermediary fees.',
        'Optimized SEO and Core Web Vitals, significantly improving organic search rankings and page load speeds.',
        'Developed custom internal tools for inventory and reservation management.',
      ],
      skills: ['Next.js', 'Payload CMS', 'TypeScript', 'SEO'],
      logo: '/Logos/hotel.png',
      order: 5,
    },
  ]

  for (const j of jobs) {
    const id = `job-${j.company.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
    await upsert({ _id: id, _type: 'job', ...j })
    console.log(`  ✓ ${j.company}`)
  }
}

// ── 7. Projects (with image uploads) ────────────────────────────────────────
async function migrateProjects() {
  console.log('\n🗂  Projects')

  const projectsRaw = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib/projects.json'), 'utf8')).projects

  for (const [i, p] of projectsRaw.entries()) {
    const slug = p.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

    console.log(`\n  📦 ${p.title}`)

    const [mainImage, heroImage, ...extraImages] = await Promise.all([
      uploadImage(p.image),
      uploadImage(p.heroImage),
      ...( p.additionalImages ?? []).map(uploadImage),
    ])

    const doc = {
      _id:               `project-${slug}`,
      _type:             'project',
      title:             p.title,
      slug:              { _type: 'slug', current: slug },
      category:          p.category,
      description:       p.description,
      fullDescription:   p.fullDescription ?? p.description,
      tags:              p.tags ?? [],
      mainImage:         mainImage ?? undefined,
      heroImage:         heroImage ?? undefined,
      additionalImages:  extraImages.filter(Boolean).map((img, k) => ({ ...img, _key: `img-${k}` })),
      client:            p.client,
      year:              p.year,
      timeline:          p.timeline,
      role:              p.role,
      liveUrl:           p.liveUrl,
      order:             i + 1,
    }

    await upsert(doc)
    console.log(`  ✓ saved`)
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀 Migrating to Sanity project: ${PROJECT_ID} / ${DATASET}\n`)

  try {
    await migrateSiteConfig()
    await migrateHero()
    await migrateAbout()
    await migrateEducation()
    await migrateSkills()
    await migrateJobs()
    await migrateProjects()

    console.log('\n✅  Migration complete! Open /studio to review the content.\n')
  } catch (err) {
    console.error('\n❌  Migration failed:', err.message)
    if (err.statusCode === 401) {
      console.error('    → Run "npx sanity@3 login" first, or set SANITY_TOKEN env var.')
    }
    process.exit(1)
  }
}

main()
