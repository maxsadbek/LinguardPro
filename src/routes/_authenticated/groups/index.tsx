import { createFileRoute } from '@tanstack/react-router'
import { groupsData } from '@/data/groups-data'
import { Calendar, Plus, Settings, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function GroupsPage() {
  const groups = groupsData

  return (
    <div className='container mx-auto space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Guruhlar</h1>
          <p className='text-muted-foreground'>
            Barcha o'quv guruhlarini boshqaring
          </p>
        </div>
        <Button className='flex items-center gap-2'>
          <Plus className='h-4 w-4' />
          Yangi Guruh
        </Button>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {groups.map((group) => (
          <Card key={group.id} className='transition-shadow hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='space-y-1'>
                  <CardTitle className='text-lg'>{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </div>
                <Badge
                  variant={group.status === 'active' ? 'default' : 'secondary'}
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
                  <Calendar className='h-4 w-4' />
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
                    <Settings className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/groups/')({
  component: GroupsPage,
})
