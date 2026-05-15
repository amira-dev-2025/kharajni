const BASE_URL = 'http://localhost:8000/api'

// ─────────────────────────────────────────────
// Helper token
// ─────────────────────────────────────────────
function getAuthHeaders() {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
export async function loginEtudiant(email, mot_de_passe ,role) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email,
      mot_de_passe,
      role,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Erreur login')
  }

  localStorage.setItem('token', data.token)

  return data
}

export async function logoutEtudiant() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: getAuthHeaders(),
  })

  localStorage.removeItem('token')

  return res.json()
}

export async function me() {
  const res = await fetch(`${BASE_URL}/me`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Non authentifié')
  }

  return res.json()
}

// ─────────────────────────────────────────────
// ETUDIANTS
// ─────────────────────────────────────────────
export async function registerEtudiant(data) {
  const res = await fetch(`${BASE_URL}/etudiants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  if (!res.ok) {
    console.log(result)
    throw new Error(result.message || 'Erreur inscription')
  }

  return result
}

export async function getEtudiantById(id) {
  const res = await fetch(`${BASE_URL}/etudiants/${id}`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Étudiant introuvable')
  }

  return res.json()
}

// ─────────────────────────────────────────────
// ECOLES
// ─────────────────────────────────────────────
export async function getEcoles() {
  const res = await fetch(`${BASE_URL}/ecoles`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Erreur chargement écoles')
  }

  return res.json()
}

// ─────────────────────────────────────────────
// CANDIDATURES
// ─────────────────────────────────────────────
export async function getCandidaturesByEtudiant(id) {
  const res = await fetch(
    `${BASE_URL}/candidatures/etudiant/${id}`,
    {
      headers: getAuthHeaders(),
    }
  )

  if (!res.ok) {
    throw new Error('Erreur chargement candidatures')
  }

  return res.json()
}

export async function postuler(data) {
  const res = await fetch(`${BASE_URL}/candidatures`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Erreur candidature')
  }

  return res.json()
}

export async function deleteCandidature(id) {
  const res = await fetch(`${BASE_URL}/candidatures/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Erreur suppression')
  }
}

// ─────────────────────────────────────────────
// DOCUMENTS
// ─────────────────────────────────────────────
export async function getDocumentsByEtudiant(id) {
  const res = await fetch(`${BASE_URL}/documents/etudiant/${id}`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Erreur chargement documents')
  }

  return res.json()
}

export async function uploadDocument(etudiantId, type, file) {
  const formData = new FormData()

  formData.append('etudiantId', etudiantId)
  formData.append('type', type)
  formData.append('file', file)

  const response = await fetch('http://localhost:8000/api/documents/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    console.log(error)
    throw new Error('Erreur upload')
  }

  return response.json()
}

export async function deleteDocument(id) {
  const res = await fetch(`${BASE_URL}/documents/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Erreur suppression document')
  }
}
// ========================================
// ADMIN ECOLES
// ========================================

export async function createEcole(data) {

  const res = await fetch(`${BASE_URL}/admin/ecoles`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Erreur création école')
  }

  return res.json()
}

export async function updateEcole(id, data) {

  const res = await fetch(`${BASE_URL}/admin/ecoles/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Erreur modification école')
  }

  return res.json()
}

export async function deleteEcole(id) {

  const res = await fetch(`${BASE_URL}/admin/ecoles/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Erreur suppression école')
  }
}

// ========================================
// ADMIN ETUDIANTS
// ========================================

export async function getAllEtudiants() {

  const res = await fetch(`${BASE_URL}/admin/etudiants`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Erreur chargement étudiants')
  }

  return res.json()
}
export async function createEtudiant(data) {

  const res = await fetch(`${BASE_URL}/etudiants`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Erreur création étudiant')
  }

  return res.json()
}

export async function updateEtudiant(id, data) {

  const res = await fetch(`${BASE_URL}/admin/etudiants/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Erreur modification étudiant')
  }

  return res.json()
}

export async function deleteEtudiantAdmin(id) {

  const res = await fetch(`${BASE_URL}/admin/etudiants/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Erreur suppression étudiant')
  }
}

// ========================================
// ADMIN DASHBOARD
// ========================================

export async function getAdminStats() {

  const res = await fetch(`${BASE_URL}/admin/stats`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error('Erreur dashboard')
  }

  return res.json()
}

// ========================================
// ADMIN CANDIDATURES
// ========================================

export async function getAllCandidatures() {

  const res = await fetch(
    `${BASE_URL}/admin/candidatures`,
    {
      headers: getAuthHeaders(),
    }
  )

  if (!res.ok) {
    throw new Error(
      'Erreur chargement candidatures'
    )
  }

  return res.json()
}

// ========================================
// ADMIN DOCUMENTS
// ========================================

export async function getAllDocuments() {

  const res = await fetch(
    `${BASE_URL}/admin/documents`,
    {
      headers: getAuthHeaders(),
    }
  )

  if (!res.ok) {
    throw new Error(
      'Erreur chargement documents'
    )
  }

  return res.json()
}


// ========================================
// ADMIN CONSEILLERS
// ========================================

export async function getAllConseillers() {

  const res = await fetch(
    `${BASE_URL}/admin/conseillers`,
    {
      headers: getAuthHeaders(),
    }
  )

  return res.json()
}

export async function createConseiller(data) {

  const res = await fetch(
    `${BASE_URL}/admin/conseillers`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  )

  return res.json()
}

export async function updateConseiller(id, data) {

  const res = await fetch(
    `${BASE_URL}/admin/conseillers/${id}`,
    {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  )

  return res.json()
}

export async function deleteConseiller(id) {

  await fetch(
    `${BASE_URL}/admin/conseillers/${id}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }
  )
}