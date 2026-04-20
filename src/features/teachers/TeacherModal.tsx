import { useState } from 'react'

interface Teacher {
  id: number
  name: string
  initials: string
  subject: string
  badgeColor: {
    bg: string
    text: string
    border: string
    avatarBg: string
    avatarFill: string
  }
  phone: string
  groups: number
  experience: number
  rating: number
}

const AvatarSilhouette = ({ fill }: { fill: string }) => (
  <svg viewBox='0 0 40 40' fill='none' width={28} height={28}>
    <circle cx='20' cy='15' r='8' fill={fill} />
    <ellipse cx='20' cy='33' rx='12' ry='7' fill={fill} />
  </svg>
)

interface TeacherModalProps {
  teacher: Teacher | null
  isOpen: boolean
  onClose: () => void
  action: 'edit' | 'delete' | 'detail'
  onConfirm: (teacher: Teacher) => void
}

export const TeacherModal = ({
  teacher,
  isOpen,
  onClose,
  action,
  onConfirm,
}: TeacherModalProps) => {
  const [formData, setFormData] = useState({
    name: teacher?.name || '',
    subject: teacher?.subject || '',
    phone: teacher?.phone || '',
  })

  // Update form when teacher changes for edit mode
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!isOpen || !teacher) return null

  const handleConfirm = () => {
    if (action === 'delete') {
      // Handle delete logic
      onConfirm(teacher)
    } else if (action === 'edit') {
      // Handle edit logic
      const updatedTeacher = { ...teacher, ...formData }
      onConfirm(updatedTeacher)
    }
    onClose()
  }

  const renderContent = () => {
    switch (action) {
      case 'delete':
        return (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>
                {'\u26a0\ufe0f'}
              </div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: 8,
                }}
              >
                Ustozni o'chirish
              </h2>
              <p style={{ color: '#64748b', fontSize: 14 }}>
                "{teacher.name}" ustozini ro'yxatdan o'chirishga ishonchingiz
                komilmi?
              </p>
            </div>
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 8,
                padding: 12,
                marginBottom: 24,
              }}
            >
              <p style={{ color: '#dc2626', fontSize: 12, fontWeight: 500 }}>
                Bu amal ortga qaytarib bo'lmaydi. Barcha ma'lumotlar
                o'chiriladi.
              </p>
            </div>
          </>
        )
      case 'edit':
        return (
          <>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: 16,
              }}
            >
              Ustozni tahrirlash
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: 4,
                  }}
                >
                  Ism
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: 4,
                  }}
                >
                  Fan
                </label>
                <input
                  type='text'
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: 4,
                  }}
                >
                  Telefon
                </label>
                <input
                  type='text'
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
              </div>
            </div>
          </>
        )
      case 'detail':
        return (
          <>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: 16,
              }}
            >
              Ustoz ma'lumotlari
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: teacher.badgeColor.avatarBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${teacher.badgeColor.border}40`,
                  }}
                >
                  <AvatarSilhouette fill={teacher.badgeColor.avatarFill} />
                </div>
                <div>
                  <div
                    style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}
                  >
                    {teacher.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 6,
                      display: 'inline-block',
                      background: teacher.badgeColor.bg,
                      color: teacher.badgeColor.text,
                      marginTop: 4,
                    }}
                  >
                    {teacher.subject}
                  </div>
                </div>
              </div>
              <div
                style={{ padding: '12px 0', borderTop: '1px solid #f1f5f9' }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#94a3b8',
                        fontWeight: 500,
                      }}
                    >
                      TELEFON
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#1e293b',
                        fontWeight: 500,
                      }}
                    >
                      {teacher.phone}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#94a3b8',
                        fontWeight: 500,
                      }}
                    >
                      REYTING
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#1e293b',
                        fontWeight: 500,
                      }}
                    >
                      {teacher.rating} / 5.0
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginTop: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#94a3b8',
                        fontWeight: 500,
                      }}
                    >
                      GURUHLAR
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#1e293b',
                        fontWeight: 500,
                      }}
                    >
                      {teacher.groups} ta
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#94a3b8',
                        fontWeight: 500,
                      }}
                    >
                      TAJRIBA
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#1e293b',
                        fontWeight: 500,
                      }}
                    >
                      {teacher.experience} yil
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--bg-overlay, rgba(0, 0, 0, 0.5))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'var(--bg-primary, #fff)',
          borderRadius: 16,
          padding: 24,
          maxWidth: 480,
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        {renderContent()}
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'flex-end',
            marginTop: 24,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              border: '1px solid var(--border-color, #d1d5db)',
              borderRadius: 8,
              background: 'var(--bg-primary, #fff)',
              color: 'var(--text-color, #6b7280)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {action === 'detail' ? 'Yopish' : 'Bekor qilish'}
          </button>
          {action !== 'detail' && (
            <button
              onClick={handleConfirm}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: 8,
                background:
                  action === 'delete'
                    ? 'var(--error-color, #dc2626)'
                    : 'var(--primary-color, #e11d48)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {action === 'delete' ? "O'chirish" : 'Saqlash'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
