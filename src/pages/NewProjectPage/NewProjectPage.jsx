import { Link, useNavigate } from 'react-router-dom'
import ProjectForm from '../../features/projects/ProjectForm/ProjectForm'
import { useCreateProjectMutation } from '../../queries/projectQueries'
import { useToast } from '../../hooks/useToast'
import styles from './NewProjectPage.module.css'

function NewProjectPage() {
  const navigate = useNavigate()
  const createProject = useCreateProjectMutation()
  const { showToast } = useToast()

  const handleSubmit = async (values) => {
    try {
      await createProject.mutateAsync(values)
      showToast('Project created successfully')
      navigate('/projects', { replace: true })
    } catch {
      // Mutation error remains visible on the page so the form values are preserved.
    }
  }

  return (
    <section>
      <header className={styles.header}>
        <div>
          <p>Projects / New project</p>
          <h1>Create project</h1>
          <span>Add the basic project details. Tasks and members can be added afterwards.</span>
        </div>
        <Link to="/projects">Cancel</Link>
      </header>
      {createProject.isError && <div className={styles.error} role="alert">{createProject.error.message}</div>}
      <ProjectForm onSubmit={handleSubmit} isSubmitting={createProject.isPending} />
    </section>
  )
}

export default NewProjectPage
