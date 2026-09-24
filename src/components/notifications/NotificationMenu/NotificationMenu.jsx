import { useNavigate } from 'react-router-dom'
import { useNotificationMutations, useNotificationsQuery } from '../../../queries/notificationQueries'
import styles from './NotificationMenu.module.css'

function NotificationMenu({ onClose }) {
  const navigate = useNavigate()
  const notificationsQuery = useNotificationsQuery()
  const { markRead, markAllRead } = useNotificationMutations()
  const notifications = notificationsQuery.data ?? []
  const unreadCount = notifications.filter((item) => !item.read).length

  const openNotification = (notification) => {
    if (!notification.read) markRead.mutate(notification.id)
    onClose()
    navigate(notification.href)
  }

  return <section className={styles.panel} role="dialog" aria-labelledby="notifications-title"><header><div><p>Updates</p><h2 id="notifications-title">Notifications</h2></div>{unreadCount > 0 && <button type="button" disabled={markAllRead.isPending} onClick={() => markAllRead.mutate()}>Mark all read</button>}</header>{notificationsQuery.isPending && <div className={styles.loading} role="status">Loading notifications...</div>}{notificationsQuery.isError && <div className={styles.error} role="alert"><p>{notificationsQuery.error.message}</p><button type="button" onClick={() => notificationsQuery.refetch()}>Retry</button></div>}{notificationsQuery.isSuccess && notifications.length === 0 && <div className={styles.empty}><strong>You are all caught up</strong><span>New updates will appear here.</span></div>}{notifications.length > 0 && <ul>{notifications.slice(0, 4).map((notification) => <li key={notification.id} className={!notification.read ? styles.unread : ''}><button type="button" onClick={() => openNotification(notification)}><span className={`${styles.typeIcon} ${styles[notification.type]}`} aria-hidden="true">{notification.type[0].toUpperCase()}</span><span className={styles.copy}><strong>{notification.title}</strong><span>{notification.message}</span><time>{notification.createdAt}</time></span>{!notification.read && <i aria-label="Unread" />}</button></li>)}</ul>}<footer><button type="button" onClick={() => { onClose(); navigate('/notifications') }}>View all notifications</button></footer></section>
}

export default NotificationMenu
