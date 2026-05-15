import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'
import { registerEtudiant } from '../api'
import styles from './Auth.module.css'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    niveauEtude: 'Licence',
    domaine: '',
    motDePasse: '',
    confirm: '',
  })

  const set = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }))
  }

  // ─────────────────────────────────────────────
  // STEP 1
  // ─────────────────────────────────────────────
  const nextStep = () => {
    setError('')

    if (!form.prenom || !form.nom || !form.email) {
      setError('Veuillez remplir les champs obligatoires.')
      return
    }

    setStep(2)
  }

  // ─────────────────────────────────────────────
  // REGISTER
  // ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.motDePasse) {
      setError('Veuillez entrer un mot de passe.')
      return
    }

    if (form.motDePasse !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    if (form.motDePasse.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // IMPORTANT :
      // Laravel attend mot_de_passe
      const payload = {
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        mot_de_passe: form.motDePasse,
      }

      const etudiant = await registerEtudiant(payload)

      login({
        ...etudiant,
        niveauEtude: form.niveauEtude,
        domaine: form.domaine,
        role: 'etudiant',
      })

      navigate('/dashboard')

    } catch (err) {
      console.error(err)
      setError(err.message || 'Erreur lors de la création du compte.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>

      {/* LEFT PANEL */}
      <div className={styles.panel}>
        <div className={styles.panelContent}>

          <div className={styles.panelBig}>
            <div className={styles.bigNum}>1</div>

            <div className={styles.bigStep}>
              Créez votre profil
            </div>

            <div className={styles.bigDivider} />

            <div
              className={styles.bigNum}
              style={{ opacity: step >= 2 ? 1 : 0.4 }}
            >
              2
            </div>

            <div
              className={styles.bigStep}
              style={{ opacity: step >= 2 ? 1 : 0.4 }}
            >
              Complétez vos infos
            </div>
          </div>

          <p
            className={styles.panelSub}
            style={{ marginTop: '2rem' }}
          >
            Rejoignez des milliers d'étudiants tunisiens
            qui réalisent leurs rêves à l'étranger avec Kharajni.
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.formSide}>
        <div className={styles.formWrap}>

          {/* STEPS */}
          <div className={styles.steps}>
            {[1, 2].map((n) => (
              <div key={n} className={styles.stepRow}>

                <div
                  className={`${styles.stepDot} ${
                    step >= n ? styles.stepDotActive : ''
                  }`}
                >
                  {n}
                </div>

                {n < 2 && (
                  <div
                    className={`${styles.stepLine} ${
                      step > n ? styles.stepLineActive : ''
                    }`}
                  />
                )}

              </div>
            ))}
          </div>

          <h1 className={styles.formTitle}>
            {step === 1
              ? 'Créer un compte'
              : 'Votre parcours'}
          </h1>

          <p className={styles.formSub}>
            {step === 1
              ? 'Renseignez vos informations personnelles'
              : 'Parlez-nous de votre projet académique'}
          </p>

          <form
            onSubmit={
              step === 1
                ? (e) => {
                    e.preventDefault()
                    nextStep()
                  }
                : handleSubmit
            }
            className={styles.form}
          >

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 ? (
              <>

                <div className={styles.grid2}>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Prénom *
                    </label>

                    <div className={styles.inputWrap}>
                      <User
                        size={16}
                        className={styles.inputIcon}
                      />

                      <input
                        className={styles.input}
                        placeholder="Mohamed"
                        value={form.prenom}
                        onChange={set('prenom')}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Nom *
                    </label>

                    <input
                      className={styles.input}
                      placeholder="Ben Ali"
                      value={form.nom}
                      onChange={set('nom')}
                    />
                  </div>

                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Email *
                  </label>

                  <div className={styles.inputWrap}>
                    <Mail
                      size={16}
                      className={styles.inputIcon}
                    />

                    <input
                      type="email"
                      className={styles.input}
                      placeholder="email@exemple.com"
                      value={form.email}
                      onChange={set('email')}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Téléphone
                  </label>

                  <div className={styles.inputWrap}>
                    <Phone
                      size={16}
                      className={styles.inputIcon}
                    />

                    <input
                      className={styles.input}
                      placeholder="+216 XX XXX XXX"
                      value={form.telephone}
                      onChange={set('telephone')}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                >
                  Continuer
                  <ArrowRight size={18} />
                </button>

              </>
            ) : (
              <>
                {/* STEP 2 */}

                <div className={styles.grid2}>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Niveau d'étude
                    </label>

                    <select
                      className={styles.input}
                      value={form.niveauEtude}
                      onChange={set('niveauEtude')}
                    >
                      {[
                        'Baccalauréat',
                        'Licence',
                        'Master',
                        'Doctorat',
                      ].map((v) => (
                        <option key={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Domaine souhaité
                    </label>

                    <select
                      className={styles.input}
                      value={form.domaine}
                      onChange={set('domaine')}
                    >
                      <option value="">
                        Choisir...
                      </option>

                      {[
                        'Informatique',
                        'Médecine',
                        'Ingénierie',
                        'Commerce',
                        'Droit',
                        'Architecture',
                        'Arts',
                      ].map((v) => (
                        <option key={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Mot de passe *
                  </label>

                  <div className={styles.inputWrap}>
                    <Lock
                      size={16}
                      className={styles.inputIcon}
                    />

                    <input
                      type={showPwd ? 'text' : 'password'}
                      className={`${styles.input} ${styles.inputPadRight}`}
                      placeholder="Minimum 6 caractères"
                      value={form.motDePasse}
                      onChange={set('motDePasse')}
                    />

                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      {showPwd
                        ? <EyeOff size={16} />
                        : <Eye size={16} />
                      }
                    </button>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Confirmer le mot de passe *
                  </label>

                  <input
                    type="password"
                    className={styles.input}
                    placeholder="Répéter le mot de passe"
                    value={form.confirm}
                    onChange={set('confirm')}
                  />
                </div>

                <div className={styles.btnRow}>

                  <button
                    type="button"
                    onClick={() => {
                      setError('')
                      setStep(1)
                    }}
                    className={styles.backBtn}
                  >
                    <ArrowLeft size={16} />
                    Retour
                  </button>

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                    style={{ flex: 2 }}
                  >
                    {loading
                      ? <span className={styles.spinner} />
                      : (
                        <>
                          Créer mon compte
                          <ArrowRight size={18} />
                        </>
                      )
                    }
                  </button>

                </div>

              </>
            )}

          </form>

          <p className={styles.switchLink}>
            Déjà inscrit ?
            {' '}
            <Link to="/login">
              Se connecter
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}