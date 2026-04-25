import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RoseButton } from '@/components/ui/rose-button'

interface GroupModalProps {
  isOpen: boolean
  onClose: () => void
  onAddGroup: () => void
  newGroup: {
    name: string
    description: string
    schedule: string
    room: string
    students: number
  }
  setNewGroup: React.Dispatch<
    React.SetStateAction<{
      name: string
      description: string
      schedule: string
      room: string
      students: number
    }>
  >
}

export function GroupModal({
  isOpen,
  onClose,
  onAddGroup,
  newGroup,
  setNewGroup,
}: GroupModalProps) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Yangi Guruh Qo&apos;shish
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
            }}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onAddGroup()
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Guruh nomi *
            </label>
            <Input
              value={newGroup.name}
              onChange={(e) =>
                setNewGroup((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder='Masalan: IELTS 7.5 Morning'
              required
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Tavsif
            </label>
            <textarea
              value={newGroup.description}
              onChange={(e) =>
                setNewGroup((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Guruh haqida qisqacha ma'lumot"
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Jadval *
            </label>
            <Input
              value={newGroup.schedule}
              onChange={(e) =>
                setNewGroup((prev) => ({
                  ...prev,
                  schedule: e.target.value,
                }))
              }
              placeholder='Masalan: Dushanba-Chorshanba 09:00-11:00'
              required
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Xona *
            </label>
            <Input
              value={newGroup.room}
              onChange={(e) =>
                setNewGroup((prev) => ({ ...prev, room: e.target.value }))
              }
              placeholder='Masalan: 201'
              required
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              O&apos;quvchilar soni
            </label>
            <Input
              type='number'
              min='0'
              value={newGroup.students}
              onChange={(e) =>
                setNewGroup((prev) => ({
                  ...prev,
                  students: parseInt(e.target.value) || 0,
                }))
              }
              placeholder='0'
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              style={{ flex: 1 }}
            >
              Bekor qilish
            </Button>
            <RoseButton
              type='submit'
              style={{
                flex: 1,
                border: 'none',
              }}
            >
              Guruh qo&apos;shish
            </RoseButton>
          </div>
        </form>
      </div>
    </div>
  )
}
