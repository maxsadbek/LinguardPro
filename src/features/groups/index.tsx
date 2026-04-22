import { ConfigDrawer } from '@/components/config-drawer';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';

export default function GroupsPage() {
  return (
    <>
      <Header>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <div className='rounded-lg border p-4'>
          <h2 className='mb-4 text-lg font-semibold'>Guruhlar ro'yxati</h2>
          <p className='text-muted-foreground'>
            Bu bo'limga guruhlarni boshqarish, o'quvchilarni guruhga bo'lishish
            va guruhlarni boshqarish imkoniyatlari mavjud.
          </p>
        </div>
      </Main>
    </>
  )
}
