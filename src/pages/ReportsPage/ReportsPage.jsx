import { useMemo, useState } from 'react'
import ResourceState from '../../components/ui/ResourceState/ResourceState'
import DonutChart from '../../features/reports/DonutChart/DonutChart'
import OverdueCard from '../../features/reports/OverdueCard/OverdueCard'
import ReportFilters from '../../features/reports/ReportFilters/ReportFilters'
import WorkloadBars from '../../features/reports/WorkloadBars/WorkloadBars'
import { useToast } from '../../hooks/useToast'
import { useProjectsQuery } from '../../queries/projectQueries'
import { useTasksQuery } from '../../queries/taskQueries'
import styles from './ReportsPage.module.css'

const emptyList = []
const statusColors = { backlog: '#98a2b3', todo: '#2e90fa', in_progress: '#fdb022', done: '#12b76a' }
const statusLabels = { backlog: 'To do', todo: 'In progress', in_progress: 'Review', done: 'Done' }

function ReportsPage() {
  const [filters, setFilters] = useState({ range: 'all', projectId: 'all', status: 'all' })
  const { showToast } = useToast()
  const projectsQuery = useProjectsQuery()
  const tasksQuery = useTasksQuery()
  const projects = projectsQuery.data ?? emptyList
  const tasks = tasksQuery.data ?? emptyList

  const report = useMemo(() => {
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    const rangeStart = filters.range === 'all' ? null : new Date(today.getTime() - Number(filters.range) * 86400000)
    const filteredTasks = tasks.filter((task) => {
      const dueDate = new Date(`${task.dueDate}T12:00:00`)
      return (filters.projectId === 'all' || task.projectId === filters.projectId) && (filters.status === 'all' || task.status === filters.status) && (!rangeStart || dueDate >= rangeStart)
    })
    const filteredProjects = filters.projectId === 'all' ? projects : projects.filter((project) => project.id === filters.projectId)
    const completed = filteredProjects.reduce((sum, project) => sum + project.tasks.completed, 0)
    const total = filteredProjects.reduce((sum, project) => sum + project.tasks.total, 0)
    const projectSegments = [
      { label: 'Active', value: filteredProjects.filter((project) => project.status === 'active').length, color: '#12b76a' },
      { label: 'Planning', value: filteredProjects.filter((project) => project.status === 'planning').length, color: '#fdb022' },
      { label: 'Completed', value: filteredProjects.filter((project) => project.status === 'completed').length, color: '#2e90fa' },
    ]
    const taskSegments = Object.keys(statusLabels).map((status) => ({ label: statusLabels[status], value: filteredTasks.filter((task) => task.status === status).length, color: statusColors[status] }))
    const workloadMap = filteredTasks.reduce((map, task) => map.set(task.assignee, (map.get(task.assignee) ?? 0) + 1), new Map())
    const workload = [...workloadMap].map(([name, assigned]) => ({ name, assigned, capacity: Math.max(5, Math.ceil(assigned * 1.25)) }))
    const overdue = filteredTasks.filter((task) => task.status !== 'done' && new Date(`${task.dueDate}T23:59:59`) < today)
    return { filteredTasks, projectSegments, taskSegments, workload, overdue, completion: total ? Math.round((completed / total) * 100) : 0 }
  }, [filters, projects, tasks])

  const exportReport = () => {
    const rows = ['Task,Status,Assignee,Due date', ...report.filteredTasks.map((task) => `"${task.title}",${statusLabels[task.status]},"${task.assignee}",${task.dueDate}`)]
    const url = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'worknest-report.csv'
    link.click()
    URL.revokeObjectURL(url)
    showToast('Report exported successfully')
  }

  const isPending = projectsQuery.isPending || tasksQuery.isPending
  const error = projectsQuery.error || tasksQuery.error
  const retry = () => { projectsQuery.refetch(); tasksQuery.refetch() }

  return <section><header className={styles.heading}><p>Analytics</p><h1>Reports</h1><span>Workspace delivery, task status and team workload summary.</span></header><ReportFilters filters={filters} projects={projects} onChange={setFilters} onExport={exportReport} />{isPending && <ResourceState type="loading" />}{error && <ResourceState type="error" title="Reports unavailable" message={error.message} onRetry={retry} />}{!isPending && !error && <div className={styles.dashboard}><div className={styles.topGrid}><DonutChart title="Project progress" segments={report.projectSegments} centerValue={`${report.completion}%`} centerLabel="Avg. progress" /><DonutChart title="Tasks by status" segments={report.taskSegments} centerValue={report.filteredTasks.length} centerLabel="Filtered tasks" /></div><div className={styles.bottomGrid}><WorkloadBars members={report.workload} /><OverdueCard tasks={report.overdue} /></div></div>}</section>
}

export default ReportsPage
