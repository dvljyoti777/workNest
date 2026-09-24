import styles from './ReportFilters.module.css'

function ReportFilters({ filters, projects, onChange, onExport }) {
  const update = (event) => onChange({ ...filters, [event.target.name]: event.target.value })
  return <div className={styles.filters} aria-label="Report filters"><label><span>Time range</span><select name="range" value={filters.range} onChange={update}><option value="all">All time</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></label><label><span>Project</span><select name="projectId" value={filters.projectId} onChange={update}><option value="all">All projects</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label><label><span>Status</span><select name="status" value={filters.status} onChange={update}><option value="all">All statuses</option><option value="backlog">To do</option><option value="todo">In progress</option><option value="in_progress">Review</option><option value="done">Done</option></select></label><button type="button" onClick={onExport}>Export</button></div>
}

export default ReportFilters
