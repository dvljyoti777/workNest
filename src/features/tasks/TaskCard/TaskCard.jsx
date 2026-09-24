import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Avatar from '../../../components/ui/Avatar/Avatar'
import styles from './TaskCard.module.css'

const formatDate = (value) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'No due date' : new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(date)
}

const TaskCard = memo(function TaskCard({ task, taskIndex, columnIndex, columnCount, isSaving, isMoving, onEdit, onMove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task', status: task.status, index: taskIndex },
    disabled: isSaving,
  })
  const dueDate = new Date(task.dueDate)
  const isOverdue = task.status !== 'done' && !Number.isNaN(dueDate.getTime()) && dueDate < new Date()
  const sortableStyle = { transform: CSS.Transform.toString(transform), transition }

  return <article ref={setNodeRef} style={sortableStyle} className={`${styles.card} ${isDragging ? styles.dragging : ''}`} {...attributes} {...listeners}><div className={styles.cardTop}><span className={`${styles.priority} ${styles[task.priority]}`}>{task.priority}</span><span className={styles.dragHandle} aria-hidden="true"><span>&#8942;&#8942;</span></span></div><button className={styles.openButton} type="button" onClick={() => onEdit(task.id)} aria-label={`Open ${task.title}`}><h3>{task.title}</h3><p>{task.description || 'No description provided.'}</p></button><div className={styles.meta}><time className={isOverdue ? styles.overdue : ''} dateTime={task.dueDate}>{formatDate(task.dueDate)}</time><Avatar name={task.assignee || 'Unassigned'} size="small" /></div><footer><button type="button" disabled={columnIndex === 0 || isSaving} onClick={() => onMove(task.id, columnIndex - 1)} aria-label={`Move ${task.title} left`}>&larr;</button><span>{isMoving ? 'Saving...' : `${columnIndex + 1}/${columnCount}`}</span><button type="button" disabled={columnIndex === columnCount - 1 || isSaving} onClick={() => onMove(task.id, columnIndex + 1)} aria-label={`Move ${task.title} right`}>&rarr;</button></footer></article>
})

export default TaskCard
