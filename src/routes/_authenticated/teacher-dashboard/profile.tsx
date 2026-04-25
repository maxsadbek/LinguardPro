import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { createFileRoute } from '@tanstack/react-router'
import { Mail, Phone, MapPin, Calendar, Save, Camera } from 'lucide-react'
import { RoseButton } from '@/components/ui/rose-button'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/profile'
)({
  component: ProfilePage,
})

type ProfileForm = {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio: string
}

type DisplayData = Pick<
  ProfileForm,
  'firstName' | 'lastName' | 'email' | 'phone'
>

const DEFAULT_PROFILE: ProfileForm = {
  firstName: 'Elena',
  lastName: 'Rodriguez',
  email: 'elena@linguapro.com',
  phone: '+998 90 123 45 67',
  bio: 'Experienced Spanish teacher with 5+ years of teaching experience.',
}

const NOTIFICATION_SETTINGS = [
  { label: 'Email notifications for new messages', checked: true },
  { label: 'Email notifications for homework submissions', checked: true },
  { label: 'Email notifications for announcements', checked: false },
  { label: 'Push notifications', checked: true },
]

const PHONE_REGEX = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/

const formatPhone = (value: string) => {
  if (!value) return ''

  // Faqat raqamlarni oladi va maksimal 12 ta raqam qoldiradi (+998 va qolgan 9 ta raqam)
  const digits = value.replace(/\D/g, '').slice(0, 12)
  if (!digits) return ''

  if (digits.length <= 3) return `+${digits}`
  if (digits.length <= 5) return `+${digits.slice(0, 3)} ${digits.slice(3)}`
  if (digits.length <= 8)
    return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`
  if (digits.length <= 10)
    return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`

  return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`
}

const inputClassName =
  'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-600/15'

function InfoRow({
  icon: Icon,
  value,
}: {
  icon: React.ElementType
  value: string
}) {
  return (
    <div className='flex items-center gap-3 text-sm text-gray-600'>
      <Icon size={16} className='shrink-0 text-gray-400' />
      <span className='truncate'>{value}</span>
    </div>
  )
}

function ToggleSwitch({ checked }: { checked: boolean }) {
  return (
    <button
      type='button'
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-[#b80035]' : 'bg-gray-200'}`}
    >
      <div
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
      />
    </button>
  )
}

function FormField({
  label,
  error,
  children,
  className,
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
        {label}
      </label>
      {children}
      {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
    </div>
  )
}

function ProfilePage() {
  const [photo, setPhoto] = useState<string | null>(null)
  const [displayData, setDisplayData] = useState<DisplayData>({
    firstName: DEFAULT_PROFILE.firstName,
    lastName: DEFAULT_PROFILE.lastName,
    email: DEFAULT_PROFILE.email,
    phone: DEFAULT_PROFILE.phone,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: DEFAULT_PROFILE,
    mode: 'onBlur',
  })

  const {
    ref: phoneRef,
    onChange: phoneOnChange,
    ...phoneRest
  } = register('phone', {
    pattern: {
      value: PHONE_REGEX,
      message: "To'g'ri format: +998 XX XXX XX XX",
    },
  })

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const savedPhoto = localStorage.getItem('teacherProfilePhoto')
      if (savedPhoto) setPhoto(savedPhoto)

      const savedProfile = localStorage.getItem('teacherProfileData')
      if (!savedProfile) return

      try {
        const data: Partial<ProfileForm> = JSON.parse(savedProfile)
        const merged = { ...DEFAULT_PROFILE, ...data }
        Object.entries(merged).forEach(([key, val]) =>
          setValue(key as keyof ProfileForm, val)
        )
        setDisplayData({
          firstName: merged.firstName,
          lastName: merged.lastName,
          email: merged.email,
          phone: merged.phone,
        })
      } catch {}
    }

    loadFromLocalStorage()
    window.addEventListener('profileDataUpdated', loadFromLocalStorage)
    return () =>
      window.removeEventListener('profileDataUpdated', loadFromLocalStorage)
  }, [setValue])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onSubmit = (data: ProfileForm) => {
    if (photo) localStorage.setItem('teacherProfilePhoto', photo)
    localStorage.setItem('teacherProfileData', JSON.stringify(data))
    setDisplayData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    })
    window.dispatchEvent(new Event('profileDataUpdated'))
  }

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Profile</h1>
        <p className='mt-1 text-sm text-gray-500'>
          Manage your account settings and information
        </p>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-1'>
          <div className='rounded-2xl bg-white p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]'>
            <div className='flex flex-col items-center text-center'>
              <div className='relative mb-4'>
                {photo ? (
                  <img
                    src={photo}
                    alt='Profile'
                    className='h-24 w-24 rounded-full object-cover ring-4 ring-rose-50'
                  />
                ) : (
                  <div className='flex h-24 w-24 items-center justify-center rounded-full bg-[#b80035] text-3xl font-bold text-white ring-4 ring-rose-50'>
                    {displayData.firstName[0]}
                  </div>
                )}
                <button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className='absolute -right-1 -bottom-1 grid h-8 w-8 place-items-center rounded-full bg-white shadow-md ring-1 ring-gray-100 hover:bg-gray-50'
                >
                  <Camera size={14} className='text-gray-600' />
                </button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handlePhotoChange}
                  className='hidden'
                />
              </div>

              <h2 className='text-lg font-bold text-gray-900'>
                {displayData.firstName} {displayData.lastName}
              </h2>
              <p className='text-sm text-gray-500'>Spanish Teacher</p>

              <div className='mt-3 flex gap-2'>
                <span className='rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-[#b80035]'>
                  Intermediate
                </span>
                <span className='rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-[#b80035]'>
                  Advanced
                </span>
              </div>
            </div>

            <div className='mt-6 space-y-3 border-t border-gray-100 pt-6'>
              <InfoRow icon={Mail} value={displayData.email} />
              <InfoRow icon={Phone} value={displayData.phone} />
              <InfoRow icon={MapPin} value='Uzbekistan, Karshi' />
              <InfoRow icon={Calendar} value='Joined March 2024' />
            </div>
          </div>
        </div>

        <div className='col-span-2 space-y-6'>
          <div className='rounded-2xl bg-white p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]'>
            <h3 className='mb-5 text-base font-bold text-gray-900'>
              Personal Information
            </h3>
            <form
              id='profile-form'
              onSubmit={handleSubmit(onSubmit)}
              className='grid grid-cols-2 gap-4'
            >
              <FormField label='First Name'>
                <input
                  type='text'
                  {...register('firstName')}
                  className={inputClassName}
                />
              </FormField>

              <FormField label='Last Name (optional)'>
                <input
                  type='text'
                  {...register('lastName')}
                  className={inputClassName}
                />
              </FormField>

              <FormField label='Email'>
                <input
                  type='email'
                  {...register('email')}
                  className={inputClassName}
                />
              </FormField>

              <FormField label='Phone' error={errors.phone?.message}>
                <input
                  type='tel'
                  placeholder='+998 90 123 45 67'
                  {...phoneRest}
                  ref={phoneRef}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    e.target.value = formatted
                    phoneOnChange(e)
                  }}
                  maxLength={17}
                  className={inputClassName}
                />
              </FormField>

              <FormField label='Bio' className='col-span-2'>
                <textarea
                  {...register('bio')}
                  rows={3}
                  className={`${inputClassName} resize-none`}
                />
              </FormField>
            </form>

            <div className='mt-5 flex justify-end'>
              <RoseButton type='submit' form='profile-form'>
                <Save size={16} />
                Save Changes
              </RoseButton>
            </div>
          </div>

          <div className='rounded-2xl bg-white p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]'>
            <h3 className='mb-5 text-base font-bold text-gray-900'>
              Notification Settings
            </h3>
            <div className='space-y-4'>
              {NOTIFICATION_SETTINGS.map((setting) => (
                <div
                  key={setting.label}
                  className='flex items-center justify-between'
                >
                  <span className='text-sm text-gray-700'>{setting.label}</span>
                  <ToggleSwitch checked={setting.checked} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
