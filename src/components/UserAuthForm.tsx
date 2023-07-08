'use client'
import { cn } from '@/lib/utils'
import React, { useState, FC } from 'react'
import { Button } from './ui/button'
import { Icons } from './icons'
import { useToast } from './ui/use-toast'
import { signIn } from 'next-auth/react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const loginWithGoogle = async () => {
		setIsLoading(true)

		try {
			await signIn('google')
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Ada masalah saat login menggunakan google',
				variant: 'destructive',
			})
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className={cn('flex justify-center', className)} {...props}>
			<Button
				isLoading={isLoading}
				type='button'
				size='sm'
				className='w-full'
				onClick={loginWithGoogle}
				disabled={isLoading}
			>
				{isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
				Google
			</Button>
		</div>
	)
}

export default UserAuthForm
