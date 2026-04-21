import { createFileRoute } from '@tanstack/react-router'
import { User, Mail, Phone, MapPin, Calendar, Edit, Save } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/teacher-dashboard/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Profile</h1>
        <p className='mt-2 text-gray-500'>Manage your account settings and information</p>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        {/* Profile Card */}
        <div className='col-span-1'>
          <div className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#b80035] to-[#e11d48] text-3xl font-bold text-white'>
                E
              </div>
              <h2 className='text-xl font-bold text-gray-800'>Elena Rodriguez</h2>
              <p className='text-sm text-gray-500'>Spanish Teacher</p>
              <div className='mt-4 flex gap-2'>
                <span className='rounded-full bg-[#fff0f3] px-3 py-1 text-xs font-semibold text-[#b80035]'>
                  Intermediate
                </span>
                <span className='rounded-full bg-[#fff0f3] px-3 py-1 text-xs font-semibold text-[#b80035]'>
                  Advanced
                </span>
              </div>
              <button className='mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50'>
                <Edit size={16} />
                Edit Photo
              </button>
            </div>

            <div className='mt-6 space-y-4 border-t border-gray-200 pt-6'>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <Mail size={18} className='text-gray-400' />
                <span>elena@linguapro.com</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <Phone size={18} className='text-gray-400' />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <MapPin size={18} className='text-gray-400' />
                <span>New York, USA</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <Calendar size={18} className='text-gray-400' />
                <span>Joined March 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className='col-span-2 space-y-6'>
          <div className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
            <h3 className='mb-6 text-lg font-bold text-gray-800'>Personal Information</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>First Name</label>
                <input
                  type='text'
                  defaultValue='Elena'
                  className='w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#b80035]/20 focus:outline-none'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>Last Name</label>
                <input
                  type='text'
                  defaultValue='Rodriguez'
                  className='w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#b80035]/20 focus:outline-none'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>Email</label>
                <input
                  type='email'
                  defaultValue='elena@linguapro.com'
                  className='w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#b80035]/20 focus:outline-none'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>Phone</label>
                <input
                  type='tel'
                  defaultValue='+1 (555) 123-4567'
                  className='w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#b80035]/20 focus:outline-none'
                />
              </div>
              <div className='col-span-2'>
                <label className='mb-2 block text-sm font-medium text-gray-700'>Bio</label>
                <textarea
                  defaultValue='Experienced Spanish teacher with 5+ years of teaching experience. Passionate about making language learning engaging and accessible for all students.'
                  rows={4}
                  className='w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#b80035]/20 focus:outline-none'
                />
              </div>
            </div>
            <div className='mt-6 flex justify-end'>
              <button className='flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#b80035] to-[#e11d48] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl'>
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>

          <div className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
            <h3 className='mb-6 text-lg font-bold text-gray-800'>Notification Settings</h3>
            <div className='space-y-4'>
              {[
                { label: 'Email notifications for new messages', checked: true },
                { label: 'Email notifications for homework submissions', checked: true },
                { label: 'Email notifications for announcements', checked: false },
                { label: 'Push notifications', checked: true },
              ].map((setting, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <span className='text-sm text-gray-700'>{setting.label}</span>
                  <button
                    className={`h-6 w-11 rounded-full transition-colors ${
                      setting.checked ? 'bg-[#b80035]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-full bg-white transition-transform ${
                        setting.checked ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
