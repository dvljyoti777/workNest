import { Link, useOutletContext } from 'react-router-dom'
import Avatar from '../../components/ui/Avatar/Avatar'
import styles from './ProjectMembersPage.module.css'

function ProjectMembersPage() {
  const { project } = useOutletContext()
  const members = project.members ?? []
  return <section className={styles.card}><header><div><h2>Project members</h2><p>People currently assigned to {project.name}.</p></div><Link to="/team">Manage team</Link></header>{members.length === 0 ? <p className={styles.empty}>No members have been assigned to this project yet.</p> : <ul>{members.map((member) => <li key={member}><Avatar name={member} /><div><strong>{member}</strong><span>Project contributor</span></div></li>)}</ul>}</section>
}

export default ProjectMembersPage
