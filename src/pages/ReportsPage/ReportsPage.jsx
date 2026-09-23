import styles from './ReportsPage.module.css'

const reports = [
  { label: 'Project completion', value: '68%', helper: 'Up 8% this month' },
  { label: 'Tasks delivered', value: '142', helper: 'Across 12 projects' },
  { label: 'On-time rate', value: '91%', helper: 'Last 30 days' },
]

function ReportsPage() {
  return <section><header className={styles.heading}><p>Analytics</p><h1>Reports</h1><span>Workspace delivery and performance summary.</span></header><div className={styles.grid}>{reports.map((report) => <article key={report.label}><p>{report.label}</p><strong>{report.value}</strong><span>{report.helper}</span></article>)}</div></section>
}

export default ReportsPage
