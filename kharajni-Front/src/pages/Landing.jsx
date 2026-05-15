import { Link } from 'react-router-dom'
import { ArrowRight, Star, Globe, Users, BookOpen, CheckCircle, MapPin } from 'lucide-react'
import styles from './Landing.module.css'

const STATS = [
  { value: '200+', label: 'Écoles partenaires' },
  { value: '45',   label: 'Pays disponibles'  },
  { value: '3 200+', label: 'Étudiants placés' },
  { value: '94%',  label: 'Taux de réussite'  },
]

const DESTINATIONS = [
  { flag: '🇫🇷', name: 'France',      count: '48 écoles'  },
  { flag: '🇨🇦', name: 'Canada',      count: '32 écoles'  },
  { flag: '🇩🇪', name: 'Allemagne',   count: '27 écoles'  },
  { flag: '🇧🇪', name: 'Belgique',    count: '18 écoles'  },
  { flag: '🇨🇭', name: 'Suisse',      count: '14 écoles'  },
  { flag: '🇪🇸', name: 'Espagne',     count: '22 écoles'  },
  { flag: '🇳🇱', name: 'Pays-Bas',   count: '16 écoles'  },
  { flag: '🇮🇹', name: 'Italie',      count: '20 écoles'  },
]

const FEATURES = [
  { icon: <BookOpen size={22} strokeWidth={1.6} />, title: 'Candidature simplifiée', desc: 'Postulez à plusieurs universités en quelques clics avec un dossier unique.' },
  { icon: <Globe     size={22} strokeWidth={1.6} />, title: '200+ établissements', desc: 'Accédez aux meilleures universités européennes et nord-américaines.' },
  { icon: <Users     size={22} strokeWidth={1.6} />, title: 'Accompagnement humain', desc: 'Des conseillers dédiés vous guident à chaque étape de votre parcours.' },
  { icon: <CheckCircle size={22} strokeWidth={1.6} />, title: 'Suivi en temps réel', desc: 'Consultez l\'état de chaque candidature depuis votre tableau de bord.' },
]

export default function Landing() {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBgCircle1} />
        <div className={styles.heroBgCircle2} />
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Star size={12} fill="currentColor" strokeWidth={0} />
            Plateforme #1 d'études à l'étranger en Tunisie
          </div>
          <h1 className={styles.heroTitle}>
            Votre avenir académique,<br />
            <span className={styles.heroAccent}>au-delà des frontières</span>
          </h1>
          <p className={styles.heroSub}>
            Kharajni vous connecte aux meilleures universités du monde.
            Postulez facilement, suivez vos candidatures et réalisez
            votre rêve d'études à l'étranger.
          </p>
          <div className={styles.heroCta}>
            <Link to="/register" className={styles.ctaPrimary}>
              Commencer gratuitement <ArrowRight size={18} />
            </Link>
            <Link to="/login" className={styles.ctaSecondary}>
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.statsBar}>
        {STATS.map((s, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Pourquoi choisir Kharajni ?</h2>
          <p className={styles.sectionSub}>Une plateforme pensée pour les étudiants tunisiens qui visent l'excellence à l'international</p>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className={styles.destinations}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Destinations populaires</h2>
          <p className={styles.sectionSub}>Des universités d'excellence dans des pays qui vous accueillent</p>
        </div>
        <div className={styles.destGrid}>
          {DESTINATIONS.map((d, i) => (
            <div key={i} className={styles.destCard}>
              <span className={styles.destFlag}>{d.flag}</span>
              <span className={styles.destName}>{d.name}</span>
              <span className={styles.destCount}>{d.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className={styles.ctaStrip}>
        <div className={styles.ctaStripInner}>
          <div>
            <h2 className={styles.ctaStripTitle}>Prêt à franchir le pas ?</h2>
            <p className={styles.ctaStripSub}>Rejoignez des milliers d'étudiants tunisiens qui réalisent leurs rêves à l'étranger.</p>
          </div>
          <Link to="/register" className={styles.ctaStripBtn}>
            Créer mon compte gratuitement <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  )
}
