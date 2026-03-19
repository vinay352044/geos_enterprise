import { ApiResponse } from '@/types'

export async function sendOtpApi(phone: string): Promise<ApiResponse<{ message: string }>> {
  const res = await fetch('/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  })
  return res.json()
}

export async function verifyOtpApi(
  phone: string,
  otp: string,
): Promise<ApiResponse<{ sessionToken: string }>> {
  const res = await fetch('/api/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp }),
  })
  return res.json()
}

export async function submitLeadApi(
  data: Record<string, unknown>,
): Promise<ApiResponse<{ leadId: string; message: string }>> {
  const res = await fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function submitContactApi(data: Record<string, unknown>): Promise<ApiResponse> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
