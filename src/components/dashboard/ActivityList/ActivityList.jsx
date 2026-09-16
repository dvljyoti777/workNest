import Avatar from '../../ui/Avatar/Avatar'
import styles from './ActivityList.module.css'

function ActivityList({ activities }) {
  return (
    <section className={styles.card} aria-labelledby="recent-activity-title">
      <div className={styles.heading}><div><h2 id="recent-activity-title">Recent activity</h2><p>Latest updates from your team</p></div><button type="button" aria-label="Activity options">...</button></div>
      <ol className={styles.list}>
        {activities.map((activity) => (
          <li key={activity.id} className={styles.item}>
            <Avatar name={activity.person} size="small" />
            <div><p><strong>{activity.person}</strong> {activity.action} <a href={`#${activity.id}`}>{activity.subject}</a></p><time>{activity.time}</time></div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default ActivityList
