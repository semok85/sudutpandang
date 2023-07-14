import { buttonVariants } from '@/components/ui/button'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle'

interface layoutProps {
	children: React.ReactNode
	params: {
		slug: string
	}
}

export const metadata: Metadata = {
	title: 'SUdutPandaNG',
	description: '',
}

const layout = async ({ children, params: { slug } }: layoutProps) => {
	const session = await getAuthSession()
	const tribe = await db.tribe.findFirst({
		where: {
			name: slug,
		},
		include: {
			posts: {
				include: {
					author: true,
					votes: true,
				},
			},
		},
	})
	const subscription = !session?.user
		? undefined
		: await db.subscription.findFirst({
				where: {
					tribe: {
						name: slug,
					},
					user: {
						id: session.user.id,
					},
				},
		  })
	const isSubscribed = !!subscription

	if (!tribe) return notFound()
	const memberCount = await db.subscription.count({
		where: {
			tribe: {
				name: slug,
			},
		},
	})
	return (
		<div className='sm:container max-w-7xl mx-auto h-full pt-12'>
			<div>
				{/* <ToFeedButton /> */}

				<div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
					<ul className='flex flex-col col-span-2 space-y-6'>{children}</ul>

					{/* info sidebar */}
					<div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
						<div className='px-6 py-4'>
							<p className='font-semibold py-3'>About tribe@{tribe.name}</p>
						</div>
						<dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
							<div className='flex justify-between gap-x-4 py-3'>
								<dt className='text-gray-500'>Created</dt>
								<dd className='text-gray-700'>
									<time dateTime={tribe.createdAt.toDateString()}>
										{format(tribe.createdAt, 'MMMM d, yyyy')}
									</time>
								</dd>
							</div>
							<div className='flex justify-between gap-x-4 py-3'>
								<dt className='text-gray-500'>Members</dt>
								<dd className='flex items-start gap-x-2'>
									<div className='text-gray-900'>{memberCount}</div>
								</dd>
							</div>
							{tribe.creatorId === session?.user?.id ? (
								<div className='flex justify-between gap-x-4 py-3'>
									<dt className='text-gray-500'>You created this community</dt>
								</div>
							) : null}

							{tribe.creatorId !== session?.user?.id ? (
								<SubscribeLeaveToggle
									isSubscribed={isSubscribed}
									tribeId={tribe.id}
									tribeName={tribe.name}
								/>
							) : null}
							<Link
								className={buttonVariants({
									variant: 'outline',
									className: 'w-full mb-6',
								})}
								href={`/tribe/${slug}/submit`}
							>
								Create Post
							</Link>
						</dl>
					</div>
				</div>
			</div>
		</div>
	)
}

export default layout
