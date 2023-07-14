import type { Post, Tribe, User, Vote, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
	tribe: Tribe
	votes: Vote[]
	author: User
	comments: Comment[]
}
