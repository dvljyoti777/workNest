import styles from './PlaceholderPage.module.css'

function PlaceholderPage({ title, description }) {
  return <section><header className={styles.heading}><h1>{title}</h1><p>{description}</p></header><div className={styles.empty}><span>W</span><h2>{title} area is ready</h2><p>Feature content can be added here without changing the route layout.</p></div></section>
}

export default PlaceholderPage
