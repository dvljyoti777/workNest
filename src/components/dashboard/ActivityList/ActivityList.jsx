import Avatar from '../../ui/Avatar/Avatar'
import { Link } from 'react-router-dom'
import styles from './ActivityList.module.css'

function ActivityList({ activities }) {
  return (
    <section className={styles.card} aria-labelledby="recent-activity-title">
      <div className={styles.heading}><div><h2 id="recent-activity-title">Activity feed</h2><p>Latest updates from your team</p></div><Link to="/notifications">View all</Link></div>
      <ol className={styles.list}>
        {activities.map((activity) => (
          <li key={activity.id} className={styles.item}>
            <Avatar name={activity.person} size="small" />
            <div><p><strong>{activity.person}</strong> {activity.action} <span>{activity.subject}</span></p><time>{activity.time}</time></div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default ActivityList
