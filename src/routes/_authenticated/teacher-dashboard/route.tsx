import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BarChart3,
  BookOpen,
  MessageSquare,
  Megaphone,
  User,
  Search,
  Bell,
  Settings,
  LogOut,
  Plus,
} from 'lucide-react'

interface User {
  name: string
  email: string
  role: string
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher-dashboard' },
  { name: 'Groups', icon: Users, path: '/teacher-dashboard/groups' },
  { name: 'Attendance', icon: ClipboardCheck, path: '/teacher-dashboard/attendance' },
  { name: 'Results', icon: BarChart3, path: '/teacher-dashboard/results' },
  { name: 'Homework', icon: BookOpen, path: '/teacher-dashboard/homework' },
  { name: 'Messages', icon: MessageSquare, path: '/teacher-dashboard/messages' },
  { name: 'Announcements', icon: Megaphone, path: '/teacher-dashboard/announcements' },
  { name: 'Profile', icon: User, path: '/teacher-dashboard/profile' },
]

function TeacherSidebar() {
  const location = window.location.pathname

  const handleLogout = () => {
    sessionStorage.clear()
    window.location.href = '/login'
  }

  return (
    <aside className='fixed top-0 left-0 flex h-screen w-56 flex-col bg-[#f2f4f6] px-4 py-6'>
      {/* Logo */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold tracking-tight text-[#b80035]'>
          LINGUAPRO
        </h1>
        <p className='mt-1 text-xs font-medium text-gray-500'>TEACHER PORTAL</p>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1'>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location === item.path
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? 'bg-white font-bold text-[#b80035] shadow-sm'
                  : 'text-gray-600 hover:bg-[#fff0f3] hover:text-[#b80035]'
              }`}
            >
              <Icon size={20} />
              <span className='text-sm'>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className='flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition-all duration-200 hover:bg-[#fff0f3] hover:text-[#b80035]'
      >
        <LogOut size={20} />
        <span className='text-sm'>Logout</span>
      </button>

      {/* New Class Session Button */}
      <button className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b80035] to-[#e11d48] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl'>
        <Plus size={18} />
        New Class Session
      </button>
    </aside>
  )
}

function TeacherHeader({ user }: { user: User | null }) {
  return (
    <header className='ml-56 flex items-center justify-between bg-white px-8 py-4 shadow-sm'>
      {/* Search Bar */}
      <div className='relative w-96'>
        <Search
          className='absolute top-1/2 left-4 -translate-y-1/2 text-gray-400'
          size={20}
        />
        <input
          type='text'
          placeholder='Search...'
          className='w-full rounded-xl bg-[#f7f9fb] py-3 pr-4 pl-12 text-sm focus:ring-2 focus:ring-[#b80035]/20 focus:outline-none'
        />
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-6'>
        <button className='relative text-gray-600 transition-colors hover:text-[#b80035]'>
          <Bell size={22} />
          <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b80035] text-xs text-white'>
            3
          </span>
        </button>
        <button className='text-gray-600 transition-colors hover:text-[#b80035]'>
          <Settings size={22} />
        </button>
        <div className='flex items-center gap-3 border-l border-gray-200 pl-6'>
          <div className='text-right'>
            <p className='text-sm font-semibold text-gray-800'>
              {user?.name || 'Elena'}
            </p>
            <p className='text-xs text-gray-500'>
              {user?.email || 'elena@linguapro.com'}
            </p>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#b80035] to-[#e11d48] font-semibold text-white'>
            {user?.name?.charAt(0) || 'E'}
          </div>
        </div>
      </div>
    </header>
  )
}

export const Route = createFileRoute('/_authenticated/teacher-dashboard')({
  component: TeacherDashboardLayout,
})

function TeacherDashboardLayout() {
  const [user] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const raw = sessionStorage.getItem('linguapro_user')
    if (!raw) return null
    try {
      const parsedUser = JSON.parse(raw)
      return parsedUser.role === 'teacher' ? parsedUser : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'
    }
  }, [user])

  if (!user) {
    return null
  }

  return (
    <div className='min-h-screen bg-[#f7f9fb]'>
      <TeacherSidebar />
      <TeacherHeader user={user} />
      <main className='ml-56 p-8'>
        <Outlet />
      </main>
    </div>
  )
}
