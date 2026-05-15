// DashboardAdmin.jsx

import { useEffect, useState } from 'react'

import {
  getAllEtudiants,
  getEcoles,
  getAllCandidatures,
  getAllDocuments
} from '../api'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export default function DashboardAdmin() {

  const [etudiants, setEtudiants] = useState([])
  const [ecoles, setEcoles] = useState([])
  const [candidatures, setCandidatures] = useState([])
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {

    try {

      const [
        etudiantsData,
        ecolesData,
        candidaturesData,
        documentsData
      ] = await Promise.all([
        getAllEtudiants(),
        getEcoles(),
        getAllCandidatures(),
        getAllDocuments()
      ])

      setEtudiants(etudiantsData)
      setEcoles(ecolesData)
      setCandidatures(candidaturesData)
      setDocuments(documentsData)

    } catch (err) {

      console.log(err)
    }
  }

  // =========================
  // CHART DATA
  // =========================

  const candidatureData = [
    {
      name: 'En attente',
      total: candidatures.filter(
        c => c.statut === 'en_attente'
      ).length,
    },
    {
      name: 'Acceptées',
      total: candidatures.filter(
        c => c.statut === 'acceptee'
      ).length,
    },
    {
      name: 'Refusées',
      total: candidatures.filter(
        c => c.statut === 'refusee'
      ).length,
    },
  ]

  const pieData = [
    {
      name: 'Étudiants',
      value: etudiants.length,
    },
    {
      name: 'Écoles',
      value: ecoles.length,
    },
    {
      name: 'Documents',
      value: documents.length,
    },
  ]

  const COLORS = [
    '#163c3d',
    '#22c55e',
    '#f59e0b'
  ]

  return (

    <div className="container-fluid p-4">

      {/* HEADER */}

      <div className="mb-4">

        <h1
          className="fw-bold"
          style={{
            color: '#163c3d',
            fontSize: '3rem'
          }}
        >
          Dashboard Admin
        </h1>

        <p
          className="text-secondary"
          style={{
            fontSize: '1.1rem'
          }}
        >
          Vue globale de la plateforme
        </p>

      </div>

      {/* STATS */}

      <div className="row g-4 mb-4">

        {/* ETUDIANTS */}

        <div className="col-lg-3 col-md-6">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: '24px'
            }}
          >

            <div className="card-body d-flex align-items-center gap-3">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: '#e8f0ef',
                  color: '#163c3d',
                  fontSize: '28px'
                }}
              >
                <i className="bi bi-people-fill"></i>
              </div>

              <div>

                <h2 className="fw-bold mb-1">
                  {etudiants.length}
                </h2>

                <div className="text-secondary">
                  Étudiants
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ECOLES */}

        <div className="col-lg-3 col-md-6">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: '24px'
            }}
          >

            <div className="card-body d-flex align-items-center gap-3">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: '#e8edff',
                  color: '#2563eb',
                  fontSize: '28px'
                }}
              >
                <i className="bi bi-building"></i>
              </div>

              <div>

                <h2 className="fw-bold mb-1">
                  {ecoles.length}
                </h2>

                <div className="text-secondary">
                  Écoles
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* CANDIDATURES */}

        <div className="col-lg-3 col-md-6">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: '24px'
            }}
          >

            <div className="card-body d-flex align-items-center gap-3">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: '#fff6df',
                  color: '#f59e0b',
                  fontSize: '28px'
                }}
              >
                <i className="bi bi-file-earmark-text"></i>
              </div>

              <div>

                <h2 className="fw-bold mb-1">
                  {candidatures.length}
                </h2>

                <div className="text-secondary">
                  Candidatures
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* DOCUMENTS */}

        <div className="col-lg-3 col-md-6">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: '24px'
            }}
          >

            <div className="card-body d-flex align-items-center gap-3">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: '#e8f7ef',
                  color: '#16a34a',
                  fontSize: '28px'
                }}
              >
                <i className="bi bi-folder-fill"></i>
              </div>

              <div>

                <h2 className="fw-bold mb-1">
                  {documents.length}
                </h2>

                <div className="text-secondary">
                  Documents
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CHARTS */}

      <div className="row g-4 mb-4">

        {/* BAR CHART */}

        <div className="col-lg-8">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: '24px'
            }}
          >

            <div className="card-body">

              <h4
                className="fw-bold mb-4"
                style={{
                  color: '#163c3d'
                }}
              >
                Candidatures
              </h4>

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <BarChart data={candidatureData}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="total"
                    fill="#163c3d"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="col-lg-4">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: '24px'
            }}
          >

            <div className="card-body">

              <h4
                className="fw-bold mb-4"
                style={{
                  color: '#163c3d'
                }}
              >
                Répartition
              </h4>

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {pieData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

      {/* TABLES */}

      <div className="row g-4">

        {/* CANDIDATURES */}

        <div className="col-lg-8">

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '24px'
            }}
          >

            <div className="card-body">

              <h3
                className="fw-bold mb-4"
                style={{
                  color: '#163c3d'
                }}
              >
                Dernières candidatures
              </h3>

              <div className="table-responsive">

                <table className="table align-middle">

                  <thead>

                    <tr>

                      <th>Étudiant</th>

                      <th>École</th>

                      <th>Statut</th>

                    </tr>

                  </thead>

                  <tbody>

                    {candidatures.map(c => (

                      <tr key={c.id}>

                        <td>
                          {c.etudiant
                            ? `${c.etudiant.prenom} ${c.etudiant.nom}`
                            : '—'}
                        </td>

                        <td>
                          {c.ecole?.nom}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              c.statut === 'acceptee'
                                ? 'bg-success'
                                : c.statut === 'refusee'
                                ? 'bg-danger'
                                : 'bg-warning text-dark'
                            }`}
                          >
                            {c.statut}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

        {/* ETUDIANTS */}

        <div className="col-lg-4">

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '24px'
            }}
          >

            <div className="card-body">

              <h3
                className="fw-bold mb-4"
                style={{
                  color: '#163c3d'
                }}
              >
                Nouveaux étudiants
              </h3>

              <div className="d-flex flex-column gap-3">

                {etudiants.slice(0, 5).map(e => (

                  <div
                    key={e.id}
                    className="d-flex align-items-center gap-3"
                  >

                    <div
                      className="text-white fw-bold d-flex align-items-center justify-content-center"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#163c3d'
                      }}
                    >
                      {e.prenom?.[0]}
                      {e.nom?.[0]}
                    </div>

                    <div>

                      <div className="fw-semibold">

                        {e.prenom} {e.nom}

                      </div>

                      <small className="text-secondary">
                        {e.email}
                      </small>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}