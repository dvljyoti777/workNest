import EmptyState from '../EmptyState/EmptyState'
import ErrorState from '../ErrorState/ErrorState'
import Skeleton from '../Skeleton/Skeleton'

function ResourceState({ type, title, message, onRetry }) {
  if (type === 'loading') {
    return <Skeleton />
  }

  if (type === 'error') return <ErrorState title={title} message={message} onRetry={onRetry} />
  return <EmptyState title={title} message={message} actionLabel="Reload data" onAction={onRetry} />
}

export default ResourceState
