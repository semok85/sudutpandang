import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { TribeValidator } from '@/lib/validators/tribe'
import { z } from 'zod'

export async function POST(req: Request) {
	try {
		const session = await getAuthSession()
		if (!session?.user) return new Response('Unauthorized', { status: 401 })
		const body = await req.json()
		const { name } = TribeValidator.parse(body)
		const tribeExists = await db.tribe.findFirst({
			where: {
				name,
			},
		})
		if (tribeExists)
			return new Response('Tribe sudah di gunakan', { status: 409 })
		// create tribe and associate it with the user
		const tribe = await db.tribe.create({
			data: {
				name,
				creatorId: session.user.id,
			},
		})
		// creator also has to be subscribed
		await db.subscription.create({
			data: {
				userId: session?.user.id,
				tribeId: tribe.id,
			},
		})
		return new Response(tribe.name, { status: 201 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 })
		}
		return new Response('Gagal membuat tribe', { status: 500 })
	}
}
