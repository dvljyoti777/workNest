import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from '../TaskCard/TaskCard'
import styles from '../TaskBoard/TaskBoard.module.css'

const KanbanColumn = memo(function KanbanColumn({ column, columnIndex, tasks, isSaving, isMoving, onAdd, onEdit, onMove }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `column:${column.id}`,
    data: { type: 'column', status: column.id, index: columnIndex },
  })

  return <section ref={setNodeRef} className={`${styles.column} ${isOver ? styles.dropTarget : ''}`} aria-labelledby={`column-${column.id}`}><header><div><span style={{ backgroundColor: column.color }} /><h2 id={`column-${column.id}`}>{column.title}</h2><strong>{tasks.length}</strong></div><button type="button" onClick={() => onAdd(column.id)} aria-label={`Add task to ${column.title}`}>+</button></header><SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}><div className={styles.taskList}>{tasks.length === 0 && <p className={styles.empty}>Drop a task here.</p>}{tasks.map((task, taskIndex) => <TaskCard key={task.id} task={task} taskIndex={taskIndex} columnIndex={columnIndex} columnCount={4} isSaving={isSaving} isMoving={isMoving} onEdit={onEdit} onMove={onMove} />)}</div></SortableContext></section>
})

export default KanbanColumn
