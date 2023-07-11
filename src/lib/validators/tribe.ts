import { z } from 'zod'

export const TribeValidator = z.object({
	name: z.string().min(3).max(21),
})

export const TribeSubscriptionValidator = z.object({
	tribeId: z.string(),
})

export type CreateTribePayload = z.infer<typeof TribeValidator>
export type SubscribeToTribePayload = z.infer<typeof TribeSubscriptionValidator>
