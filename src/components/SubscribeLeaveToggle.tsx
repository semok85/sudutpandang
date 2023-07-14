import { FC, startTransition } from 'react'
import { useToast } from './ui/use-toast'
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToTribePayload } from '@/lib/validators/tribe'
import axios, { AxiosError } from 'axios'
import { Button } from './ui/button'

interface SubscribeLeaveToggleProps {
	isSubscribed: boolean
	tribeId: string
	tribeName: string
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
	isSubscribed,
	tribeId,
	tribeName,
}) => {
	const { toast } = useToast()
	const { loginToast } = useCustomToasts()
	const router = useRouter()

	const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToTribePayload = {
				tribeId,
			}
			const { data } = await axios.post('api/tribe/submit', payload)
			return data as string
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					return loginToast()
				}
			}
			return toast({
				title: 'There was a problem.',
				description: 'Something went wrong. Please try again.',
				variant: 'destructive',
			})
		},
		onSuccess: () => {
			startTransition(() => {
				// Refresh the current route and fetch new data from the server without
				// losing client-side browser or React state.
				router.refresh()
			})
			toast({
				title: 'Subscribed!',
				description: `You are now subscribed to tribe@${tribeName}`,
			})
		},
	})

	const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToTribePayload = {
				tribeId,
			}

			const { data } = await axios.post('/api/subreddit/unsubscribe', payload)
			return data as string
		},
		onError: (err: AxiosError) => {
			toast({
				title: 'Error',
				description: err.response?.data as string,
				variant: 'destructive',
			})
		},
		onSuccess: () => {
			startTransition(() => {
				// Refresh the current route and fetch new data from the server without
				// losing client-side browser or React state.
				router.refresh()
			})
			toast({
				title: 'Unsubscribed!',
				description: `You are now unsubscribed from/${tribeName}`,
			})
		},
	})

	return isSubscribed ? (
		<Button
			className='w-full mt-1 mb-4'
			isLoading={isUnsubLoading}
			onClick={() => unsubscribe()}
		>
			Leave community
		</Button>
	) : (
		<Button
			className='w-full mt-1 mb-4'
			isLoading={isSubLoading}
			onClick={() => subscribe()}
		>
			Join to post
		</Button>
	)
}

export default SubscribeLeaveToggle
