import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  GraduationCap, FileText, Clock, CheckCircle, Plus,
  Mail, Phone, Briefcase, Upload, ChevronRight, TrendingUp, Loader
} from 'lucide-react'
import { getCandidaturesByEtudiant, getDocumentsByEtudiant } from '../api'
import styles from './Dashboard.module.css'

const STATUT_STYLE = {
  EN_ATTENTE: { label: 'En attente', color: '#6b7280', bg: '#f3f4f6' },
  VALIDEE:    { label: 'Accepté',    color: '#059669', bg: '#d1fae5' },
  REJETEE:    { label: 'Rejeté',     color: '#dc2626', bg: '#fee2e2' },
}

const ETAPES = [
  { label: 'Inscription', done: true },
  { label: 'Documents',   done: true },
  { label: 'Candidature', done: true },
  { label: 'Visa',        done: false },
  { label: 'Départ',      done: false },
]

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [candidatures, setCandidatures] = useState([])
  const [documents, setDocuments]       = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    if (!user?.id) return
    async function load() {
      try {
        const [cands, docs] = await Promise.all([
          getCandidaturesByEtudiant(user.id),
          getDocumentsByEtudiant(user.id),
        ])
        setCandidatures(cands)
        setDocuments(docs)
      } catch {
        // silently fail — stats will show 0
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user?.id])

  const initials = `${user?.prenom?.[0] ?? 'E'}${user?.nom?.[0] ?? 'T'}`.toUpperCase()

  const stats = [
    { icon: <GraduationCap size={22} strokeWidth={1.6} />, label: 'Mes candidatures',       value: candidatures.length, color: 'var(--teal)', bg: 'rgba(56,125,122,0.1)' },
    { icon: <FileText      size={22} strokeWidth={1.6} />, label: 'Documents déposés',       value: documents.length,   color: '#6b5ce7',     bg: 'rgba(107,92,231,0.1)' },
    { icon: <Clock         size={22} strokeWidth={1.6} />, label: 'En cours de traitement',  value: candidatures.filter(c => c.statut === 'EN_ATTENTE').length, color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
    { icon: <CheckCircle   size={22} strokeWidth={1.6} />, label: 'Candidatures acceptées',  value: candidatures.filter(c => c.statut === 'VALIDEE').length,    color: '#059669', bg: 'rgba(5,150,105,0.1)' },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Bonjour, {user?.prenom || 'Étudiant'} </h1>
          <p className={styles.sub}>Voici un aperçu de votre parcours académique international</p>
        </div>
        <button onClick={() => navigate('/apply')} className={styles.newBtn}>
          <Plus size={18} /> Nouvelle candidature
        </button>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <div className={styles.statValue} style={{ color: s.color }}>
                {loading ? '—' : s.value}
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Mes candidatures</h2>
              <button onClick={() => navigate('/apply')} className={styles.seeAll}>
                Voir tout <ChevronRight size={14} />
              </button>
            </div>
            {loading ? (
              <div style={{ display:'flex', justifyContent:'center', padding:'2rem' }}>
                <Loader size={24} style={{ animation:'spin 1s linear infinite' }} />
              </div>
            ) : candidatures.length === 0 ? (
              <p style={{ color:'var(--text-light)', fontSize:'0.9rem', padding:'1rem 0' }}>
                Aucune candidature pour l'instant. <button onClick={() => navigate('/apply')} style={{ color:'var(--teal)', background:'none', border:'none', cursor:'pointer' }}>Postuler maintenant →</button>
              </p>
            ) : (
              <div className={styles.candList}>
                {candidatures.slice(0, 5).map((c, i) => {
                  const st = STATUT_STYLE[c.statut] || STATUT_STYLE.EN_ATTENTE
                  return (
                    <div key={i} className={styles.candRow} style={{ borderLeftColor: st.color }}>
                      <div className={styles.candInfo}>
                        <div className={styles.candSchool}>{c.ecole?.nom || '—'}</div>
                        <div className={styles.candMeta}>{c.ecole?.pays || ''}{c.ecole?.ville ? ` · ${c.ecole.ville}` : ''}</div>
                      </div>
                      <div className={styles.candRight}>
                        <span className={styles.badge} style={{ color: st.color, background: st.bg }}>{st.label}</span>
                        <div className={styles.candDate}>{c.datePostulation || ''}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className={styles.card} style={{ marginTop: '1.5rem' }}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '1.4rem' }}>Progression du dossier</h2>
            <div className={styles.progressTrack}>
              <div className={styles.progressLine} />
              {ETAPES.map((e, i) => (
                <div key={i} className={styles.stepCol}>
                  <div className={`${styles.stepCircle} ${e.done ? styles.stepDone : ''}`}>
                    {e.done && <CheckCircle size={14} strokeWidth={2.5} />}
                  </div>
                  <span className={`${styles.stepLabel} ${e.done ? styles.stepLabelDone : ''}`}>{e.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={`${styles.card} ${styles.profileCard}`}>
            <div className={styles.profileAvatar}>{initials}</div>
            <div className={styles.profileName}>{user?.prenom} {user?.nom}</div>
            <div className={styles.profileRole}>
              Étudiant · {user?.niveauEtude || 'Licence'}
            </div>
            <div className={styles.profileDivider} />
            <div className={styles.profileDetails}>
              {user?.email     && <div className={styles.profileRow}><Mail      size={13} /> {user.email}</div>}
              {user?.telephone && <div className={styles.profileRow}><Phone     size={13} /> {user.telephone}</div>}
              {user?.domaine   && <div className={styles.profileRow}><Briefcase size={13} /> {user.domaine}</div>}
            </div>
          </div>

          <div className={styles.card} style={{ marginTop: '1.5rem' }}>
            <h3 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>Actions rapides</h3>
            {[
              { icon: <GraduationCap size={16} />, label: 'Parcourir les écoles',    path: '/apply'  },
              { icon: <Upload        size={16} />, label: 'Uploader des documents',  path: '/upload' },
            ].map((a, i) => (
              <button key={i} onClick={() => navigate(a.path)} className={styles.actionBtn}>
                <span className={styles.actionIcon}>{a.icon}</span>
                {a.label}
                <ChevronRight size={15} style={{ marginLeft: 'auto', color: 'var(--text-light)' }} />
              </button>
            ))}
          </div>

          <div className={styles.tipCard}>
            <TrendingUp size={18} color="var(--teal)" />
            <div>
              <div className={styles.tipTitle}>Conseil du jour</div>
              <div className={styles.tipText}>Complétez votre dossier à 100% pour augmenter vos chances d'admission de 60%.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
