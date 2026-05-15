// src/pages/AdminConseillers.jsx

import { useEffect, useState } from 'react'

import {
  getAllConseillers,
  createConseiller,
  updateConseiller,
  deleteConseiller
} from '../api'

export default function AdminConseillers() {

  const [conseillers, setConseillers] = useState([])

  const [editing, setEditing] = useState(null)

  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    telephone: '',
    specialite: '',
  })

  async function load() {

    const data = await getAllConseillers()

    setConseillers(data)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSubmit(e) {

    e.preventDefault()

    try {

      if (editing) {

        await updateConseiller(editing, {
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          telephone: form.telephone,
          specialite: form.specialite,
        })

      } else {

        await createConseiller(form)
      }

      setForm({
        nom: '',
        prenom: '',
        email: '',
        mot_de_passe: '',
        telephone: '',
        specialite: '',
      })

      setEditing(null)

      setShowModal(false)

      load()

    } catch (err) {

      console.log(err)

      alert('Erreur')
    }
  }

  function handleEdit(conseiller) {

    setEditing(conseiller.id)

    setForm({
      nom: conseiller.nom,
      prenom: conseiller.prenom,
      email: conseiller.email,
      mot_de_passe: '',
      telephone: conseiller.telephone || '',
      specialite: conseiller.specialite || '',
    })

    setShowModal(true)
  }

  async function handleDelete(id) {

    if (!window.confirm('Supprimer ce conseiller ?')) return

    await deleteConseiller(id)

    load()
  }

  function openCreateModal() {

    setEditing(null)

    setForm({
      nom: '',
      prenom: '',
      email: '',
      mot_de_passe: '',
      telephone: '',
      specialite: '',
    })

    setShowModal(true)
  }

  return (

    <div className="container-fluid p-4">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h1
            className="fw-bold mb-1"
            style={{
              color: '#163c3d',
              fontSize: '2.2rem'
            }}
          >
            Gestion des conseillers
          </h1>

          <p className="text-secondary mb-0">
            Ajouter, modifier et gérer les conseillers
          </p>

        </div>

        <button
          className="btn px-4 py-2 text-white fw-semibold d-flex align-items-center gap-2"
          style={{
            background: '#163c3d',
            borderRadius: '12px'
          }}
          onClick={openCreateModal}
        >
          <i className="bi bi-plus-circle"></i>

          Ajouter conseiller
        </button>

      </div>

      {/* CARD */}

      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          borderRadius: '20px',
          overflow: 'hidden'
        }}
      >

        <div className="card-body">

          <div className="d-flex align-items-center gap-3">

            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '18px',
                background: '#dff5ea',
                color: '#198754'
              }}
            >
              <i
                className="bi bi-people-fill"
                style={{
                  fontSize: '2rem'
                }}
              ></i>
            </div>

            <div>

              <div className="text-secondary">
                Total conseillers
              </div>

              <div
                className="fw-bold"
                style={{
                  fontSize: '2rem',
                  color: '#163c3d'
                }}
              >
                {conseillers.length}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="row">

        <div className={showModal ? 'col-lg-8' : 'col-12'}>

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '20px',
              overflow: 'hidden'
            }}
          >

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead
                  style={{
                    background: '#163c3d'
                  }}
                >

                  <tr>

                    <th className="text-white py-3 px-4">
                      Conseiller
                    </th>

                    <th className="text-white py-3">
                      Email
                    </th>

                    <th className="text-white py-3">
                      Téléphone
                    </th>

                    <th className="text-white py-3">
                      Spécialité
                    </th>

                    <th className="text-white py-3 text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {conseillers.map(c => (

                    <tr key={c.id}>

                      <td className="px-4 py-3">

                        <div className="d-flex align-items-center gap-3">

                          <div
                            className="d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{
                              width: '45px',
                              height: '45px',
                              borderRadius: '50%',
                              background: '#163c3d'
                            }}
                          >
                            {c.prenom?.[0]}
                            {c.nom?.[0]}
                          </div>

                          <div>

                            <div className="fw-semibold">
                              {c.prenom} {c.nom}
                            </div>

                            <small className="text-secondary">
                              Conseiller
                            </small>

                          </div>

                        </div>

                      </td>

                      <td>

                        <div className="text-secondary">
                          {c.email}
                        </div>

                      </td>

                      <td>

                        <div className="text-secondary">
                          {c.telephone || '-'}
                        </div>

                      </td>

                      <td>

                        <div className="text-secondary">
                          {c.specialite || '-'}
                        </div>

                      </td>

                      <td className="text-center">

                        <div className="d-flex justify-content-center gap-2">

                          <button
                            className="btn btn-light border"
                            style={{
                              borderRadius: '10px'
                            }}
                            onClick={() => handleEdit(c)}
                          >
                            <i className="bi bi-pencil-square text-warning"></i>
                          </button>

                          <button
                            className="btn btn-light border"
                            style={{
                              borderRadius: '10px'
                            }}
                            onClick={() => handleDelete(c.id)}
                          >
                            <i className="bi bi-trash text-danger"></i>
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* FORM */}

        {showModal && (

          <div className="col-lg-4">

            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: '24px'
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start mb-4">

                  <div>

                    <h2
                      className="fw-bold mb-1"
                      style={{
                        color: '#163c3d'
                      }}
                    >

                      {editing
                        ? 'Modifier conseiller'
                        : 'Ajouter conseiller'}

                    </h2>

                    <p className="text-secondary mb-0">
                      Remplissez les informations
                    </p>

                  </div>

                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />

                </div>

                <form onSubmit={handleSubmit}>

                  {/* NOM */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Nom
                    </label>

                    <input
                      type="text"
                      className="form-control py-3"
                      placeholder="Ex: Garali"
                      value={form.nom}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          nom: e.target.value
                        })
                      }
                      required
                    />

                  </div>

                  {/* PRENOM */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Prénom
                    </label>

                    <input
                      type="text"
                      className="form-control py-3"
                      placeholder="Ex: Iheb"
                      value={form.prenom}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          prenom: e.target.value
                        })
                      }
                      required
                    />

                  </div>

                  {/* EMAIL */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control py-3"
                      placeholder="Ex: iheb@gmail.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value
                        })
                      }
                      required
                    />

                  </div>

                  {/* PASSWORD */}

                  {!editing && (

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Mot de passe
                      </label>

                      <input
                        type="password"
                        className="form-control py-3"
                        placeholder="********"
                        value={form.mot_de_passe}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            mot_de_passe: e.target.value
                          })
                        }
                        required
                      />

                    </div>

                  )}

                  {/* TELEPHONE */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Téléphone
                    </label>

                    <input
                      type="text"
                      className="form-control py-3"
                      placeholder="Ex: 25478956"
                      value={form.telephone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          telephone: e.target.value
                        })
                      }
                    />

                  </div>

                  {/* SPECIALITE */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Spécialité
                    </label>

                    <input
                      type="text"
                      className="form-control py-3"
                      placeholder="Ex: Informatique"
                      value={form.specialite}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          specialite: e.target.value
                        })
                      }
                    />

                  </div>

                  <button
                    type="submit"
                    className="btn text-white w-100 py-3 fw-semibold"
                    style={{
                      background: '#163c3d',
                      borderRadius: '14px'
                    }}
                  >

                    {editing
                      ? 'Modifier conseiller'
                      : 'Ajouter conseiller'}

                  </button>

                </form>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}