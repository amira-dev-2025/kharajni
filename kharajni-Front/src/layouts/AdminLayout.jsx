import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  School,
  Users,
  UserCog,
  LogOut,
  GraduationCap
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'
import styles from './AdminLayout.module.css'

export default function AdminLayout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const links = [
    {
      to: '/admin',
      label: 'Dashboard',
      icon: <LayoutDashboard size={18} />
    },
    {
      to: '/admin/ecoles',
      label: 'Écoles',
      icon: <School size={18} />
    },
    {
      to: '/admin/etudiants',
      label: 'Étudiants',
      icon: <Users size={18} />
    },
    {
      to: '/admin/conseillers',
      label: 'Conseillers',
      icon: <UserCog size={18} />
    },
  ]

  return (
    <div className={styles.layout}>

      {/* SIDEBAR */}
      <aside className={styles.sidebar}>

        <div>

          {/* LOGO */}
          <Link to="/admin" className={styles.logo}>
            <div className={styles.logoIcon}>
              <GraduationCap
                size={20}
                color="#BEE3DB"
                strokeWidth={1.8}
              />
            </div>

            <div className={styles.logoText}>
              <span className={styles.logoName}>
                Kharajni
              </span>

              <span className={styles.logoTagline}>
                Admin Panel
              </span>
            </div>
          </Link>

          {/* NAV */}
          <nav className={styles.nav}>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`${styles.link} ${
                  location.pathname === link.to
                    ? styles.linkActive
                    : ''
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* BOTTOM */}
        <div className={styles.bottom}>

          <div className={styles.userBox}>
            <div className={styles.avatar}>
              {user?.prenom?.[0]}
              {user?.nom?.[0]}
            </div>

            <div>
              <div className={styles.userName}>
                {user?.prenom} {user?.nom}
              </div>

              <div className={styles.userRole}>
                Administrateur
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className={styles.logout}
          >
            <LogOut size={18} />
            Déconnexion
          </button>

        </div>
      </aside>

      {/* CONTENT */}
      <main className={styles.content}>
        <Outlet />
      </main>

    </div>
  )
}