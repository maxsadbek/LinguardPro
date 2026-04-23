import { createFileRoute } from '@tanstack/react-router'
import { Bell, Lock, Palette, Settings } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/teacher-dashboard/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Settings</h1>
        <p className='mt-2 text-gray-500'>Manage your teacher portal preferences</p>
      </div>

      <div className='grid gap-4'>
        {[
          {
            title: 'Notifications',
            desc: 'Control reminders and message alerts',
            icon: Bell,
          },
          {
            title: 'Privacy',
            desc: 'Manage profile visibility and permissions',
            icon: Lock,
          },
          {
            title: 'Appearance',
            desc: 'Theme and interface preferences',
            icon: Palette,
          },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className='flex items-center justify-between rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'
            >
              <div className='flex items-center gap-4'>
                <div className='rounded-xl bg-[#fff0f3] p-3 text-[#b80035]'>
                  <Icon size={22} />
                </div>
                <div>
                  <p className='text-sm font-bold text-gray-800'>{item.title}</p>
                  <p className='mt-1 text-sm text-gray-600'>{item.desc}</p>
                </div>
              </div>

              <button className='inline-flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100'>
                <Settings size={16} />
                Configure
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
