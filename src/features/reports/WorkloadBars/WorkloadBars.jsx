import styles from './WorkloadBars.module.css'

function WorkloadBars({ members }) {
  const maximum = Math.max(...members.map((member) => member.capacity), 1)
  return <article className={styles.card}><h2>Workload by member</h2><div className={styles.chart}>{members.map((member) => <div className={styles.row} key={member.name}><span>{member.name}</span><div className={styles.track}><i className={styles.capacity} style={{ width: `${(member.capacity / maximum) * 100}%` }} /><i className={styles.assigned} style={{ width: `${(member.assigned / maximum) * 100}%` }} /></div><strong>{member.assigned}</strong></div>)}</div><div className={styles.legend}><span><i />Assigned</span><span><i />Capacity</span></div></article>
}

export default WorkloadBars
