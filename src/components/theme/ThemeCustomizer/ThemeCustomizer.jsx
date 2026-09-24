import { useTheme } from '../../../hooks/useTheme'
import styles from './ThemeCustomizer.module.css'

function ThemeCustomizer({ onClose }) {
  const { theme, colorThemes, fontThemes, setColor, setFont } = useTheme()
  const activeFont = fontThemes.find((option) => option.id === theme.font) ?? fontThemes[0]

  return <section className={styles.panel} role="dialog" aria-modal="false" aria-labelledby="appearance-title"><header><div><p>Personalize WorkNest</p><h2 id="appearance-title">Appearance</h2></div><button type="button" onClick={onClose} aria-label="Close appearance settings">×</button></header><fieldset><legend>Accent color</legend><div className={styles.colors}>{colorThemes.map((option) => <button type="button" key={option.id} className={theme.color === option.id ? styles.selectedColor : ''} style={{ '--swatch-color': option.primary }} onClick={() => setColor(option.id)} aria-label={option.label} aria-pressed={theme.color === option.id} />)}</div></fieldset><label className={styles.fontLabel}>Interface font<select value={theme.font} onChange={(event) => setFont(event.target.value)}>{fontThemes.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label><div className={styles.preview}><span>{activeFont.label} preview</span><strong>Plan clearly. Deliver confidently.</strong><button type="button">Primary action</button></div></section>
}

export default ThemeCustomizer
