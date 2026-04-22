import { groupsData } from '@/data/groups-data'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export default function GroupsPage() {
  const groups = groupsData

  return (
    <>
      <Header>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <div className='container mx-auto space-y-6 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold'>Guruhlar (Groups)</h1>
              <p className='text-muted-foreground'>
                Barcha o'quv guruhlarini boshqaring
              </p>
            </div>
            <Button className='flex items-center gap-2'>
              <Plus className='h-4 w-4' />
              Yangi Guruh
            </Button>
          </div>

          {/* Groups Table */}
          <Card>
            <CardContent className='p-0'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guruh nomi</TableHead>
                    <TableHead>Kurs</TableHead>
                    <TableHead>Ustoz</TableHead>
                    <TableHead>Jadval</TableHead>
                    <TableHead>O'quvchi</TableHead>
                    <TableHead>Narx</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className='font-medium'>
                        {group.name}
                      </TableCell>
                      <TableCell>{group.description}</TableCell>
                      <TableCell>{group.teacher}</TableCell>
                      <TableCell>{group.schedule}</TableCell>
                      <TableCell>{group.students}</TableCell>
                      <TableCell>500,000 so'm</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            group.status === 'active' ? 'default' : 'secondary'
                          }
                        >
                          {group.status === 'active' ? 'Faol' : 'Nofaol'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
