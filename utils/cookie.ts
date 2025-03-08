'use server'
import { cookies } from 'next/headers'

export async function getCookie(name: string) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(name)
  return cookie?.value
}

export async function setCookie(name: string, value: string, options?: any) {
  const cookieStore = await cookies()
  options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    ...options,
  }

  cookieStore.set(name, value, options)
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}
