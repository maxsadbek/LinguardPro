import { createFileRoute } from '@tanstack/react-router'
import { Bell, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/notifications'
)({
  component: NotificationsPage,
})

function NotificationsPage() {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Notifications</h1>
        <p className='mt-2 text-gray-500'>Updates and reminders for your classes</p>
      </div>

      <div className='space-y-4'>
        {[
          {
            title: 'Homework deadline tomorrow',
            body: 'IELTS Intensive: Writing Task 1 submission closes at 9:00 PM.',
            time: '10m ago',
          },
          {
            title: 'New message received',
            body: 'A student sent you a message in Messages.',
            time: '1h ago',
          },
          {
            title: 'Attendance reminder',
            body: 'Don\'t forget to mark attendance for today\'s lesson.',
            time: '3h ago',
          },
        ].map((n, idx) => (
          <div
            key={idx}
            className='flex items-start justify-between gap-4 rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'
          >
            <div className='flex items-start gap-4'>
              <div className='rounded-xl bg-[#fff0f3] p-3 text-[#b80035]'>
                <Bell size={22} />
              </div>
              <div>
                <p className='text-sm font-bold text-gray-800'>{n.title}</p>
                <p className='mt-1 text-sm text-gray-600'>{n.body}</p>
                <p className='mt-2 text-xs text-gray-400'>{n.time}</p>
              </div>
            </div>

            <button className='inline-flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100'>
              <CheckCircle2 size={16} />
              Mark read
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
