import { Suspense } from 'react'
import { getProjectBySlug, getProjects } from '@/sanity/lib/fetch'
import ProjectDetail from '@/components/ProjectDetail'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(id),
    getProjects(),
  ])

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <span className="font-mono text-[11px] text-graphite">Loading…</span>
      </div>
    }>
      <ProjectDetail project={project} allProjects={allProjects} />
    </Suspense>
  )
}
