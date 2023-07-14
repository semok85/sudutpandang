import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import MiniCreatePost from '@/components/MiniCreatePost'

interface PageProps {
	params: {
		slug: string
	}
}

const page = async ({ params }: PageProps) => {
	const { slug } = params
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
					comments: true,
					tribe: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
				take: INFINITE_SCROLL_PAGINATION_RESULTS,
			},
		},
	})
	if (!tribe) return notFound()
	return (
		<>
			<h1 className='font-bold text-3xl md:text-4xl h-14'>
				Tribe@{tribe.name}
			</h1>
			<MiniCreatePost session={session} />
			{/* <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} /> */}
		</>
	)
}

export default page
