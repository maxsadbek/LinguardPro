import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Plus, Filter, Download } from 'lucide-react'
import { RoseButton } from '@/components/ui/rose-button'
import { AssignTaskModal } from '@/components/teacher/modals/AssignTaskModal'
import { GroupDetailsModal } from '@/components/teacher/modals/GroupDetailsModal'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/homework'
)({
  component: HomeworkPage,
})

function HomeworkPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [groupDetailsOpen, setGroupDetailsOpen] = useState(false)

  return (
    <div>
      <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 md:text-3xl'>
            Homework
          </h1>
          <p className='mt-1 text-sm text-gray-500 md:mt-2 md:text-base'>
            Create and manage homework assignments
          </p>
        </div>
        <RoseButton
          onClick={() => setModalOpen(true)}
          className='flex w-full items-center justify-center gap-2 sm:w-auto'
        >
          <Plus size={18} />
          Yangi vazifa
        </RoseButton>
      </div>

      <AssignTaskModal open={modalOpen} onOpenChange={setModalOpen} />
      <GroupDetailsModal
        open={groupDetailsOpen}
        onOpenChange={setGroupDetailsOpen}
      />

      {/* Filters */}
      <div className='mb-6 flex flex-wrap items-center gap-2 md:gap-4'>
        <button className='flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50'>
          <Filter size={16} />
          Filter
        </button>
        <button className='rounded-lg bg-[#fff0f3] px-4 py-2 text-sm font-semibold text-[#b80035]'>
          Barchasi
        </button>
        <button className='rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100'>
          Faol
        </button>
        <button className='rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100'>
          Tugatilgan
        </button>
        <button className='mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 sm:mt-0 sm:ml-auto sm:w-auto'>
          <Download size={16} />
          Eksport
        </button>
      </div>

      {/* Homework Cards */}
      <div className='grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2'>
        {[
          {
            title: 'Unit 5 Quiz',
            group: 'IELTS 7.5 Morning',
            due: '22-Aprel, 2026',
            submitted: 22,
            total: 25,
            status: 'active',
          },
          {
            title: 'Essay Writing',
            group: 'General English B2',
            due: '25-Aprel, 2026',
            submitted: 15,
            total: 22,
            status: 'active',
          },
          {
            title: 'Vocabulary Exercise',
            group: 'Kids Starter',
            due: '18-Aprel, 2026',
            submitted: 18,
            total: 18,
            status: 'completed',
          },
          {
            title: 'Grammar Practice',
            group: 'IELTS Intensive',
            due: '23-Aprel, 2026',
            submitted: 8,
            total: 20,
            status: 'active',
          },
        ].map((hw, index) => (
          <div
            key={index}
            className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'
          >
            <div className='mb-4 flex items-start justify-between'>
              <div className='rounded-xl bg-[#fff0f3] p-3 text-[#b80035]'>
                <BookOpen size={24} />
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  hw.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {hw.status === 'active' ? 'Faol' : 'Tugatilgan'}
              </span>
            </div>
            <h3 className='text-lg font-bold text-gray-800'>{hw.title}</h3>
            <p className='text-sm text-gray-500'>{hw.group}</p>
            <div className='mt-4 flex items-center justify-between text-sm text-gray-600'>
              <span>Muddat: {hw.due}</span>
              <span>
                {hw.submitted}/{hw.total} topshirildi
              </span>
            </div>
            <div className='mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200'>
              <div
                className='h-full bg-[#b80035]'
                style={{ width: `${(hw.submitted / hw.total) * 100}%` }}
              />
            </div>
            <RoseButton
              className='mt-4 w-full'
              roseVariant='outline'
              onClick={() => setGroupDetailsOpen(true)}
            >
              Batafsil
            </RoseButton>
          </div>
        ))}
      </div>
    </div>
  )
}
