import { Link } from '@tanstack/react-router'
import { AuthCardShell } from '../auth-card-shell'

export function SignUp() {
  return (
    <AuthCardShell
      title="Ro'yxatdan o'tish"
      description="Sign up sahifasi hali tayyor emas. Hozircha mavjud akkaunt bilan tizimga kiring."
    >
      <div className='space-y-4 text-center'>
        <p className='text-muted-foreground text-sm'>
          Demo rejimda kirish uchun mavjud login sahifasidan foydalaning.
        </p>
        <Link
          to='/sign-in'
          className='inline-flex h-10 items-center justify-center rounded-md bg-[#C70C3D] px-4 text-sm font-medium text-white transition-colors hover:bg-[#C70C3D]/90'
        >
          Sign in
        </Link>
      </div>
    </AuthCardShell>
  )
}
