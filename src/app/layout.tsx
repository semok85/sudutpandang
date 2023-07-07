import Navbar from '@/components/navbar/Navbar'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
	title: 'Sudut Pandang',
	description: 'Menumbuhkan Dialog, Merangkul Perspektif',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='en'
			className={cn(
				'bg-white text-slate-900 antialiased light',
				inter.className
			)}
		>
			<body className='min-h-screen pt-12 bg-slate-50 antialiased'>
				<div className='container max-w-7xl mx-auto h-full pt-12'>
					<Navbar />
					{children}
				</div>
			</body>
		</html>
	)
}
