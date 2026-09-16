import { useState } from 'react'
import ActivityList from '../../components/dashboard/ActivityList/ActivityList'
import ProjectProgress from '../../components/dashboard/ProjectProgress/ProjectProgress'
import StatCard from '../../components/dashboard/StatCard/StatCard'
import WorkloadSummary from '../../components/dashboard/WorkloadSummary/WorkloadSummary'
import { dashboardData } from '../../data/dashboardData'
import styles from './Dashboard.module.css'

const demoStates = ['populated', 'loading', 'empty']

function LoadingDashboard() {
  return <div className={styles.loading} role="status" aria-label="Loading dashboard">{Array.from({ length: 7 }, (_, index) => <div className={styles.skeleton} key={index} />)}<span className={styles.visuallyHidden}>Loading dashboard data...</span></div>
}

function Dashboard() {
  const [demoState, setDemoState] = useState('populated')
  const { projects, activities, workload } = dashboardData

  const totalTasks = projects.reduce((total, project) => total + project.tasks.total, 0)
  const completedTasks = projects.reduce((total, project) => total + project.tasks.completed, 0)
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)
  const overCapacityCount = workload.filter((member) => member.assigned > member.capacity).length

  return (
    <>
      <div className={styles.demoBar}>
        <div><strong>Demo state</strong><span>Switch dashboard data states</span></div>
        <div className={styles.switcher} aria-label="Choose dashboard demo state">
          {demoStates.map((state) => <button className={demoState === state ? styles.active : ''} type="button" key={state} onClick={() => setDemoState(state)} aria-pressed={demoState === state}>{state}</button>)}
        </div>
      </div>

      {demoState === 'loading' && <LoadingDashboard />}

      {demoState === 'empty' && (
        <section className={styles.empty}>
          <span aria-hidden="true">+</span><h2>No dashboard data yet</h2><p>Create your first project to start tracking progress, activity and workload.</p><button type="button">Create a project</button>
        </section>
      )}

      {demoState === 'populated' && (
        <div className={styles.dashboard}>
          <section className={styles.stats} aria-label="Workspace statistics">
            <StatCard label="Active projects" value={projects.length} helper="Across your workspace" icon="P" />
            <StatCard label="Total tasks" value={totalTasks} helper={`${completedTasks} completed`} icon="T" tone="blue" />
            <StatCard label="Completion rate" value={`${completionRate}%`} helper="Across active projects" icon="%" tone="green" />
            <StatCard label="Workload alerts" value={overCapacityCount} helper={overCapacityCount ? 'Needs attention' : 'Team is balanced'} icon="!" tone="orange" />
          </section>
          <div className={styles.primaryGrid}><ProjectProgress projects={projects} /><ActivityList activities={activities} /></div>
          <div className={styles.secondaryGrid}>
            <WorkloadSummary members={workload} />
            <aside className={styles.exercises} aria-labelledby="exercises-title"><p>Learning practice</p><h2 id="exercises-title">Try these next</h2><ol><li>Add a fifth <code>StatCard</code> using a new derived value.</li><li>Sort projects by progress without changing mock data.</li><li>Add an “under capacity” filter to the workload list.</li><li>Change empty-state copy based on the user role.</li></ol></aside>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
