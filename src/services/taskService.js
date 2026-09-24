import { taskMocks } from '../mocks/taskMocks'
import { runtimeConfig } from '../config/runtimeConfig'
import { apiClient } from '../lib/apiClient'
import { mapTask, mapTasks, toTaskPayload } from '../lib/apiMappers'
import { moveTaskInList } from '../lib/taskOrdering'
import { clone, simulateRequest } from './serviceUtils'

let tasks = clone(taskMocks)

export const taskService = {
  getTasks(options = {}) {
    if (runtimeConfig.useApi) return apiClient.get('/tasks').then(mapTasks)
    return simulateRequest(options.empty ? [] : tasks, { ...options, errorMessage: 'Tasks could not be loaded.' })
  },
  async addTask(task, options = {}) {
    if (runtimeConfig.useApi) return mapTask(await apiClient.post('/tasks', toTaskPayload(task)))
    const savedTask = await simulateRequest(task, { ...options, errorMessage: 'Task could not be created.' })
    tasks = [...tasks, savedTask]
    return clone(savedTask)
  },
  async updateTask(id, updates, options = {}) {
    if (runtimeConfig.useApi) return mapTask(await apiClient.put(`/tasks/${encodeURIComponent(id)}`, toTaskPayload(updates)))
    const existingTask = tasks.find((task) => task.id === id)
    if (!existingTask) throw new Error('Task was not found.')
    const savedTask = await simulateRequest({ ...existingTask, ...updates, id }, { ...options, errorMessage: 'Task could not be updated.' })
    tasks = tasks.map((task) => task.id === id ? savedTask : task)
    return clone(savedTask)
  },
  async deleteTask(id, options = {}) {
    if (runtimeConfig.useApi) {
      await apiClient.delete(`/tasks/${encodeURIComponent(id)}`)
      return { id }
    }
    await simulateRequest({ id }, { ...options, errorMessage: 'Task could not be deleted.' })
    tasks = tasks.filter((task) => task.id !== id)
    return { id }
  },
  async moveTask(id, status, targetIndex, options = {}) {
    if (runtimeConfig.useApi) return mapTask(await apiClient.patch(`/tasks/${encodeURIComponent(id)}/status`, { status, position: targetIndex }))
    const existingTask = tasks.find((task) => task.id === id)
    if (!existingTask) throw new Error('Task was not found.')
    const savedTask = await simulateRequest({ ...existingTask, status }, { ...options, errorMessage: 'Task could not be moved.' })
    tasks = moveTaskInList(tasks, id, status, targetIndex).map((task) => task.id === id ? savedTask : task)
    return clone(savedTask)
  },
}
