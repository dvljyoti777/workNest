import { Link } from 'react-router-dom'
import styles from './WorkloadSummary.module.css'

function WorkloadSummary({ members }) {
  const highestCapacity = Math.max(...members.map((member) => member.capacity), 1)

  return (
    <section className={styles.card} aria-labelledby="workload-title">
      <header><div><h2 id="workload-title">Team workload</h2><p>Assigned tasks compared with capacity</p></div><div className={styles.legend}><span><i className={styles.assignedDot} />Assigned</span><span><i className={styles.capacityDot} />Capacity</span></div><Link to="/team">View team</Link></header>
      <ul className={styles.chart}>
        {members.map((member) => {
          const assignedWidth = Math.min((member.assigned / highestCapacity) * 100, 100)
          const capacityWidth = (member.capacity / highestCapacity) * 100
          const isOverCapacity = member.assigned > member.capacity
          return <li key={member.id}><div className={styles.member}><strong>{member.name}</strong><span className={isOverCapacity ? styles.warning : ''}>{member.assigned}/{member.capacity}</span></div><div className={styles.bars} role="progressbar" aria-valuemin="0" aria-valuemax={member.capacity} aria-valuenow={member.assigned} aria-label={`${member.name}: ${member.assigned} assigned of ${member.capacity} capacity`}><span className={styles.capacity} style={{ width: `${capacityWidth}%` }} /><span className={`${styles.assigned} ${isOverCapacity ? styles.over : ''}`} style={{ width: `${assignedWidth}%` }} /></div></li>
        })}
      </ul>
    </section>
  )
}

export default WorkloadSummary
