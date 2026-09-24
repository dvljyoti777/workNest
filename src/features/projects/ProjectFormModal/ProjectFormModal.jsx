import { useEffect } from 'react'
import ProjectForm from '../ProjectForm/ProjectForm'
import styles from './ProjectFormModal.module.css'

function ProjectFormModal({ project, isSubmitting, error, onClose, onSubmit }) {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && !isSubmitting && onClose()
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isSubmitting, onClose])

  return <div className={styles.layer}><button className={styles.backdrop} type="button" onClick={onClose} aria-label="Close project form" /><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="project-form-title"><header><div><p>{project ? 'Update project details' : 'Start a new workspace'}</p><h2 id="project-form-title">{project ? 'Edit project' : 'Create project'}</h2></div><button type="button" onClick={onClose} disabled={isSubmitting} aria-label="Close project form">×</button></header>{error && <div className={styles.error} role="alert">{error.message}</div>}<ProjectForm project={project} onSubmit={onSubmit} isSubmitting={isSubmitting} submitLabel={project ? 'Save project' : 'Create project'} /></section></div>
}

export default ProjectFormModal
