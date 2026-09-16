import styles from './WorkloadSummary.module.css'

function WorkloadSummary({ members }) {
  return (
    <section className={styles.card} aria-labelledby="workload-title">
      <div className={styles.heading}><div><h2 id="workload-title">Team workload</h2><p>Assigned tasks against capacity</p></div><a href="#team">Manage</a></div>
      <ul className={styles.list}>
        {members.map((member) => {
          const load = member.capacity === 0 ? 0 : Math.round((member.assigned / member.capacity) * 100)
          const barWidth = Math.min(load, 100)
          const isOverCapacity = load > 100
          return (
            <li key={member.id}>
              <div className={styles.person}><span className={styles.initials} style={{ color: member.color }}>{member.initials}</span><strong>{member.name}</strong><span className={isOverCapacity ? styles.warning : ''}>{member.assigned}/{member.capacity} tasks</span></div>
              <div className={styles.track} aria-label={`${member.name}: ${load}% workload`}><span style={{ width: `${barWidth}%`, backgroundColor: isOverCapacity ? '#f04438' : member.color }} /></div>
              {isOverCapacity && <small>Over capacity</small>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default WorkloadSummary
