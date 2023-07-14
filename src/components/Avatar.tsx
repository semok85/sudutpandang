'use client'
import { FC } from 'react'
import { User as UserType } from 'next-auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { initialName } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<UserType, 'name' | 'image' | 'email'>
}

const UserAvatar: FC<AvatarProps> = ({ user }) => {
	return (
		<Avatar className='cursor-pointer'>
			<AvatarImage src={user?.image!} />
			<AvatarFallback>{user?.name && initialName(user?.name!)}</AvatarFallback>
		</Avatar>
	)
}

export default UserAvatar
