import { cookies } from 'next/headers'
import { createHmac } from 'crypto'

const SECRET = process.env.ADMIN_SECRET!
const COOKIE_NAME = 'geos_admin_session'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME!
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!

export function createSessionToken(username: string): string {
  const payload = `${username}:${Date.now()}`
  const sig = createHmac('sha256', SECRET).update(payload).digest('hex')
  return Buffer.from(`${payload}:${sig}`).toString('base64')
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const parts = decoded.split(':')
    if (parts.length < 3) return false
    const sig = parts[parts.length - 1]
    const payload = parts.slice(0, -1).join(':')
    const expected = createHmac('sha256', SECRET).update(payload).digest('hex')
    return sig === expected
  } catch {
    return false
  }
}

export function checkAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifySessionToken(token)
}

export { COOKIE_NAME }
