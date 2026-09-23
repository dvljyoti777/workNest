import { memo } from 'react'
import TaskCard from '../TaskCard/TaskCard'
import styles from '../TaskBoard/TaskBoard.module.css'

const KanbanColumn = memo(function KanbanColumn({ column, columnIndex, tasks, isSaving, isMoving, onAdd, onEdit, onMove }) {
  return <section className={styles.column} aria-labelledby={`column-${column.id}`}><header><div><span style={{ backgroundColor: column.color }} /><h2 id={`column-${column.id}`}>{column.title}</h2><strong>{tasks.length}</strong></div><button type="button" onClick={() => onAdd(column.id)} aria-label={`Add task to ${column.title}`}>+</button></header><div className={styles.taskList}>{tasks.length === 0 && <p className={styles.empty}>No tasks in this stage.</p>}{tasks.map((task) => <TaskCard key={task.id} task={task} columnIndex={columnIndex} columnCount={4} isSaving={isSaving} isMoving={isMoving} onEdit={onEdit} onMove={onMove} />)}</div></section>
})

export default KanbanColumn
