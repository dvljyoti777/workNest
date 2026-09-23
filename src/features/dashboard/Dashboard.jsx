import { useState } from 'react'
import ActivityList from '../../components/dashboard/ActivityList/ActivityList'
import ProjectProgress from '../../components/dashboard/ProjectProgress/ProjectProgress'
import StatCard from '../../components/dashboard/StatCard/StatCard'
import WorkloadSummary from '../../components/dashboard/WorkloadSummary/WorkloadSummary'
import ResourceState from '../../components/ui/ResourceState/ResourceState'
import { useDashboardQuery } from '../../queries/projectQueries'
import styles from './Dashboard.module.css'

const demoModes = ['populated', 'empty', 'error']

function Dashboard() {
  const [demoMode, setDemoMode] = useState('populated')
  const dashboardQuery = useDashboardQuery(demoMode)
  const data = dashboardQuery.data
  const projects = data?.projects ?? []
  const totalTasks = projects.reduce((total, project) => total + project.tasks.total, 0)
  const completedTasks = projects.reduce((total, project) => total + project.tasks.completed, 0)
  const inProgressTasks = totalTasks - completedTasks
  const atRiskProjects = projects.filter((project) => project.tasks.total === 0 || (project.tasks.completed / project.tasks.total) < 0.5).length

  return (
    <>
      <div className={styles.demoBar}>
        <span>Preview state</span>
        <div className={styles.switcher}>
          {demoModes.map((mode) => <button className={demoMode === mode ? styles.active : ''} type="button" key={mode} onClick={() => setDemoMode(mode)}>{mode}</button>)}
        </div>
      </div>

      {dashboardQuery.isPending && <ResourceState type="loading" />}
      {dashboardQuery.isError && <ResourceState type="error" title="Dashboard unavailable" message={dashboardQuery.error.message} onRetry={() => setDemoMode('populated')} />}
      {dashboardQuery.isSuccess && projects.length === 0 && <ResourceState type="empty" title="No dashboard data yet" message="Create your first project to start tracking progress and workload." onRetry={() => setDemoMode('populated')} />}

      {dashboardQuery.isSuccess && projects.length > 0 && (
        <div className={styles.dashboard}>
          <section className={styles.stats} aria-label="Workspace statistics">
            <StatCard label="Active projects" value={projects.length} trend="Current portfolio" tone="blue" />
            <StatCard label="Total tasks" value={totalTasks} trend={`${completedTasks} completed`} tone="green" />
            <StatCard label="In progress" value={inProgressTasks} trend="Open work items" tone="orange" />
            <StatCard label="At risk" value={atRiskProjects} trend={atRiskProjects ? 'Needs attention' : 'All on track'} trendDirection={atRiskProjects ? 'down' : 'up'} tone="red" />
          </section>
          <div className={styles.primaryGrid}>
            <ProjectProgress projects={projects} />
            <ActivityList activities={data.activities} />
          </div>
          <WorkloadSummary members={data.workload} />
        </div>
      )}
    </>
  )
}

export default Dashboard
