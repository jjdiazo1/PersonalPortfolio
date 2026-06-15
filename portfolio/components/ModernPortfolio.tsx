'use client';

import Header from './Header';
import Footer from './Footer';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './ProjectsSection';
import SideProjectsSection from './SideProjectsSection';
import AboutSection from './sections/AboutSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import type { SiteConfig, HeroData, AboutData, Education, Project, Job, Skill } from '@/lib/types'

interface PortfolioProps {
  siteConfig: SiteConfig
  heroData: HeroData
  aboutData: AboutData
  education: Education[]
  projects: Project[]
  jobs: Job[]
  skills: Skill[]
}

export default function Portfolio({ siteConfig, heroData, aboutData, education, projects, jobs }: PortfolioProps) {
  return (
    <div className="bg-paper text-charcoal min-h-screen">
      <Header siteConfig={siteConfig} />
      <div className="border-b border-charcoal min-h-screen flex flex-col">
        <main className="pt-12 md:pt-14 flex-1">
          <HeroSection heroData={heroData} projects={projects} />
          <ProjectsSection projects={projects} />
          <AboutSection aboutData={aboutData} />
          <EducationSection education={education} />
          <SideProjectsSection projects={projects} />
          <ExperienceSection jobs={jobs} />
        </main>
        <Footer siteConfig={siteConfig} />
      </div>
    </div>
  );
}
