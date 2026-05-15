import { GraduationCap } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <GraduationCap size={16} color="#BEE3DB" strokeWidth={1.8} />
          </div>
          <span className={styles.name}>Kharajni</span>
        </div>
        <p className={styles.tagline}>Staying Ahead, Studying Abroad</p>
        <p className={styles.copy}>© 2025 Kharajni. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
