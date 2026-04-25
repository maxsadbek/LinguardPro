import { createFileRoute, redirect } from '@tanstack/react-router'
import Dashboard from '@/features/dashboard'

export const Route = createFileRoute('/_authenticated/admin-dashboard')({
  beforeLoad: () => {
    if (typeof window === 'undefined') return
    const raw = sessionStorage.getItem('linguapro_user')
    if (!raw) {
      throw redirect({ to: '/sign-in' })
    }
    try {
      const user = JSON.parse(raw) as { role?: string }
      if (!user.role) {
        throw redirect({ to: '/sign-in' })
      }
      if (user.role !== 'admin') {
        throw redirect({ to: '/teacher-dashboard' })
      }
    } catch {
      throw redirect({ to: '/sign-in' })
    }
  },
  component: AdminDashboardLayout,
})

function AdminDashboardLayout() {
  return <Dashboard />
}
