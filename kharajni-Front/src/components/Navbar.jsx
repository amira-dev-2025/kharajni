import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GraduationCap, Menu, X, LogOut, ChevronDown } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  if (location.pathname.startsWith('/admin')) {
  return null
}

  const navLinks =
  user?.role === 'etudiant'
    ? [
        { to: '/dashboard', label: 'Tableau de bord' },
        { to: '/apply', label: 'Postuler' },
        { to: '/upload', label: 'Documents' },
      ]
    : []

  const initials = user
    ? `${user.prenom?.[0] ?? ''}${user.nom?.[0] ?? ''}`.toUpperCase() || user.email?.[0]?.toUpperCase()
    : ''

  const handleLogout = () => {
    logout()
    navigate('/')
    setDropOpen(false)
    setMobileOpen(false)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link
  to={
    user
      ? user.role === 'admin'
        ? '/admin'
        : '/dashboard'
      : '/'
  }
  className={styles.logo}
>
          <div className={styles.logoIcon}>
            <GraduationCap size={20} color="#BEE3DB" strokeWidth={1.8} />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Kharajni</span>
            <span className={styles.logoTagline}>Staying Ahead, Studying Abroad</span>
          </div>
        </Link>

        {/* Desktop links */}
        {user && (
          <div className={styles.links}>
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`${styles.link} ${location.pathname === l.to ? styles.linkActive : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop auth */}
        <div className={styles.auth}>
          {user ? (
            <div className={styles.userMenu} onMouseLeave={() => setDropOpen(false)}>
              <button
                className={styles.userBtn}
                onClick={() => setDropOpen(!dropOpen)}
              >
                <div className={styles.avatar}>{initials}</div>
                <span className={styles.userName}>{user.prenom || user.email}</span>
                <ChevronDown size={15} style={{ transition: 'transform .2s', transform: dropOpen ? 'rotate(180deg)' : '' }} />
              </button>
              {dropOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropHeader}>
                    <div className={styles.dropName}>{user.prenom} {user.nom}</div>
                    <div className={styles.dropRole}>{user.role === 'etudiant' ? 'Étudiant' : user.role === 'conseiller' ? 'Conseiller' : 'Administrateur'}</div>
                  </div>
                  <button onClick={handleLogout} className={styles.dropItem}>
                    <LogOut size={15} /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login"    className={styles.btnGhost}>Connexion</Link>
              <Link to="/register" className={styles.btnPrimary}>Créer un compte</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobile}>
          {user && navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className={styles.mobileLogout}>
              <LogOut size={15} /> Déconnexion
            </button>
          ) : (
            <div className={styles.mobileAuth}>
              <Link to="/login"    onClick={() => setMobileOpen(false)} className={styles.btnGhost}>Connexion</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className={styles.btnPrimary}>Créer un compte</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
