import { useState, useEffect } from 'react'
import { X, CheckCircle, Loader } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import {
  getEcoles,
  getCandidaturesByEtudiant,
  postuler,
} from '../api'

import styles from './Apply.module.css'

export default function Apply() {
  const { user } = useAuth()

  const [schools, setSchools] = useState([])
  const [applied, setApplied] = useState([])
  const [selected, setSelected] = useState(null)

  const [filterPays, setFilterPays] = useState('')

  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // ─────────────────────────────────────────────
  // Charger écoles + candidatures
  // ─────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const [ecoles, candidatures] = await Promise.all([
          getEcoles(),
          user?.id
            ? getCandidaturesByEtudiant(user.id)
            : Promise.resolve([]),
        ])

        setSchools(ecoles)

        setApplied(
          candidatures.map((c) => c.ecole?.id)
        )

      } catch (err) {
        console.error(err)

        setError(
          'Impossible de charger les données.'
        )

      } finally {
        setLoading(false)
      }
    }

    load()
  }, [user?.id])

  // ─────────────────────────────────────────────
  // Filtres
  // ─────────────────────────────────────────────
  const PAYS = [
    ...new Set(
      schools.map((s) => s.pays).filter(Boolean)
    ),
  ]

  const filtered = filterPays
    ? schools.filter((s) => s.pays === filterPays)
    : schools

  // ─────────────────────────────────────────────
  // POSTULER
  // ─────────────────────────────────────────────
  const doApply = async (school) => {
    setSubmitting(true)

    try {
      await postuler({
        etudiant_id: user.id,
        ecole_id: school.id,
      })

      setApplied((a) => [...a, school.id])

      setSelected(null)

      setToast(
        `Candidature envoyée à ${school.nom} !`
      )

      setTimeout(() => {
        setToast('')
      }, 3500)

    } catch (err) {
      console.error(err)

      setToast(
        'Erreur lors de la candidature.'
      )

      setTimeout(() => {
        setToast('')
      }, 3500)

    } finally {
      setSubmitting(false)
    }
  }

  // ─────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Loader
          size={32}
          style={{
            animation: 'spin 1s linear infinite',
          }}
        />

        <p>Chargement des écoles...</p>
      </div>
    )
  }

  // ─────────────────────────────────────────────
  // ERROR
  // ─────────────────────────────────────────────
  if (error) {
    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#dc2626',
        }}
      >
        <p>{error}</p>
      </div>
    )
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <div className={styles.page}>

      {/* Toast */}
      {toast && (
        <div className={styles.toast}>
          <CheckCircle
            size={16}
            color="var(--mint)"
          />

          {toast}
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Postuler à une école
          </h1>

          <p className={styles.sub}>
            Explorez nos {schools.length}{' '}
            établissement(s) partenaire(s)
          </p>
        </div>

        <div className={styles.applied}>
          <span className={styles.appliedNum}>
            {applied.length}
          </span>

          <span className={styles.appliedLabel}>
            candidature
            {applied.length !== 1 ? 's' : ''}
            {' '}envoyée
            {applied.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Filters */}
      {PAYS.length > 0 && (
        <div className={styles.filters}>

          <button
            onClick={() => setFilterPays('')}
            className={`${styles.filterBtn} ${
              !filterPays
                ? styles.filterBtnActive
                : ''
            }`}
          >
            Tous les pays
          </button>

          {PAYS.map((p) => (
            <button
              key={p}
              onClick={() =>
                setFilterPays(
                  filterPays === p ? '' : p
                )
              }
              className={`${styles.filterBtn} ${
                filterPays === p
                  ? styles.filterBtnActive
                  : ''
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Schools */}
      {filtered.length === 0 ? (

        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
          }}
        >
          <p>
            Aucune école disponible.
          </p>
        </div>

      ) : (

        <div className={styles.grid}>

          {filtered.map((s) => {
            const isApplied =
              applied.includes(s.id)

            return (
              <div
                key={s.id}
                className={styles.card}
              >
                <div className={styles.cardTop}>

                  <div className={styles.logoBox}>
                    {s.nom
                      ?.slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div className={styles.cardInfo}>
                    <h3 className={styles.schoolName}>
                      {s.nom}
                    </h3>

                    <div className={styles.schoolMeta}>
                      {s.pays}

                      {s.ville
                        ? ` · ${s.ville}`
                        : ''}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    !isApplied &&
                    setSelected(s)
                  }
                  className={`${styles.applyBtn} ${
                    isApplied
                      ? styles.applyBtnDone
                      : ''
                  }`}
                  disabled={isApplied}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle size={15} />
                      Candidature envoyée
                    </>
                  ) : (
                    'Postuler maintenant'
                  )}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div
          className={styles.overlay}
          onClick={() => setSelected(null)}
        >
          <div
            className={styles.modal}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>
                  {selected.nom}
                </h2>

                <p className={styles.modalSub}>
                  {selected.pays}

                  {selected.ville
                    ? ` · ${selected.ville}`
                    : ''}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelected(null)
                }
                className={styles.closeBtn}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalActions}>

              <button
                onClick={() =>
                  setSelected(null)
                }
                className={styles.cancelBtn}
              >
                Annuler
              </button>

              <button
                onClick={() =>
                  doApply(selected)
                }
                className={styles.confirmBtn}
                disabled={submitting}
              >
                {submitting
                  ? 'Envoi...'
                  : 'Confirmer ma candidature'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}