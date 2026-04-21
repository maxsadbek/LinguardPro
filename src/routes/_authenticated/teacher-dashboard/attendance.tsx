import { createFileRoute } from '@tanstack/react-router'
import { Calendar, Check, X, Clock } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/teacher-dashboard/attendance')({
  component: AttendancePage,
})

function AttendancePage() {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Attendance</h1>
        <p className='mt-2 text-gray-500'>Track and manage student attendance</p>
      </div>

      {/* Date Selector */}
      <div className='mb-6 rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
        <div className='flex items-center gap-4'>
          <button className='rounded-lg bg-[#fff0f3] px-4 py-2 text-sm font-semibold text-[#b80035]'>
            Today
          </button>
          <button className='rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100'>
            This Week
          </button>
          <button className='rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100'>
            This Month
          </button>
          <div className='ml-auto flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2'>
            <Calendar size={18} className='text-gray-500' />
            <span className='text-sm font-medium text-gray-700'>April 21, 2026</span>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
        <div className='mb-6'>
          <h2 className='text-lg font-bold text-gray-800'>Spanish Group A</h2>
          <p className='text-sm text-gray-500'>25 students</p>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='pb-4 text-left text-sm font-semibold text-gray-600'>Student</th>
              <th className='pb-4 text-left text-sm font-semibold text-gray-600'>Status</th>
              <th className='pb-4 text-left text-sm font-semibold text-gray-600'>Time</th>
              <th className='pb-4 text-left text-sm font-semibold text-gray-600'>Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Marc Lawson', status: 'present', time: '09:02 AM' },
              { name: 'Sarah Kim', status: 'present', time: '09:05 AM' },
              { name: 'Javier Delgado', status: 'late', time: '09:15 AM' },
              { name: 'Emily Chen', status: 'absent', time: '-' },
              { name: 'Michael Brown', status: 'present', time: '09:01 AM' },
            ].map((student, index) => (
              <tr key={index} className='border-b border-gray-100 last:border-0'>
                <td className='py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white'>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className='font-medium text-gray-800'>{student.name}</span>
                  </div>
                </td>
                <td className='py-4'>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      student.status === 'present'
                        ? 'bg-green-100 text-green-700'
                        : student.status === 'late'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {student.status === 'present' && <Check size={12} />}
                    {student.status === 'late' && <Clock size={12} />}
                    {student.status === 'absent' && <X size={12} />}
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </td>
                <td className='py-4 text-sm text-gray-600'>{student.time}</td>
                <td className='py-4'>
                  <button className='text-sm font-semibold text-[#b80035] hover:underline'>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
