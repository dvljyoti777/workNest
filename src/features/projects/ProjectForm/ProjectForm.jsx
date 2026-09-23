import { useState } from 'react'
import styles from './ProjectForm.module.css'

const initialValues = { name: '', description: '', dueDate: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Project name is required.'
  if (values.description.trim().length < 10) errors.description = 'Description must be at least 10 characters.'
  if (!values.dueDate) errors.dueDate = 'Due date is required.'
  return errors
}

function ProjectForm({ onSubmit, isSubmitting = false, project, submitLabel = 'Create project' }) {
  const [values, setValues] = useState(() => project ? { name: project.name, description: project.description ?? '', dueDate: project.dueDate } : initialValues)
  const [errors, setErrors] = useState({})
  const updateField = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) onSubmit(values)
  }

  return <form className={styles.form} onSubmit={handleSubmit} noValidate><label>Project name<input name="name" value={values.name} onChange={updateField} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'project-name-error' : undefined} />{errors.name && <span id="project-name-error" role="alert">{errors.name}</span>}</label><label>Description<textarea name="description" value={values.description} onChange={updateField} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'project-description-error' : undefined} />{errors.description && <span id="project-description-error" role="alert">{errors.description}</span>}</label><label>Due date<input name="dueDate" type="date" value={values.dueDate} onChange={updateField} aria-invalid={Boolean(errors.dueDate)} aria-describedby={errors.dueDate ? 'project-date-error' : undefined} />{errors.dueDate && <span id="project-date-error" role="alert">{errors.dueDate}</span>}</label><button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : submitLabel}</button></form>
}

export default ProjectForm
