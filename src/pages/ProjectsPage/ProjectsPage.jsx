import { useState } from 'react'
import ProjectCard from '../../features/projects/ProjectCard/ProjectCard'
import ProjectFormModal from '../../features/projects/ProjectFormModal/ProjectFormModal'
import ResourceState from '../../components/ui/ResourceState/ResourceState'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { useCreateProjectMutation, useDeleteProjectMutation, useProjectsQuery, useUpdateProjectMutation } from '../../queries/projectQueries'
import styles from './ProjectsPage.module.css'

function ProjectsPage() {
  const [requestMode, setRequestMode] = useState('populated')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [view, setView] = useState('grid')
  const [modalProject, setModalProject] = useState(undefined)
  const { can } = useAuth()
  const { showToast } = useToast()
  const projectsQuery = useProjectsQuery(requestMode)
  const createProject = useCreateProjectMutation()
  const updateProject = useUpdateProjectMutation()
  const deleteProject = useDeleteProjectMutation()
  const projects = projectsQuery.data ?? []
  const normalizedSearch = search.trim().toLowerCase()
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(normalizedSearch)
    const matchesStatus = status === 'all' || project.status === status
    return matchesSearch && matchesStatus
  })
  const isModalOpen = modalProject !== undefined
  const activeMutation = modalProject ? updateProject : createProject

  const openCreate = () => {
    createProject.reset()
    setModalProject(null)
  }
  const openEdit = (project) => {
    updateProject.reset()
    setModalProject(project)
  }
  const saveProject = async (values) => {
    try {
      if (modalProject) {
        await updateProject.mutateAsync({ id: modalProject.id, updates: values })
        showToast('Project updated successfully')
      } else {
        await createProject.mutateAsync(values)
        showToast('Project created successfully')
      }
      setModalProject(undefined)
    } catch {
      // The modal keeps form values and displays the mutation error.
    }
  }
  const removeProject = async (project) => {
    if (!window.confirm(`Delete ${project.name}? This action cannot be undone.`)) return
    try {
      await deleteProject.mutateAsync(project.id)
      showToast('Project deleted successfully')
    } catch {
      showToast('Project could not be deleted', 'error')
    }
  }

  return (
    <section>
      <header className={styles.heading}>
        <div><p>Workspace</p><h1>Projects</h1><span>Plan, track and deliver work across your teams.</span></div>
        {can('projects:create') && <button className={styles.newButton} type="button" onClick={openCreate}>+ New project</button>}
      </header>

      <div className={styles.toolbar}>
        <label className={styles.search}><span aria-hidden="true">⌕</span><span className={styles.visuallyHidden}>Search projects</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects..." /></label>
        <label className={styles.filter}><span>Filter</span><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter projects by status"><option value="all">All statuses</option><option value="planning">Planning</option><option value="active">Active</option><option value="completed">Completed</option></select></label>
        <div className={styles.views} aria-label="Project view"><button className={view === 'grid' ? styles.selected : ''} type="button" onClick={() => setView('grid')} aria-pressed={view === 'grid'}>Grid</button><button className={view === 'list' ? styles.selected : ''} type="button" onClick={() => setView('list')} aria-pressed={view === 'list'}>List</button></div>
      </div>

      <div className={styles.demo}><span>Preview:</span><button type="button" onClick={() => setRequestMode('populated')}>Data</button><button type="button" onClick={() => setRequestMode('empty')}>Empty</button><button type="button" onClick={() => setRequestMode('error')}>Error</button></div>

      {deleteProject.isError && <div className={styles.error} role="alert">{deleteProject.error.message}</div>}
      {projectsQuery.isPending && <ResourceState type="loading" />}
      {projectsQuery.isError && <ResourceState type="error" title="Projects unavailable" message={projectsQuery.error.message} onRetry={() => setRequestMode('populated')} />}
      {projectsQuery.isSuccess && projects.length === 0 && <ResourceState type="empty" title="No projects yet" message="Create your first project to start planning work." onRetry={() => setRequestMode('populated')} />}
      {projectsQuery.isSuccess && projects.length > 0 && filteredProjects.length === 0 && <p className={styles.noMatches}>No projects match the current search and filter.</p>}
      {projectsQuery.isSuccess && filteredProjects.length > 0 && <div className={`${styles.projects} ${styles[view]}`}>{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} view={view} canManage={can('projects:create')} onEdit={openEdit} onDelete={removeProject} />)}</div>}

      {isModalOpen && <ProjectFormModal project={modalProject} isSubmitting={activeMutation.isPending} error={activeMutation.error} onClose={() => setModalProject(undefined)} onSubmit={saveProject} />}
    </section>
  )
}

export default ProjectsPage
