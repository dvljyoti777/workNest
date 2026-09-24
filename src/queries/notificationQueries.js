import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '../services/notificationService'
import { notificationKeys } from './queryKeys'

export function useNotificationsQuery(enabled = true) {
  return useQuery({ queryKey: notificationKeys.list(), queryFn: () => notificationService.getNotifications(), enabled })
}

export function useNotificationMutations() {
  const queryClient = useQueryClient()
  const updateCache = (updater) => queryClient.setQueryData(notificationKeys.list(), (current = []) => updater(current))
  const markRead = useMutation({ mutationFn: (id) => notificationService.markRead(id), onMutate: (id) => updateCache((items) => items.map((item) => item.id === id ? { ...item, read: true } : item)), onError: () => queryClient.invalidateQueries({ queryKey: notificationKeys.list() }) })
  const markAllRead = useMutation({ mutationFn: () => notificationService.markAllRead(), onMutate: () => updateCache((items) => items.map((item) => ({ ...item, read: true }))), onError: () => queryClient.invalidateQueries({ queryKey: notificationKeys.list() }) })
  return { markRead, markAllRead }
}
