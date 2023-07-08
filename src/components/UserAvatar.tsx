'use client'
import { FC } from 'react'
import { User as UserType } from 'next-auth'
import { signOut } from 'next-auth/react'

import { CreditCard, LogOut, PlusCircle, Settings, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { initialName } from '@/lib/utils'

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<UserType, 'name' | 'image' | 'email'>
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.image!} />
					<AvatarFallback>{initialName(user.name!)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{user.name!}</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{user.email!}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User className='mr-2 h-4 w-4' />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className='mr-2 h-4 w-4' />
						<span>Feed</span>
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<PlusCircle className='mr-2 h-4 w-4' />
						<span>Buat Komunitas</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className='mr-2 h-4 w-4' />
						<span>Setting</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onSelect={(event) => {
						event.preventDefault()
						signOut({
							callbackUrl: `${window.location.origin}/sign-in`,
						})
					}}
				>
					<LogOut className='mr-2 h-4 w-4' />
					<span>Log out</span>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserAvatar
