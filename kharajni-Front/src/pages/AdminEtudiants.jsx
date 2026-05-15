import { useEffect, useState } from 'react'

import {
  getAllEtudiants,
  createEtudiant,
  updateEtudiant,
  deleteEtudiantAdmin
} from '../api'

import styles from './AdminEtudiants.module.css'

export default function AdminEtudiants() {

  const [etudiants, setEtudiants] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
  })

  useEffect(() => {
    loadEtudiants()
  }, [])

  async function loadEtudiants() {

    try {

      const data = await getAllEtudiants()

      setEtudiants(data)

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

        await updateEtudiant(editingId, {
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
        })

      } else {

        await createEtudiant(form)
      }

      setForm({
        nom: '',
        prenom: '',
        email: '',
        mot_de_passe: '',
      })

      setEditingId(null)

      setShowForm(false)

      loadEtudiants()

    } catch (err) {
      console.log(err)
    }
  }

  function handleEdit(etudiant) {

    setForm({
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
      mot_de_passe: '',
    })

    setEditingId(etudiant.id)

    setShowForm(true)
  }

  async function handleDelete(id) {

    if (!window.confirm('Supprimer cet étudiant ?')) return

    try {

      await deleteEtudiantAdmin(id)

      loadEtudiants()

    } catch (err) {
      console.log(err)
    }
  }

  return (

    <div className={styles.page}>

      {/* HEADER */}

      <div className={styles.header}>

        <div>

          <h1 className={styles.title}>
            Gestion des étudiants
          </h1>

          <p className={styles.subtitle}>
            Ajouter, modifier et gérer les étudiants
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
                prenom: '',
                email: '',
                mot_de_passe: '',
              })
            }
          }}
        >
          <i className="bi bi-plus-lg"></i>

          {showForm
            ? 'Fermer'
            : 'Ajouter étudiant'}
        </button>

      </div>

      {/* STATS */}

      <div className={styles.statsCard}>

        <div className={styles.statsIcon}>
          <i className="bi bi-people-fill"></i>
        </div>

        <div>

          <div className={styles.statsLabel}>
            Total étudiants
          </div>

          <div className={styles.statsValue}>
            {etudiants.length}
          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className={styles.contentGrid}>

        {/* TABLE */}

        <div className={styles.tableCard}>

          <table className="table align-middle mb-0">

            <thead className={styles.tableHead}>

              <tr>

                <th>Étudiant</th>

                <th>Email</th>

                <th className="text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {etudiants.map((e) => (

                <tr key={e.id}>

                  <td>

                    <div className={styles.studentInfo}>

                      <div className={styles.avatar}>
                        {e.prenom?.[0]}
                        {e.nom?.[0]}
                      </div>

                      <div>

                        <div className={styles.studentName}>
                          {e.prenom} {e.nom}
                        </div>

                        <div className={styles.studentRole}>
                          Étudiant
                        </div>

                      </div>

                    </div>

                  </td>

                  <td className={styles.email}>
                    {e.email}
                  </td>

                  <td>

                    <div className={styles.actions}>

                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(e)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(e.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* FORM */}

        {showForm && (

          <div className={styles.formCard}>

            <div className={styles.formHeader}>

              <div>

                <h3>
                  {editingId
                    ? 'Modifier étudiant'
                    : 'Ajouter étudiant'}
                </h3>

                <p>
                  Remplissez les informations
                </p>

              </div>

              <button
                className={styles.closeBtn}
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className={styles.formGroup}>

                <label>Nom</label>

                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  placeholder="Ex: Dridi"
                  required
                />

              </div>

              <div className={styles.formGroup}>

                <label>Prénom</label>

                <input
                  type="text"
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  placeholder="Ex: Amira"
                  required
                />

              </div>

              <div className={styles.formGroup}>

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Ex: amira@gmail.com"
                  required
                />

              </div>

              {!editingId && (

                <div className={styles.formGroup}>

                  <label>Mot de passe</label>

                  <input
                    type="password"
                    name="mot_de_passe"
                    value={form.mot_de_passe}
                    onChange={handleChange}
                    placeholder="******"
                    required
                  />

                </div>

              )}

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

                  <i className="bi bi-floppy me-2"></i>

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