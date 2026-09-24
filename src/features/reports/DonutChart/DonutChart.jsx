import styles from './DonutChart.module.css'

function DonutChart({ title, segments, centerValue, centerLabel }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  let cursor = 0
  const gradient = segments.map((segment) => {
    const start = cursor
    cursor += total ? (segment.value / total) * 100 : 0
    return `${segment.color} ${start}% ${cursor}%`
  }).join(', ')

  return <article className={styles.card}><h2>{title}</h2><div className={styles.content}><div className={styles.donut} style={{ background: total ? `conic-gradient(${gradient})` : '#eef1f5' }} role="img" aria-label={`${title}: ${centerValue}`}><div><strong>{centerValue}</strong><span>{centerLabel}</span></div></div><ul>{segments.map((segment) => <li key={segment.label}><i style={{ background: segment.color }} /><span>{segment.label}</span><strong>{segment.value}</strong></li>)}</ul></div></article>
}

export default DonutChart
