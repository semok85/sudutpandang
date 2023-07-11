'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { CreateTribePayload } from '@/lib/validators/tribe'

const Page = () => {
	const router = useRouter()
	const [input, setInput] = useState<string>('')
	const { toast } = useToast()
	const { loginToast } = useCustomToasts()
	const { mutate: createTribe, isLoading } = useMutation({
		mutationFn: async () => {
			const payload: CreateTribePayload = {
				name: input,
			}
			const { data } = await axios.post('/api/tribe', payload)
			return data as string
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.status === 409) {
					return toast({
						title: 'Nama Tribe ini sudah terpakai',
						description: 'Silahkan pilih nama tribe yang lain',
						variant: 'destructive',
					})
				}
				if (error.response?.status === 422) {
					return toast({
						title: 'Nama tribe anda tidak sesuai pola',
						description:
							'Silahkan gunakan nama dengan jumlah karakter antara 3 sampai 21',
						variant: 'destructive',
					})
				}
				if (error.response?.status === 401) {
					return loginToast()
				}
			}
			toast({
				title: 'Terjadi Error',
				description: 'Gagal membuat tribe',
				variant: 'destructive',
			})
		},
		onSuccess: (data) => {
			router.push(`/tribe/${data}`)
		},
	})

	return (
		<div className='container flex items-center h-full max-w-3xl mx-auto'>
			<div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-xl font-semibold'>Buat Tribe</h1>
				</div>

				<hr className='bg-red-500 h-px' />

				<div>
					<p className='text-lg font-medium'>Name</p>
					<p className='text-xs pb-2'>
						Community names including capitalization cannot be changed.
					</p>
					<div className='relative'>
						<p className='absolute text-sm left-4 w-8 inset-y-0 grid place-items-center text-zinc-400'>
							tribe@
						</p>
						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className=' pl-[60px]'
						/>
					</div>
				</div>

				<div className='flex justify-end gap-4'>
					<Button
						disabled={isLoading}
						variant='subtle'
						onClick={() => router.back()}
					>
						Cancel
					</Button>
					<Button
						isLoading={isLoading}
						disabled={input.length < 3}
						onClick={() => createTribe()}
					>
						Create Community
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Page
