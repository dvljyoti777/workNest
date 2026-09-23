import { useState } from 'react'
import StatusBadge from '../StatusBadge/StatusBadge'
import styles from './TaskDrawer.module.css'

const emptyTask = { title: '', description: '', priority: 'medium', assignee: '', dueDate: '', status: 'backlog' }

function TaskDrawer({ task, defaultStatus, onClose, onSave, onDelete, isSaving }) {
  const [form, setForm] = useState(() => task ?? { ...emptyTask, status: defaultStatus })
  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    onSave(form)
  }

  return <><button className={styles.backdrop} type="button" onClick={onClose} aria-label="Close task drawer" /><aside className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="task-drawer-title"><header><div><p>{task ? 'Task details' : 'New task'}</p><h2 id="task-drawer-title">{task?.title ?? 'Create a task'}</h2>{task && <StatusBadge status={form.status} />}</div><button type="button" onClick={onClose} aria-label="Close drawer">×</button></header><form onSubmit={submit}><label>Title<input name="title" value={form.title} onChange={updateField} required autoFocus /></label><label>Description<textarea name="description" value={form.description} onChange={updateField} rows="4" /></label><div className={styles.row}><label>Priority<select name="priority" value={form.priority} onChange={updateField}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label><label>Status<select name="status" value={form.status} onChange={updateField}><option value="backlog">To do</option><option value="todo">In progress</option><option value="in_progress">Review</option><option value="done">Done</option></select></label></div><label>Assignee<input name="assignee" value={form.assignee} onChange={updateField} placeholder="Team member name" required /></label><label>Due date<input name="dueDate" type="date" value={form.dueDate} onChange={updateField} required /></label><footer>{task && <button className={styles.deleteButton} type="button" disabled={isSaving} onClick={() => onDelete(task.id)}>Delete task</button>}<button className={styles.cancelButton} type="button" disabled={isSaving} onClick={onClose}>Cancel</button><button className={styles.saveButton} type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : task ? 'Save changes' : 'Add task'}</button></footer></form></aside></>
}

export default TaskDrawer
