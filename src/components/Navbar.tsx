import Link from 'next/link'
import React from 'react'
import { Icons } from './icons'
import { buttonVariants } from '@/components/ui/button'
import UserAvatar from './UserAvatar'
import { getAuthSession } from '@/lib/auth'

const Navbar = async () => {
	const session = await getAuthSession()
	console.log(session?.user)
	return (
		<div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-10 py-2'>
			<div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
				<Link href='/' className='flex items-center justify-start gap-2'>
					<Icons.logo height='32' width='32' />
					<p className='hidden text-2xl font-semibold md:block'>SUdutPAndaNG</p>
				</Link>
				{/* Search bar */}
				{session?.user ? (
					<UserAvatar user={session.user} />
				) : (
					<Link href='/sign-in' className={buttonVariants()}>
						Sign In
					</Link>
				)}
			</div>
		</div>
	)
}

export default Navbar
