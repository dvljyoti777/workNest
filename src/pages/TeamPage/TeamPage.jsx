import { useMemo, useState } from 'react'
import ResourceState from '../../components/ui/ResourceState/ResourceState'
import InviteMemberModal from '../../features/team/InviteMemberModal/InviteMemberModal'
import MemberTable from '../../features/team/MemberTable/MemberTable'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { useTeamMutations, useTeamQuery } from '../../queries/teamQueries'
import styles from './TeamPage.module.css'

const emptyMembers = []

function TeamPage() {
  const [search, setSearch] = useState('')
  const [showInvite, setShowInvite] = useState(false)
  const { can } = useAuth()
  const { showToast } = useToast()
  const teamQuery = useTeamQuery()
  const mutations = useTeamMutations()
  const canManage = can('team:manage')
  const members = teamQuery.data ?? emptyMembers
  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return query ? members.filter((member) => `${member.name} ${member.email} ${member.role} ${member.team}`.toLowerCase().includes(query)) : members
  }, [members, search])

  const invite = async (member) => {
    try {
      await mutations.inviteMember.mutateAsync(member)
      showToast('Invitation sent successfully')
      setShowInvite(false)
    } catch {
      // Error stays visible in the modal.
    }
  }

  const updateRole = (id, role) => mutations.updateRole.mutate({ id, role }, {
    onSuccess: () => showToast('Member role updated'),
    onError: () => showToast('Role could not be updated', 'error'),
  })

  return <><header className={styles.header}><div><p>Workspace access</p><h1>Team members</h1><span>Manage roles, teams and pending invitations.</span></div>{canManage && <button type="button" onClick={() => setShowInvite(true)}>+ Invite member</button>}</header><section className={styles.panel}><div className={styles.toolbar}><label><span>Search members</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search members..." /></label><strong>{filteredMembers.length} members</strong></div>{teamQuery.isPending && <ResourceState type="loading" />}{teamQuery.isError && <ResourceState type="error" title="Team unavailable" message={teamQuery.error.message} onRetry={() => teamQuery.refetch()} />}{teamQuery.isSuccess && filteredMembers.length === 0 && <ResourceState type="empty" title="No members found" message="Try a different name, email, role or team." />}{teamQuery.isSuccess && filteredMembers.length > 0 && <MemberTable members={filteredMembers} canManage={canManage} isSaving={mutations.updateRole.isPending} onRoleChange={updateRole} />}</section>{showInvite && <InviteMemberModal onClose={() => { mutations.inviteMember.reset(); setShowInvite(false) }} onInvite={invite} isSaving={mutations.inviteMember.isPending} error={mutations.inviteMember.error} />}</>
}

export default TeamPage
