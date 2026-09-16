import styles from './Avatar.module.css'

function Avatar({ name, src, size = 'medium' }) {
  const initials = name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
  return <span className={`${styles.avatar} ${styles[size]}`} aria-hidden="true">{src ? <img className={styles.image} src={src} alt="" /> : initials}</span>
}

export default Avatar
