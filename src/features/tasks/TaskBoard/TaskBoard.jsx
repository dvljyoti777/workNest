import { useReducer, useState } from 'react'
import TaskDrawer from '../TaskDrawer/TaskDrawer'
import { initialTaskState, taskActionTypes, taskReducer } from '../taskReducer'
import styles from './TaskBoard.module.css'

const columns = [
  { id: 'backlog', title: 'Backlog', color: '#667085' },
  { id: 'todo', title: 'To do', color: '#2e90fa' },
  { id: 'in_progress', title: 'In progress', color: '#f79009' },
  { id: 'done', title: 'Done', color: '#12b76a' },
]

function TaskBoard() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)
  const [drawer, setDrawer] = useState(null)
  const selectedTask = drawer?.taskId ? state.tasks.find((task) => task.id === drawer.taskId) : null

  const saveTask = (form) => {
    if (selectedTask) {
      dispatch({ type: taskActionTypes.UPDATE_TASK, payload: { id: selectedTask.id, updates: form } })
    } else {
      dispatch({ type: taskActionTypes.ADD_TASK, payload: { ...form, id: crypto.randomUUID() } })
    }
    setDrawer(null)
  }

  const deleteTask = (id) => {
    dispatch({ type: taskActionTypes.DELETE_TASK, payload: { id } })
    setDrawer(null)
  }

  const moveTask = (id, status) => dispatch({ type: taskActionTypes.MOVE_TASK, payload: { id, status } })

  return (
    <>
      <header className={styles.pageHeader}><div><p>Workspace tasks</p><h1>Kanban board</h1><span>{state.tasks.length} tasks across four stages</span></div><button type="button" onClick={() => setDrawer({ status: 'backlog' })}>+ Add task</button></header>
      <div className={styles.board}>
        {columns.map((column, columnIndex) => {
          const columnTasks = state.tasks.filter((task) => task.status === column.id)
          return (
            <section className={styles.column} key={column.id} aria-labelledby={`column-${column.id}`}>
              <header><div><span style={{ backgroundColor: column.color }} /><h2 id={`column-${column.id}`}>{column.title}</h2><strong>{columnTasks.length}</strong></div><button type="button" onClick={() => setDrawer({ status: column.id })} aria-label={`Add task to ${column.title}`}>+</button></header>
              <div className={styles.taskList}>
                {columnTasks.length === 0 && <p className={styles.empty}>No tasks in this stage.</p>}
                {columnTasks.map((task) => (
                  <article className={styles.task} key={task.id}>
                    <div className={styles.taskTop}><span className={`${styles.priority} ${styles[task.priority]}`}>{task.priority}</span><button type="button" onClick={() => setDrawer({ taskId: task.id })} aria-label={`Edit ${task.title}`}>Edit</button></div>
                    <h3>{task.title}</h3><p>{task.description}</p>
                    <div className={styles.details}><span>{task.assignee}</span><time dateTime={task.dueDate}>{task.dueDate}</time></div>
                    <footer><button type="button" disabled={columnIndex === 0} onClick={() => moveTask(task.id, columns[columnIndex - 1]?.id)} aria-label={`Move ${task.title} left`}>←</button><span>Move</span><button type="button" disabled={columnIndex === columns.length - 1} onClick={() => moveTask(task.id, columns[columnIndex + 1]?.id)} aria-label={`Move ${task.title} right`}>→</button></footer>
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>
      {drawer && <TaskDrawer key={selectedTask?.id ?? drawer.status} task={selectedTask} defaultStatus={drawer.status} onClose={() => setDrawer(null)} onSave={saveTask} onDelete={deleteTask} />}
    </>
  )
}

export default TaskBoard
