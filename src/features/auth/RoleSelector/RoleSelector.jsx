import styles from './RoleSelector.module.css'

const roles = [
  { value: 'admin', label: 'Admin', description: 'Full access to all features', icon: 'A' },
  { value: 'manager', label: 'Manager', description: 'Manage projects and teams', icon: 'M' },
  { value: 'member', label: 'Member', description: 'View and update tasks', icon: 'W' },
  { value: 'viewer', label: 'Viewer', description: 'View-only access', icon: 'V' },
]

function RoleSelector({ value, onChange, disabled = false }) {
  return (
    <fieldset className={styles.selector} disabled={disabled}>
      <legend>Select your role</legend>
      <div className={styles.options}>
        {roles.map((role) => (
          <label className={value === role.value ? styles.selected : ''} key={role.value}>
            <input
              type="radio"
              name="role"
              value={role.value}
              checked={value === role.value}
              onChange={(event) => onChange(event.target.value)}
            />
            <span className={styles.icon} aria-hidden="true">{role.icon}</span>
            <span className={styles.copy}><strong>{role.label}</strong><small>{role.description}</small></span>
            <span className={styles.radio} aria-hidden="true" />
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default RoleSelector
