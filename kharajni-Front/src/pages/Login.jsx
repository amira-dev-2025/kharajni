import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, Globe, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { loginEtudiant } from '../api'
import styles from './Auth.module.css'

const ROLES = [
  { key: 'etudiant',   label: 'Étudiant' },
  { key: 'conseiller', label: 'Conseiller' },
  { key: 'admin',      label: 'Administrateur' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', motDePasse: '', role: 'etudiant' })
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.motDePasse) {
      setError('Veuillez remplir tous les champs.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await loginEtudiant(
        form.email,
        form.motDePasse,
        form.role
      )

      login({
        ...data.user,
        token: data.token,
      })

      if (data.user.role === 'admin') {
        navigate('/admin')
      }
      else {
        navigate('/dashboard')
      }

    } catch (err) {
      setError(
        err.message ||
        'Erreur de connexion. Vérifiez vos identifiants.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      {/* LEFT PANEL */}
      <div className={styles.panel}>
        <div className={styles.panelContent}>
          <div className={styles.panelLogo}>
            <div className={styles.panelLogoIcon}><GraduationCap size={22} color="#BEE3DB" strokeWidth={1.6} /></div>
            <span>Kharajni</span>
          </div>
          <h2 className={styles.panelTitle}>Bienvenue sur<br />Kharajni</h2>
          <p className={styles.panelSub}>Accédez à votre espace personnel et suivez vos candidatures dans les meilleures universités du monde.</p>
          <div className={styles.panelFeatures}>
            {[
              { icon: <GraduationCap size={18} strokeWidth={1.6} />, text: '200+ universités partenaires' },
              { icon: <Globe size={18} strokeWidth={1.6} />, text: '45 pays disponibles' },
              { icon: <Users size={18} strokeWidth={1.6} />, text: 'Accompagnement personnalisé' },
            ].map((f, i) => (
              <div key={i} className={styles.panelFeature}>
                <div className={styles.panelFeatureIcon}>{f.icon}</div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className={styles.formSide}>
        <div className={styles.formWrap}>
          <h1 className={styles.formTitle}>Connexion</h1>
          <p className={styles.formSub}>Connectez-vous à votre espace Kharajni</p>

          {/* Role selector */}
          <div className={styles.roleGrid}>
            {ROLES.map(r => (
              <button
                key={r.key}
                type="button"
                onClick={() => setForm(f => ({ ...f, role: r.key }))}
                className={`${styles.roleBtn} ${form.role === r.key ? styles.roleBtnActive : ''}`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.field}>
              <label className={styles.label}>Adresse email</label>
              <div className={styles.inputWrap}>
                <Mail size={16} className={styles.inputIcon} />
                <input type="email" className={styles.input} placeholder="email@exemple.com"
                  value={form.email} onChange={set('email')} />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Mot de passe</label>
              <div className={styles.inputWrap}>
                <Lock size={16} className={styles.inputIcon} />
                <input type={showPwd ? 'text' : 'password'} className={`${styles.input} ${styles.inputPadRight}`}
                  placeholder="••••••••" value={form.motDePasse} onChange={set('motDePasse')} />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className={styles.forgot}><span>Mot de passe oublié ?</span></div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : <>Se connecter <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className={styles.switchLink}>
            Pas encore inscrit ? <Link to="/register">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
