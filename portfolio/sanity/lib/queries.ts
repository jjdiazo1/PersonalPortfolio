import { groq } from 'next-sanity'

export const siteConfigQuery = groq`*[_type == "siteConfig"][0]{
  logo,
  statusLabel,
  navItems,
  footerLinks[]{ label, href }
}`

export const heroQuery = groq`*[_type == "hero"][0]{
  firstName,
  lastName,
  typewriterText,
  "profilePhotoUrl": profilePhoto.asset->url,
  "profilePhotoMobileUrl": profilePhotoMobile.asset->url,
  stats[]{ value, label },
  tickerItems
}`

export const aboutQuery = groq`*[_type == "about"][0]{
  statement,
  bio,
  links[]{ label, href }
}`

export const educationQuery = groq`*[_type == "education"] | order(order asc){
  name,
  short,
  degree,
  period,
  location,
  logo
}`

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id,
  "slug": slug.current,
  title,
  category,
  description,
  fullDescription,
  tags,
  "image": mainImage.asset->url,
  "heroImage": heroImage.asset->url,
  "additionalImages": additionalImages[].asset->url,
  client,
  year,
  timeline,
  role,
  liveUrl,
  featuredInHero
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  category,
  description,
  fullDescription,
  tags,
  "image": mainImage.asset->url,
  "heroImage": heroImage.asset->url,
  "additionalImages": additionalImages[].asset->url,
  client,
  year,
  timeline,
  role,
  liveUrl
}`

export const jobsQuery = groq`*[_type == "job"] | order(order asc){
  _id,
  title,
  company,
  "type": type,
  period,
  location,
  description,
  bullets,
  skills,
  logo
}`

export const skillsQuery = groq`*[_type == "skill"] | order(order asc){
  skill,
  logo
}`
