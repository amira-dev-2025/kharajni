import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { AuthProvider, useAuth } from './context/AuthContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Apply from './pages/Apply'
import Upload from './pages/Upload'
import AdminDashboard from './pages/AdminDashboard'

import AdminLayout from './layouts/AdminLayout'

import AdminEcoles from './pages/AdminEcoles'
import AdminEtudiants from './pages/AdminEtudiants'
import AdminConseillers from './pages/AdminConseillers'

function ProtectedRoute({ children }) {
  const { user } = useAuth()

  return user ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function LayoutWrapper({ children }) {
  const location = useLocation()

  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdminPage && <Navbar />}

      <main style={{ flex: 1 }}>
        {children}
      </main>

      {!isAdminPage && <Footer />}
    </div>
  )
}

function AppRoutes() {
  return (
    <LayoutWrapper>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply"
          element={
            <ProtectedRoute>
              <Apply />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="ecoles" element={<AdminEcoles />} />
          <Route path="etudiants" element={<AdminEtudiants />} />
          <Route path="conseillers" element={<AdminConseillers />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </LayoutWrapper>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}