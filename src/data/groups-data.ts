export interface Group {
  id: number
  name: string
  description: string
  students: number
  schedule: string
  status: 'active' | 'inactive'
  teacher: string
  createdAt?: string
  updatedAt?: string
}

export const groupsData: Group[] = [
  {
    id: 1,
    name: "Web Development 101",
    description: "Frontend va Backend asoslari",
    students: 25,
    schedule: "Dushanba, Chorshanba - 14:00",
    status: "active",
    teacher: "John Doe",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "React Native bilan mobil ilovalar",
    students: 18,
    schedule: "Seshanba, Payshanba - 16:00",
    status: "active",
    teacher: "Jane Smith",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20"
  },
  {
    id: 3,
    name: "Data Science Basics",
    description: "Python va ma'lumotlar tahlili",
    students: 22,
    schedule: "Juma - 10:00",
    status: "inactive",
    teacher: "Mike Johnson",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01"
  },
  {
    id: 4,
    name: "UI/UX Design",
    description: "Foydalanuvchi interfeysi va tajribasi dizayni",
    students: 15,
    schedule: "Dushanba, Juma - 11:00",
    status: "active",
    teacher: "Sarah Wilson",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10"
  },
  {
    id: 5,
    name: "DevOps Engineering",
    description: "Cloud va CI/CD asoslari",
    students: 12,
    schedule: "Chorshanba, Shanba - 15:00",
    status: "active",
    teacher: "David Brown",
    createdAt: "2024-02-15",
    updatedAt: "2024-02-15"
  }
]
