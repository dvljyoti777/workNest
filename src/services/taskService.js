import { taskMocks } from '../mocks/taskMocks'
import { clone, simulateRequest } from './serviceUtils'

let tasks = clone(taskMocks)

export const taskService = {
  getTasks(options = {}) {
    return simulateRequest(options.empty ? [] : tasks, { ...options, errorMessage: 'Tasks could not be loaded.' })
  },
  async addTask(task, options = {}) {
    const savedTask = await simulateRequest(task, { ...options, errorMessage: 'Task could not be created.' })
    tasks = [...tasks, savedTask]
    return clone(savedTask)
  },
  async updateTask(id, updates, options = {}) {
    const existingTask = tasks.find((task) => task.id === id)
    if (!existingTask) throw new Error('Task was not found.')
    const savedTask = await simulateRequest({ ...existingTask, ...updates, id }, { ...options, errorMessage: 'Task could not be updated.' })
    tasks = tasks.map((task) => task.id === id ? savedTask : task)
    return clone(savedTask)
  },
  async deleteTask(id, options = {}) {
    await simulateRequest({ id }, { ...options, errorMessage: 'Task could not be deleted.' })
    tasks = tasks.filter((task) => task.id !== id)
    return { id }
  },
  async moveTask(id, status, options = {}) {
    const existingTask = tasks.find((task) => task.id === id)
    if (!existingTask) throw new Error('Task was not found.')
    const savedTask = await simulateRequest({ ...existingTask, status }, { ...options, errorMessage: 'Task could not be moved.' })
    tasks = tasks.map((task) => task.id === id ? savedTask : task)
    return clone(savedTask)
  },
}
