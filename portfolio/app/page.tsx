import Portfolio from '@/components/ModernPortfolio'
import {
  getSiteConfig,
  getHeroData,
  getAboutData,
  getEducation,
  getProjects,
  getJobs,
  getSkills,
} from '@/sanity/lib/fetch'

export default async function Home() {
  const [siteConfig, heroData, aboutData, education, projects, jobs, skills] = await Promise.all([
    getSiteConfig(),
    getHeroData(),
    getAboutData(),
    getEducation(),
    getProjects(),
    getJobs(),
    getSkills(),
  ])

  return (
    <Portfolio
      siteConfig={siteConfig}
      heroData={heroData}
      aboutData={aboutData}
      education={education}
      projects={projects}
      jobs={jobs}
      skills={skills}
    />
  )
}
