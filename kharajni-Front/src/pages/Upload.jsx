import { useState, useRef, useEffect } from 'react'
import { Upload, FileText, CheckCircle, X, AlertCircle, Loader } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getDocumentsByEtudiant, uploadDocument, deleteDocument } from '../api'
import styles from './Upload.module.css'

const CATEGORIES = [
  { label: 'Diplôme',                  required: true  },
  { label: 'Relevé de notes',          required: true  },
  { label: 'Passeport / CIN',          required: true  },
  { label: 'Lettre de motivation',     required: false },
  { label: 'Lettre de recommandation', required: false },
  { label: 'Certificat de langue',     required: false },
]

const STATUT_STYLE = {
  'Validé':     { color: '#059669', bg: '#d1fae5' },
  'En attente': { color: '#d97706', bg: '#fef3c7' },
}

export default function UploadPage() {
  const { user } = useAuth()
  const [files, setFiles]         = useState([])
  const [dragging, setDragging]   = useState(false)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading]     = useState(true)
  const [selectedType, setSelectedType] = useState(CATEGORIES[0].label)
  const inputRef = useRef()

  useEffect(() => {
    if (!user?.id) return
    getDocumentsByEtudiant(user.id)
      .then(docs => setFiles(docs))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user?.id])

  const uploadedTypes = files.map(f => f.type)
  const categoriesWithStatus = CATEGORIES.map(c => ({
    ...c,
    done: uploadedTypes.includes(c.label),
  }))

  const doUpload = async (file) => {
    setUploading(true)
    try {
      const doc = await uploadDocument(user.id, selectedType, file)
      setFiles(prev => [...prev, doc])
    } catch {
      alert('Erreur lors de l\'upload. Réessayez.')
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false)
    if (e.dataTransfer.files[0]) doUpload(e.dataTransfer.files[0])
  }

  const onChange = (e) => {
    if (e.target.files[0]) doUpload(e.target.files[0])
    e.target.value = ''
  }

  const removeFile = async (file, i) => {
    try {
      await deleteDocument(file.id)
      setFiles(files.filter((_, j) => j !== i))
    } catch {
      alert('Erreur lors de la suppression.')
    }
  }

  const done     = categoriesWithStatus.filter(c => c.done).length
  const progress = Math.round((done / CATEGORIES.length) * 100)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Mes documents</h1>
          <p className={styles.sub}>Gérez et uploadez vos fichiers pour compléter votre dossier de candidature</p>
        </div>
        <div className={styles.progressBadge}>
          <svg width="54" height="54" viewBox="0 0 54 54">
            <circle cx="27" cy="27" r="22" fill="none" stroke="var(--mint)" strokeWidth="4" />
            <circle cx="27" cy="27" r="22" fill="none" stroke="var(--teal)" strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - progress / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 27 27)" />
            <text x="27" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--dark)">{progress}%</text>
          </svg>
          <div>
            <div className={styles.progressLabel}>Dossier complété</div>
            <div className={styles.progressSub}>{done} validés sur {CATEGORIES.length}</div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Documents requis</h2>
        <div className={styles.catGrid}>
          {categoriesWithStatus.map((c, i) => (
            <div key={i} className={`${styles.catItem} ${c.done ? styles.catDone : ''}`}>
              <div className={`${styles.catDot} ${c.done ? styles.catDotDone : ''}`}>
                {c.done ? <CheckCircle size={11} strokeWidth={2.5} /> : null}
              </div>
              <div>
                <span className={styles.catLabel}>{c.label}</span>
                {c.required && !c.done && <span className={styles.catRequired}>Requis</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Type selector */}
      <div className={styles.card} style={{ paddingBottom: '0.5rem' }}>
        <h2 className={styles.cardTitle} style={{ marginBottom: '0.8rem' }}>Type de document à uploader</h2>
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--mint)', fontSize: '0.9rem', color: 'var(--dark)' }}
        >
          {CATEGORIES.map(c => <option key={c.label}>{c.label}</option>)}
        </select>
      </div>

      <div
        className={`${styles.dropZone} ${dragging ? styles.dropZoneActive : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current.click()}
      >
        <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={onChange}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
        <div className={styles.dropIcon}>
          {uploading ? <Loader size={26} style={{ animation:'spin 1s linear infinite' }} /> : <Upload size={26} strokeWidth={1.6} />}
        </div>
        <div className={styles.dropTitle}>
          {uploading ? 'Upload en cours...' : 'Glissez vos fichiers ici'}
        </div>
        <div className={styles.dropHint}>
          ou <span>cliquez pour sélectionner</span> · PDF, JPG, PNG, DOC — Max 10 MB
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.listHeader}>
          <h2 className={styles.cardTitle}>Fichiers uploadés</h2>
          <div className={styles.fileCount}>{files.length} fichier{files.length !== 1 ? 's' : ''}</div>
        </div>

        {loading ? (
          <div style={{ display:'flex', justifyContent:'center', padding:'2rem' }}>
            <Loader size={24} style={{ animation:'spin 1s linear infinite' }} />
          </div>
        ) : files.length === 0 ? (
          <div className={styles.empty}>
            <AlertCircle size={32} color="var(--text-light)" />
            <p>Aucun fichier uploadé pour l'instant</p>
          </div>
        ) : (
          <div className={styles.fileList}>
            {files.map((f, i) => {
              const st = STATUT_STYLE['En attente']
              return (
                <div key={i} className={styles.fileRow} style={{ borderLeftColor: st.color }}>
                  <div className={styles.fileIconWrap}>
                    <FileText size={18} color="var(--teal)" strokeWidth={1.6} />
                  </div>
                  <div className={styles.fileInfo}>
                    <div className={styles.fileName}>{f.nom}</div>
                    <div className={styles.fileMeta}>{f.type}</div>
                  </div>
                  <span className={styles.fileStatus} style={{ color: st.color, background: st.bg }}>En attente</span>
                  <button onClick={() => removeFile(f, i)} className={styles.removeBtn} title="Supprimer">
                    <X size={15} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
