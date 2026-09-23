import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { taskService } from '../services/taskService'
import { projectKeys, taskKeys } from './queryKeys'

const requestOptions = (mode) => ({ empty: mode === 'empty', shouldFail: mode === 'error' })

export function useTasksQuery(mode = 'populated') {
  return useQuery({
    queryKey: taskKeys.list(mode),
    queryFn: () => taskService.getTasks(requestOptions(mode)),
  })
}

export function useTaskMutations(mode = 'populated') {
  const queryClient = useQueryClient()
  const activeListKey = taskKeys.list(mode)
  const invalidateTasks = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() }),
      queryClient.invalidateQueries({ queryKey: projectKeys.dashboards() }),
    ])
  }

  const addTask = useMutation({
    mutationFn: (task) => taskService.addTask(task),
    onSuccess: invalidateTasks,
  })

  const updateTask = useMutation({
    mutationFn: ({ id, updates }) => taskService.updateTask(id, updates),
    onSuccess: invalidateTasks,
  })

  const deleteTask = useMutation({
    mutationFn: (id) => taskService.deleteTask(id),
    onSuccess: invalidateTasks,
  })

  const moveTask = useMutation({
    mutationFn: ({ id, status }) => taskService.moveTask(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: activeListKey })
      const previousTasks = queryClient.getQueryData(activeListKey)
      queryClient.setQueryData(activeListKey, (currentTasks = []) => currentTasks.map((task) => task.id === id ? { ...task, status } : task))
      return { previousTasks }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTasks) queryClient.setQueryData(activeListKey, context.previousTasks)
    },
    onSettled: invalidateTasks,
  })

  return { addTask, updateTask, deleteTask, moveTask }
}
