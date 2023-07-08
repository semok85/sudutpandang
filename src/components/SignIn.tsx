import { FC } from 'react'
import { Icons } from './icons'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'

const SignIn: FC = () => {
	return (
		<div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
			<div className='flex flex-col space-y-2 text-center'>
				<Icons.logo className='mx-auto h-12 w-12' />
				<h1 className='text-2xl font-semibold tracking-tight'>
					Selamat datang kembali
				</h1>
				<p className='text-sm max-w-xs mx-auto'>
					Dengan melanjutkan tautan di bawah ini, Anda akan membuat akun
					SudutPandang dan setuju dengan Perjanjian Pengguna dan Kebijakan
					Privasi kami.
				</p>
			</div>
			<UserAuthForm />
			<p className='px-8 text-center text-sm text-muted-foreground'>
				Baru di SudutPandang?{' '}
				<Link
					href='/sign-up'
					className='hover:text-brand text-sm underline underline-offset-4'
				>
					Sign Up
				</Link>
			</p>
		</div>
	)
}

export default SignIn
