import Avatar from '../../../components/ui/Avatar/Avatar'
import RoleDropdown from '../RoleDropdown/RoleDropdown'
import styles from './MemberTable.module.css'

function MemberTable({ members, canManage, isSaving, onRoleChange }) {
  return <div className={styles.wrapper}><table><thead><tr><th>Member</th><th>Role</th><th>Team</th><th>Status</th></tr></thead><tbody>{members.map((member) => <tr key={member.id}><td><div className={styles.member}><Avatar name={member.name} /><span><strong>{member.name}</strong><small>{member.email}</small></span></div></td><td><RoleDropdown value={member.role} disabled={!canManage || isSaving} label={`Role for ${member.name}`} onChange={(role) => onRoleChange(member.id, role)} /></td><td>{member.team}</td><td><span className={`${styles.status} ${styles[member.status]}`}>{member.status}</span></td></tr>)}</tbody></table></div>
}

export default MemberTable
