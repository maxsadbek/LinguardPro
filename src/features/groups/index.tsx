import { groupsData } from '@/data/groups-data'
import {
  AlertCircle,
  Clock,
  FileText,
  Plus,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export default function GroupsPage() {
  const groups = groupsData
  const totalGroups = groups.length
  const activeGroups = groups.filter((g) => g.status === 'active').length
  const totalStudents = groups.reduce((sum, g) => sum + g.students, 0)
  const avgCompletion = Math.round((activeGroups / totalGroups) * 100)

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

          {/* Statistics Cards */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Jami guruhlar
                </CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalGroups}</div>
                <p className='text-xs text-muted-foreground'>
                  +2 o'tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Faol o'quvchilar
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalStudents}</div>
                <p className='text-xs text-muted-foreground'>+12% o'sish</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  O'rtacha to'ldirish
                </CardTitle>
                <Clock className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{avgCompletion}%</div>
                <div className='mt-2 h-2 overflow-hidden rounded-full bg-gray-200'>
                  <div
                    className='h-full rounded-full bg-blue-600 transition-all duration-300'
                    style={{ width: `${avgCompletion}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Yangi so'rovlar
                </CardTitle>
                <AlertCircle className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>8</div>
                <p className='text-xs text-muted-foreground'>Kutilmoqda</p>
              </CardContent>
            </Card>
          </div>
          {/* Groups Grid */}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {groups.map((group) => (
              <Card
                key={group.id}
                className='transition-shadow hover:shadow-lg'
              >
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='space-y-1'>
                      <CardTitle className='text-lg'>{group.name}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        group.status === 'active' ? 'default' : 'secondary'
                      }
                    >
                      {group.status === 'active' ? 'Faol' : 'Nofaol'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                      <Users className='h-4 w-4' />
                      <span>{group.students} o'quvchi</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='h-4 w-4' />
                      <span>{group.schedule}</span>
                    </div>
                  </div>

                  <div className='border-t pt-2'>
                    <p className='mb-3 text-sm font-medium'>
                      Ustoz: {group.teacher}
                    </p>
                    <div className='flex gap-2'>
                      <Button variant='outline' size='sm' className='flex-1'>
                        Batafsil
                      </Button>
                      <Button variant='ghost' size='sm'>
                        <FileText className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Sections */}
          <div className='grid gap-6 md:grid-cols-2'>
            <Card className='border-blue-200 bg-linear-to-r from-blue-50 to-indigo-50'>
              <CardHeader>
                <div className='flex items-center gap-2'>
                  <Zap className='h-5 w-5 text-blue-600' />
                  <CardTitle className='text-blue-900'>
                    Guruhlarni optimallashtirish vaqti keldi
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className='mb-4 text-blue-800'>
                  Guruhlaringizni samarali boshqarish uchun AI tavsiyalaridan
                  foydalaning. O'quvchilar progressini kuzatib boring va
                  guruhlar reytingini ko'ring.
                </p>
                <Button className='bg-blue-600 hover:bg-blue-700'>
                  AI Tavsiyalari
                </Button>
              </CardContent>
            </Card>

            <Card className='border-green-200 bg-linear-to-r from-green-50 to-emerald-50'>
              <CardHeader>
                <div className='flex items-center gap-2'>
                  <FileText className='h-5 w-5 text-green-600' />
                  <CardTitle className='text-green-900'>
                    Hisobot yaratish
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className='mb-4 text-green-800'>
                  Guruhlar faoliyati bo'yicha batafsil hisobotlarni yuklab
                  oling. Oylik, choraklik va yillik statistikalar.
                </p>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    className='border-green-600 text-green-600 hover:bg-green-50'
                  >
                    Oylik
                  </Button>
                  <Button className='bg-green-600 hover:bg-green-700'>
                    To'liq hisobot
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
