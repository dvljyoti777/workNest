import ResourceState from '../../components/ui/ResourceState/ResourceState'
import { useNotificationMutations, useNotificationsQuery } from '../../queries/notificationQueries'
import styles from './NotificationsPage.module.css'

function NotificationsPage() {
  const query = useNotificationsQuery()
  const { markRead, markAllRead } = useNotificationMutations()
  const notifications = query.data ?? []
  const unread = notifications.filter((item) => !item.read).length
  return <section><header className={styles.header}><div><p>Inbox</p><h1>Notifications</h1><span>{unread ? `${unread} unread updates` : 'You are all caught up'}</span></div>{unread > 0 && <button type="button" onClick={() => markAllRead.mutate()}>Mark all as read</button>}</header>{query.isPending && <ResourceState type="loading" />}{query.isError && <ResourceState type="error" title="Notifications unavailable" message={query.error.message} onRetry={() => query.refetch()} />}{query.isSuccess && notifications.length === 0 && <ResourceState type="empty" title="No notifications" message="New workspace updates will appear here." />}{notifications.length > 0 && <div className={styles.list}>{notifications.map((item) => <article className={!item.read ? styles.unread : ''} key={item.id}><span className={styles.icon} aria-hidden="true">{item.type[0].toUpperCase()}</span><div><h2>{item.title}</h2><p>{item.message}</p><time>{item.createdAt}</time></div>{!item.read && <button type="button" onClick={() => markRead.mutate(item.id)}>Mark read</button>}</article>)}</div>}</section>
}

export default NotificationsPage
