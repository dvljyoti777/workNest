import styles from './RoleDropdown.module.css'

const roles = ['admin', 'manager', 'member', 'viewer']

function RoleDropdown({ value, onChange, disabled, label }) {
  return <select className={styles.select} value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled} aria-label={label}>{roles.map((role) => <option key={role} value={role}>{role[0].toUpperCase() + role.slice(1)}</option>)}</select>
}

export default RoleDropdown
