import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { projectService } from '../services/projectService'
import { projectKeys } from './queryKeys'

const requestOptions = (mode) => ({
  empty: mode === 'empty',
  shouldFail: mode === 'error',
})

export function useProjectsQuery(mode = 'populated') {
  return useQuery({
    queryKey: projectKeys.list(mode),
    queryFn: () => projectService.getProjects(requestOptions(mode)),
  })
}

export function useDashboardQuery(mode = 'populated') {
  return useQuery({
    queryKey: projectKeys.dashboard(mode),
    queryFn: () => projectService.getDashboard(requestOptions(mode)),
  })
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => projectService.createProject(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: projectKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: projectKeys.dashboards() }),
      ])
    },
  })
}

function useInvalidateProjects() {
  const queryClient = useQueryClient()
  return () => Promise.all([
    queryClient.invalidateQueries({ queryKey: projectKeys.lists() }),
    queryClient.invalidateQueries({ queryKey: projectKeys.dashboards() }),
  ])
}

export function useUpdateProjectMutation() {
  const invalidateProjects = useInvalidateProjects()
  return useMutation({
    mutationFn: ({ id, updates }) => projectService.updateProject(id, updates),
    onSuccess: invalidateProjects,
  })
}

export function useDeleteProjectMutation() {
  const invalidateProjects = useInvalidateProjects()
  return useMutation({
    mutationFn: (id) => projectService.deleteProject(id),
    onSuccess: invalidateProjects,
  })
}
