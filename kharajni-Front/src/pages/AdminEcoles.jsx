import { useEffect, useState } from 'react'
import {
  getEcoles,
  createEcole,
  updateEcole,
  deleteEcole
} from '../api'

import styles from './AdminEcoles.module.css'

export default function AdminEcoles() {
  const [ecoles, setEcoles] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    nom: '',
    pays: '',
    ville: '',
    description: '',
  })

  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadEcoles()
  }, [])

  async function loadEcoles() {
    try {
      const data = await getEcoles()
      setEcoles(data)
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (editingId) {
        await updateEcole(editingId, form)
      } else {
        await createEcole(form)
      }

      setForm({
        nom: '',
        pays: '',
        ville: '',
        description: '',
      })

      setEditingId(null)
      setShowForm(false)

      loadEcoles()
    } catch (err) {
      console.log(err)
    }
  }

  function handleEdit(ecole) {
    setForm({
      nom: ecole.nom,
      pays: ecole.pays,
      ville: ecole.ville || '',
      description: ecole.description || '',
    })

    setEditingId(ecole.id)
    setShowForm(true)
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer cette école ?')) return

    try {
      await deleteEcole(id)
      loadEcoles()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.top}>
        <div>
          <h1 className={styles.title}>Gestion des écoles</h1>

          <p className={styles.subtitle}>
            Ajouter, modifier et gérer les écoles
          </p>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => {
            setShowForm(!showForm)

            if (showForm) {
              setEditingId(null)

              setForm({
                nom: '',
                pays: '',
                ville: '',
                description: '',
              })
            }
          }}
        >
          <i className="bi bi-plus-lg"></i>

          {showForm ? 'Fermer' : 'Ajouter école'}
        </button>
      </div>

      {/* STATS */}
      <div className={styles.statsCard}>
        <div className={styles.statsIcon}>
          <i className="bi bi-building"></i>
        </div>

        <div>
          <p>Total écoles</p>
          <h2>{ecoles.length}</h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {/* TABLE */}
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>École</th>
                <th>Pays</th>
                <th>Ville</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {ecoles.map((ecole) => (
                <tr key={ecole.id}>
                  <td>
                    <div className={styles.schoolCell}>
                      <div className={styles.logo}>
                        <i className="bi bi-bank"></i>
                      </div>

                      <div>
                        <h4>{ecole.nom}</h4>

                        <p>
                          {ecole.description ||
                            'École internationale'}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>{ecole.pays}</td>

                  <td>{ecole.ville}</td>

                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(ecole)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(ecole.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.footerTable}>
            Affichage de 1 à {ecoles.length} sur {ecoles.length} écoles
          </div>
        </div>

        {/* FORM */}
        {showForm && (
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3>
                {editingId
                  ? 'Modifier école'
                  : 'Ajouter une école'}
              </h3>

              <button
                className={styles.closeBtn}
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>Nom de l'école</label>

                <input
                  type="text"
                  name="nom"
                  placeholder="Ex: HEC Paris"
                  value={form.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Pays</label>

                <input
                  type="text"
                  name="pays"
                  placeholder="Sélectionner un pays"
                  value={form.pays}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Ville</label>

                <input
                  type="text"
                  name="ville"
                  placeholder="Ex: Paris"
                  value={form.ville}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label>Description</label>

                <textarea
                  name="description"
                  placeholder="Description de l'école..."
                  value={form.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowForm(false)}
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className={styles.saveBtn}
                >
                  <i className="bi bi-floppy"></i>

                  {editingId
                    ? 'Modifier'
                    : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}