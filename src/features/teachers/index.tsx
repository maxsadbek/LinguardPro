import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export default function TeachersPage() {
  return (
    <>
      <Header>
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='rounded-lg border p-4'>
          <h2 className='mb-4 text-lg font-semibold'>Ustozlar ro'yxati</h2>
          <p className='text-muted-foreground'>
            Bu bo'limga ustozlar ro'yxatini ko'rish, qo'shish, o'chirish va
            boshqarish imkoniyatlari mavjud.
          </p>
        </div>
      </Main>
    </>
  )
}
