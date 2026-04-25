import { useState } from 'react'
import { X, Calendar, FileUp, Send } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type AssignTaskModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const GROUPS = ['IELTS Intensive', 'General English B2', 'Kids Starter']

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[11px] font-extrabold tracking-[0.14em] text-rose-700 uppercase'>
      {children}
    </p>
  )
}

export function AssignTaskModal({ open, onOpenChange }: AssignTaskModalProps) {
  const [title, setTitle] = useState('')
  const [group, setGroup] = useState('IELTS Intensive')
  const [deadline, setDeadline] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const fileLabel =
    files.length === 0
      ? 'Fayllarni shu yerga tashlang'
      : files.length === 1
        ? files[0].name
        : `${files.length} ta fayl tanlandi`

  const handleFiles = (next: FileList | null) => {
    if (!next) return
    setFiles(Array.from(next))
  }

  const handleClose = () => {
    onOpenChange(false)
    setTitle('')
    setGroup('IELTS Intensive')
    setDeadline('')
    setDescription('')
    setFiles([])
  }

  const handleSubmit = () => {
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[720px] w-[95vw] max-h-[85vh] overflow-y-auto gap-0 rounded-[28px] border-0 bg-white p-0 shadow-[0_30px_90px_-50px_rgba(2,6,23,0.45)] [&>button.absolute]:hidden'>
        <div className='flex items-start justify-between px-6 pt-5 md:px-8 md:pt-6'>
          <div>
            <h2 className='text-xl font-extrabold text-slate-900'>
              Yangi vazifa qo'shish
            </h2>
            <p className='mt-1 text-sm text-slate-500'>
              O'quvchilar uchun yangi topshiriq yarating
            </p>
          </div>
          <button
            type='button'
            onClick={handleClose}
            className='grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200'
          >
            <X size={18} />
          </button>
        </div>

        <div className='px-6 pt-3 pb-4 md:px-8 md:pt-4 md:pb-6'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <FieldLabel>VAZIFA NOMI</FieldLabel>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Masalan: Unit 5 Vocabulary Practice'
                className='h-11 rounded-xl border-0 bg-slate-100 px-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-rose-600/20'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <FieldLabel>GURUHNI TANLANG</FieldLabel>
                <Select value={group} onValueChange={setGroup}>
                  <SelectTrigger className='h-11 rounded-xl border-0 bg-slate-100 px-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-rose-600/20'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GROUPS.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2'>
                <FieldLabel>MUDDAT</FieldLabel>
                <div className='relative'>
                  <input
                    type='text'
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder='mm/dd/yyyy, --:-- --'
                    className='h-11 w-full rounded-xl border-0 bg-slate-100 px-4 pr-10 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-rose-600/20'
                  />
                  <Calendar
                    size={16}
                    className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400'
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <FieldLabel>TAVSIF</FieldLabel>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Vazifa bo'yicha ko'rsatmalarni shu yerda yozing..."
                rows={3}
                className='min-h-[88px] resize-none rounded-xl border-0 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-rose-600/20'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <FieldLabel>FAYL BIRIKTIRISH</FieldLabel>
              <label className='mt-1 block cursor-pointer rounded-2xl border border-dashed border-rose-200 bg-white px-6 py-5 text-center hover:bg-rose-50/30'>
                <input
                  type='file'
                  className='hidden'
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <div className='mx-auto mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-rose-100 text-rose-700'>
                  <FileUp size={16} />
                </div>
                <p className='text-sm font-bold text-slate-800'>{fileLabel}</p>
                <p className='mt-1 text-xs text-slate-500'>
                  yoki kompyuterdan tanlang (PDF, DOCX, JPG - Max 10MB)
                </p>
              </label>
            </div>
          </div>
        </div>

        <div className='flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 px-6 pb-5 md:px-8 md:pb-6'>
          <button
            type='button'
            onClick={handleClose}
            className='h-11 rounded-full bg-slate-100 px-6 text-sm font-bold text-slate-600 hover:bg-slate-200'
          >
            Bekor qilish
          </button>
          <button
            type='button'
            onClick={handleSubmit}
            className='primary-gradient inline-flex h-11 items-center gap-2 rounded-full px-7 text-sm font-bold text-white shadow-lg shadow-rose-900/15'
          >
            <Send size={16} />
            Vazifani yuborish
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}