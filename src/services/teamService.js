import { teamMocks } from '../mocks/teamMocks'
import { runtimeConfig } from '../config/runtimeConfig'
import { apiClient } from '../lib/apiClient'
import { mapMember, mapMembers, toMemberPayload } from '../lib/apiMappers'
import { clone, simulateRequest } from './serviceUtils'

let members = clone(teamMocks)

export const teamService = {
  getMembers(options = {}) {
    if (runtimeConfig.useApi) return apiClient.get('/team/members').then(mapMembers)
    return simulateRequest(members, { ...options, errorMessage: 'Team members could not be loaded.' })
  },
  async inviteMember(member, options = {}) {
    if (runtimeConfig.useApi) return mapMember(await apiClient.post('/team/invitations', toMemberPayload(member)))
    const savedMember = await simulateRequest({ ...member, id: crypto.randomUUID(), status: 'invited' }, { ...options, errorMessage: 'Invitation could not be sent.' })
    members = [...members, savedMember]
    return clone(savedMember)
  },
  async updateRole(id, role, options = {}) {
    if (runtimeConfig.useApi) return mapMember(await apiClient.patch(`/team/members/${encodeURIComponent(id)}/role`, { role }))
    const member = members.find((item) => item.id === id)
    if (!member) throw new Error('Team member was not found.')
    const savedMember = await simulateRequest({ ...member, role }, { ...options, errorMessage: 'Role could not be updated.' })
    members = members.map((item) => item.id === id ? savedMember : item)
    return clone(savedMember)
  },
}
