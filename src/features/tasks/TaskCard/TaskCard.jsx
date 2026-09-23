import { memo } from 'react'
import Avatar from '../../../components/ui/Avatar/Avatar'
import styles from './TaskCard.module.css'

const formatDate = (value) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'No due date' : new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(date)
}

const TaskCard = memo(function TaskCard({ task, columnIndex, columnCount, isSaving, isMoving, onEdit, onMove }) {
  const dueDate = new Date(task.dueDate)
  const isOverdue = task.status !== 'done' && !Number.isNaN(dueDate.getTime()) && dueDate < new Date()
  return <article className={styles.card}><button className={styles.openButton} type="button" onClick={() => onEdit(task.id)} aria-label={`Open ${task.title}`}><span className={`${styles.priority} ${styles[task.priority]}`}>{task.priority}</span><h3>{task.title}</h3><p>{task.description || 'No description provided.'}</p></button><div className={styles.meta}><time className={isOverdue ? styles.overdue : ''} dateTime={task.dueDate}>{formatDate(task.dueDate)}</time><Avatar name={task.assignee || 'Unassigned'} size="small" /></div><footer><button type="button" disabled={columnIndex === 0 || isSaving} onClick={() => onMove(task.id, columnIndex - 1)} aria-label={`Move ${task.title} left`}>←</button><span>{isMoving ? 'Saving…' : `${columnIndex + 1}/${columnCount}`}</span><button type="button" disabled={columnIndex === columnCount - 1 || isSaving} onClick={() => onMove(task.id, columnIndex + 1)} aria-label={`Move ${task.title} right`}>→</button></footer></article>
})

export default TaskCard
