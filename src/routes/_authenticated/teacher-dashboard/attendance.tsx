import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Calendar, Check, ChevronDown, Loader2, Search } from 'lucide-react'
import { Calendar as CalendarPicker } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RoseButton } from '@/components/ui/rose-button'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/attendance'
)({
  component: AttendancePage,
})

type AttendanceStatus = 'present' | 'absent' | 'excused'

type AttendanceStudent = {
  id: string
  name: string
  status: AttendanceStatus
  note: string
}

type Group = {
  id: string
  name: string
  students: number
}

const groups: Group[] = [
  { id: '1', name: 'Spanish Group A', students: 25 },
  { id: '2', name: 'Spanish Group B', students: 22 },
  { id: '3', name: 'French Group A', students: 20 },
]

const initialStudents: AttendanceStudent[] = [
  { id: '01', name: 'Abduraxmonov Ibrohim', status: 'present', note: '' },
  {
    id: '02',
    name: 'Tursunova Malika',
    status: 'absent',
    note: 'Shaxsiy sabablar',
  },
  {
    id: '03',
    name: 'Karimov Sardor',
    status: 'excused',
    note: "Shifokor ko'rigi",
  },
  { id: '04', name: 'Azimova Sevinch', status: 'present', note: '' },
]

function formatDate(value: Date) {
  const mm = String(value.getMonth() + 1).padStart(2, '0')
  const dd = String(value.getDate()).padStart(2, '0')
  const yyyy = value.getFullYear()
  return `${mm}/${dd}/${yyyy}`
}

function toISODate(value: Date) {
  const yyyy = value.getFullYear()
  const mm = String(value.getMonth() + 1).padStart(2, '0')
  const dd = String(value.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function computeStats(list: AttendanceStudent[]) {
  const total = list.length
  const present = list.filter((s) => s.status === 'present').length
  const absent = list.filter((s) => s.status === 'absent').length
  const excused = list.filter((s) => s.status === 'excused').length
  const overall = total === 0 ? 0 : Math.round((present / total) * 100)
  return { total, present, absent, excused, overall }
}

function AttendancePage() {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0].id)
  const [groupOpen, setGroupOpen] = useState(false)
  const selectedGroup = useMemo(
    () => groups.find((g) => g.id === selectedGroupId) ?? groups[0],
    [selectedGroupId]
  )

  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>(
    'idle'
  )
  const [date, setDate] = useState<Date>(() => new Date())
  const [students, setStudents] = useState<AttendanceStudent[]>(initialStudents)
  const [searchQuery, setSearchQuery] = useState('')

  // Stats faqat "Davomatni saqlash" bosilganda yangilanadi
  const [stats, setStats] = useState(() => computeStats(initialStudents))

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return students
    return students.filter((s) => s.name.toLowerCase().includes(q))
  }, [searchQuery, students])

  const setStudentStatus = (id: string, status: AttendanceStatus) =>
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))

  const setStudentNote = (id: string, note: string) =>
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, note } : s)))

  const handleSave = () => {
    if (saveState === 'saving') return
    setSaveState('saving')
    window.setTimeout(() => {
      setStats(computeStats(students))
      setSaveState('saved')
      window.setTimeout(() => setSaveState('idle'), 1300)
    }, 700)
  }

  // Circular chart
  const radius = 54
  const stroke = 12
  const circumference = 2 * Math.PI * radius
  const offset =
    circumference -
    (Math.max(0, Math.min(100, stats.overall)) / 100) * circumference

  return (
    <div className='space-y-5 p-6'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-extrabold text-slate-900'>
            Attendance Management
          </h1>
          <p className='mt-0.5 text-sm text-slate-500'>
            Monitor student attendance by groups
          </p>
        </div>

        <div className='relative w-full md:w-72'>
          <Search
            className='absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400'
            size={16}
          />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search...'
            className='h-10 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-800 transition outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-500/20'
          />
        </div>
      </div>

      {/* Top cards */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]'>
        {/* Stats card */}
        <div className='rounded-2xl border border-slate-100 bg-white p-7 shadow-sm'>
          <div className='flex items-center gap-10'>
            {/* Donut chart — p-2 qo'shimcha padding */}
            <div className='relative flex-shrink-0 p-2'>
              <svg
                width='148'
                height='148'
                viewBox='0 0 148 148'
                className='-rotate-90'
              >
                <circle
                  cx='74'
                  cy='74'
                  r={radius}
                  fill='none'
                  stroke='rgb(255 228 230)'
                  strokeWidth={stroke}
                />
                <circle
                  cx='74'
                  cy='74'
                  r={radius}
                  fill='none'
                  stroke='rgb(225 29 72)'
                  strokeWidth={stroke}
                  strokeLinecap='round'
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className='transition-all duration-500'
                />
              </svg>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className='text-3xl font-black text-slate-900'>
                  {stats.overall}%
                </span>
                <span className='text-[10px] font-bold tracking-widest text-slate-400'>
                  OVERALL
                </span>
              </div>
            </div>

            {/* Stat numbers */}
            <div className='grid flex-1 grid-cols-2 gap-x-10 gap-y-6'>
              {[
                {
                  label: 'PRESENT TODAY',
                  value: stats.present,
                  color: 'text-emerald-600',
                },
                {
                  label: 'ABSENT TODAY',
                  value: stats.absent,
                  color: 'text-rose-600',
                },
                {
                  label: 'EXCUSED',
                  value: stats.excused,
                  color: 'text-slate-700',
                },
                {
                  label: 'TOTAL GROUPS',
                  value: groups.length,
                  color: 'text-slate-700',
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className='text-[10px] leading-tight font-bold tracking-wider text-slate-400'>
                    {item.label}
                  </p>
                  <p className={`mt-1 text-3xl font-black ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight card */}
        <div className='rounded-2xl bg-gradient-to-br from-rose-600 to-rose-800 p-5 text-white shadow-sm'>
          <span className='inline-block rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-bold tracking-widest'>
            AI INSIGHT
          </span>
          <h3 className='mt-3 text-xl leading-snug font-black'>
            Attendance drops significantly on Mondays.
          </h3>
          <p className='mt-2 text-sm leading-relaxed text-white/80'>
            Analysis of the last 4 weeks shows that in the IELTS 7.5 group, 15%
            more classes are missed on Mondays.
          </p>
          <button
            type='button'
            className='mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-50'
          >
            View Report →
          </button>
        </div>
      </div>

      {/* Filters + Save */}
      <div className='rounded-2xl border border-slate-100 bg-white p-4 shadow-sm'>
        <div className='flex flex-col gap-3 md:flex-row md:items-end md:gap-4'>
          {/* Group select — custom dropdown */}
          <div className='flex-1'>
            <label className='mb-1.5 block text-[11px] font-bold tracking-widest text-slate-400'>
              SELECT GROUP
            </label>
            <div className='relative'>
              <button
                type='button'
                onClick={() => setGroupOpen((v) => !v)}
                className='flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:outline-none'
              >
                <span>{selectedGroup.name}</span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${
                    groupOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {groupOpen && (
                <div className='absolute top-[calc(100%+4px)] right-0 left-0 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg'>
                  {groups.map((g) => (
                    <button
                      key={g.id}
                      type='button'
                      onClick={() => {
                        setSelectedGroupId(g.id)
                        setGroupOpen(false)
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 ${
                        g.id === selectedGroupId
                          ? 'text-rose-600'
                          : 'text-slate-700'
                      }`}
                    >
                      <span>{g.name}</span>
                      <span className='text-xs text-slate-400'>
                        {g.students} students
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date picker */}
          <div className='flex-1'>
            <label className='mb-1.5 block text-[11px] font-bold tracking-widest text-slate-400'>
              DATE
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type='button'
                  className='flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:outline-none'
                >
                  <span className='flex items-center gap-2'>
                    <Calendar size={15} className='text-slate-400' />
                    {formatDate(date)}
                  </span>
                  <ChevronDown size={16} className='text-slate-400' />
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <CalendarPicker
                  mode='single'
                  selected={date}
                  onSelect={(next) => {
                    if (next) setDate(next)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Save button */}
          <RoseButton
            onClick={handleSave}
            roseVariant='solid'
            className='h-10 rounded-xl px-6 whitespace-nowrap'
          >
            {saveState === 'saving' ? (
              <span className='flex items-center gap-2'>
                <Loader2 size={15} className='animate-spin' />
                Saving...
              </span>
            ) : saveState === 'saved' ? (
              <span className='flex items-center gap-2'>
                <Check size={15} />
                Saved
              </span>
            ) : (
              'Save Attendance'
            )}
          </RoseButton>
        </div>
      </div>

      {/* Students table */}
      <div className='overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm'>
        <div className='flex items-center justify-between border-b border-slate-100 px-5 py-4'>
          <div>
            <h2 className='text-base font-extrabold text-slate-900'>
              Student List
            </h2>
            <p className='mt-0.5 text-sm text-slate-500'>
              Total: {stats.total} students • {selectedGroup.name}
            </p>
          </div>
          <span className='hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 md:flex'>
            <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
            All present
          </span>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full min-w-[780px]'>
            <thead>
              <tr className='border-b border-slate-100 bg-slate-50'>
                {['#', 'STUDENT NAME', 'ATTENDANCE', 'NOTE'].map((h) => (
                  <th
                    key={h}
                    className='px-5 py-3 text-left text-[10px] font-bold tracking-widest text-slate-400'
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, idx) => (
                <tr
                  key={s.id}
                  className={`border-b border-slate-50 transition hover:bg-slate-50/60 ${
                    idx === filteredStudents.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className='w-12 px-5 py-3.5 text-sm font-bold text-slate-400'>
                    {s.id}
                  </td>

                  <td className='px-5 py-3.5'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-600'>
                        {getInitials(s.name)}
                      </div>
                      <div>
                        <p className='text-sm font-bold text-slate-900'>
                          {s.name}
                        </p>
                        <p className='text-xs text-slate-400'>
                          ID: LP-{toISODate(date).replace(/-/g, '')}-{s.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className='px-5 py-3.5'>
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => setStudentStatus(s.id, 'present')}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          s.status === 'present'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            s.status === 'present'
                              ? 'bg-emerald-500'
                              : 'bg-slate-300'
                          }`}
                        />
                        PRESENT
                      </button>

                      <button
                        type='button'
                        onClick={() => setStudentStatus(s.id, 'absent')}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          s.status === 'absent'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            s.status === 'absent'
                              ? 'bg-rose-500'
                              : 'bg-slate-300'
                          }`}
                        />
                        ABSENT
                      </button>

                      <button
                        type='button'
                        onClick={() => setStudentStatus(s.id, 'excused')}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          s.status === 'excused'
                            ? 'bg-slate-800 text-white'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            s.status === 'excused' ? 'bg-white' : 'bg-slate-300'
                          }`}
                        />
                        EXCUSED
                      </button>
                    </div>
                  </td>

                  <td className='px-5 py-3.5'>
                    <input
                      value={s.note}
                      onChange={(e) => setStudentNote(s.id, e.target.value)}
                      placeholder='Add note...'
                      disabled={s.status !== 'excused'}
                      className={`h-9 w-full rounded-lg px-3 text-sm transition outline-none ${
                        s.status !== 'excused'
                          ? 'cursor-not-allowed bg-slate-50 text-slate-300 placeholder:text-slate-300'
                          : 'bg-slate-100 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500/20'
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
