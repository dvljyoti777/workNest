import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { teamService } from '../services/teamService'

export const teamKeys = { all: ['team'], members: () => [...teamKeys.all, 'members'] }

export function useTeamQuery() {
  return useQuery({ queryKey: teamKeys.members(), queryFn: () => teamService.getMembers() })
}

export function useTeamMutations() {
  const queryClient = useQueryClient()
  const refresh = () => queryClient.invalidateQueries({ queryKey: teamKeys.members() })
  const inviteMember = useMutation({ mutationFn: (member) => teamService.inviteMember(member), onSuccess: refresh })
  const updateRole = useMutation({ mutationFn: ({ id, role }) => teamService.updateRole(id, role), onSuccess: refresh })
  return { inviteMember, updateRole }
}
