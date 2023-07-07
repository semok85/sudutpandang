import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/Button'

const Navbar = () => {
	return (
		<div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-10 py-2'>
			<div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
				<Link href='/' className='text-2xl font-semibold'>
					SUdutPAndaNG
				</Link>
				{/* Search bar */}
				<Link href='/sign-in' className={buttonVariants()}>
					Sign In
				</Link>
			</div>
		</div>
	)
}

export default Navbar
