import { useCallback, useMemo, useState } from 'react'
import ResourceState from '../../../components/ui/ResourceState/ResourceState'
import { useTaskMutations, useTasksQuery } from '../../../queries/taskQueries'
import { useToast } from '../../../hooks/useToast'
import KanbanColumn from '../KanbanColumn/KanbanColumn'
import TaskDrawer from '../TaskDrawer/TaskDrawer'
import styles from './TaskBoard.module.css'

const columns = [
  { id: 'backlog', title: 'To do', color: '#667085' },
  { id: 'todo', title: 'In progress', color: '#2e90fa' },
  { id: 'in_progress', title: 'Review', color: '#f79009' },
  { id: 'done', title: 'Done', color: '#12b76a' },
]
const emptyTasks = []

function TaskBoard() {
  const [drawer, setDrawer] = useState(null)
  const [search, setSearch] = useState('')
  const [requestMode, setRequestMode] = useState('populated')
  const { showToast } = useToast()
  const tasksQuery = useTasksQuery(requestMode)
  const mutations = useTaskMutations(requestMode)
  const tasks = tasksQuery.data ?? emptyTasks
  const selectedTask = drawer?.taskId ? tasks.find((task) => task.id === drawer.taskId) : null
  const mutationsList = Object.values(mutations)
  const isSaving = mutationsList.some((mutation) => mutation.isPending)
  const mutationError = mutationsList.find((mutation) => mutation.error)?.error
  const moveTaskMutate = mutations.moveTask.mutate

  const tasksByStatus = useMemo(() => {
    const grouped = Object.fromEntries(columns.map((column) => [column.id, []]))
    const normalizedSearch = search.trim().toLowerCase()
    tasks.filter((task) => !normalizedSearch || `${task.title} ${task.description} ${task.assignee}`.toLowerCase().includes(normalizedSearch)).forEach((task) => grouped[task.status]?.push(task))
    return grouped
  }, [search, tasks])

  const openAddDrawer = useCallback((status) => setDrawer({ status }), [])
  const openEditDrawer = useCallback((taskId) => setDrawer({ taskId }), [])
  const moveTask = useCallback((id, targetColumnIndex) => {
    moveTaskMutate({ id, status: columns[targetColumnIndex].id })
  }, [moveTaskMutate])

  const saveTask = async (form) => {
    try {
      if (selectedTask) {
        await mutations.updateTask.mutateAsync({ id: selectedTask.id, updates: form })
        showToast('Task updated successfully')
      } else {
        await mutations.addTask.mutateAsync({ ...form, id: crypto.randomUUID() })
        showToast('Task created successfully')
      }
      setDrawer(null)
    } catch {
      // Mutation state exposes the error and keeps the drawer open.
    }
  }

  const deleteTask = async (id) => {
    try {
      await mutations.deleteTask.mutateAsync(id)
      showToast('Task deleted successfully')
      setDrawer(null)
    } catch {
      // The shared mutation error UI handles the rejected request.
    }
  }

  const retryPopulated = () => setRequestMode('populated')

  return <><header className={styles.pageHeader}><div><p>Website Redesign</p><h1>Kanban board</h1><span>{tasks.length} tasks across four stages</span></div><div className={styles.headerActions}><button type="button" onClick={() => setRequestMode('empty')}>Empty</button><button type="button" onClick={() => setRequestMode('error')}>Error</button><button className={styles.primaryButton} type="button" onClick={() => openAddDrawer('backlog')}>+ Add task</button></div></header><div className={styles.toolbar}><label><span>Search tasks</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks…" /></label><button type="button" onClick={() => setSearch('')}>Clear filter</button></div>{mutationError && <div className={styles.actionError} role="alert">{mutationError.message}<button type="button" onClick={() => mutationsList.forEach((mutation) => mutation.reset())}>Dismiss</button></div>}{tasksQuery.isPending && <ResourceState type="loading" />}{tasksQuery.isError && <ResourceState type="error" title="Tasks unavailable" message={tasksQuery.error.message} onRetry={retryPopulated} />}{tasksQuery.isSuccess && tasks.length === 0 && <ResourceState type="empty" title="No tasks yet" message="Add your first task or reload the demo tasks." onRetry={retryPopulated} />}{tasksQuery.isSuccess && tasks.length > 0 && <div className={styles.board}>{columns.map((column, columnIndex) => <KanbanColumn key={column.id} column={column} columnIndex={columnIndex} tasks={tasksByStatus[column.id]} isSaving={isSaving} isMoving={mutations.moveTask.isPending} onAdd={openAddDrawer} onEdit={openEditDrawer} onMove={moveTask} />)}</div>}{drawer && <TaskDrawer key={selectedTask?.id ?? drawer.status} task={selectedTask} defaultStatus={drawer.status} onClose={() => setDrawer(null)} onSave={saveTask} onDelete={deleteTask} isSaving={isSaving} />}</>
}

export default TaskBoard
