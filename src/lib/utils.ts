import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function initialName(name: string) {
	const arrName = name.split(' ')
	const initial = arrName[0][0] + arrName[1][0]
	return initial.toUpperCase()
}
