import { activityMocks, projectMocks, workloadMocks } from '../mocks/projectMocks'
import { runtimeConfig } from '../config/runtimeConfig'
import { apiClient } from '../lib/apiClient'
import { mapDashboard, mapProject, mapProjects, toProjectPayload } from '../lib/apiMappers'
import { clone, simulateRequest } from './serviceUtils'

let projects = clone(projectMocks)

export const projectService = {
  getProjects(options = {}) {
    if (runtimeConfig.useApi) return apiClient.get('/projects').then(mapProjects)
    return simulateRequest(options.empty ? [] : projects, { ...options, errorMessage: 'Projects could not be loaded.' })
  },

  getDashboard(options = {}) {
    if (runtimeConfig.useApi) return apiClient.get('/dashboard').then(mapDashboard)
    const data = options.empty
      ? { projects: [], activities: [], workload: [] }
      : { projects, activities: activityMocks, workload: workloadMocks }
    return simulateRequest(data, { ...options, errorMessage: 'Dashboard data could not be loaded.' })
  },

  async createProject(payload, options = {}) {
    if (runtimeConfig.useApi) return mapProject(await apiClient.post('/projects', toProjectPayload(payload)))
    const project = {
      id: `project-${crypto.randomUUID()}`,
      name: payload.name.trim(),
      description: payload.description.trim(),
      dueDate: payload.dueDate,
      color: '#635bff',
      status: 'planning',
      members: [],
      tasks: { completed: 0, total: 0 },
    }
    const savedProject = await simulateRequest(project, { ...options, errorMessage: 'Project could not be created.' })
    projects = [...projects, savedProject]
    return clone(savedProject)
  },

  async updateProject(id, updates, options = {}) {
    if (runtimeConfig.useApi) return mapProject(await apiClient.put(`/projects/${encodeURIComponent(id)}`, toProjectPayload(updates)))
    const existingProject = projects.find((project) => project.id === id)
    if (!existingProject) throw new Error('Project was not found.')
    const savedProject = await simulateRequest({ ...existingProject, ...updates, id }, { ...options, errorMessage: 'Project could not be updated.' })
    projects = projects.map((project) => project.id === id ? savedProject : project)
    return clone(savedProject)
  },

  async deleteProject(id, options = {}) {
    if (runtimeConfig.useApi) {
      await apiClient.delete(`/projects/${encodeURIComponent(id)}`)
      return { id }
    }
    await simulateRequest({ id }, { ...options, errorMessage: 'Project could not be deleted.' })
    projects = projects.filter((project) => project.id !== id)
    return { id }
  },
}
