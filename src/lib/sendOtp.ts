export async function sendOtp(
  phone: string,
  otp: string,
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.OTP_SERVICE_API_KEY

  if (!apiKey) {
    // Development mode — print OTP to server console for testing
    console.log(`\n========================================`)
    console.log(`[DEV OTP] Phone: ${phone}  |  OTP: ${otp}`)
    console.log(`========================================\n`)
    return { success: true }
  }

  try {
    // MSG91 OTP API integration
    const response = await fetch('https://api.msg91.com/api/v5/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authkey: apiKey },
      body: JSON.stringify({
        template_id: process.env.OTP_TEMPLATE_ID || '',
        mobile: `91${phone}`,
        authkey: apiKey,
        otp,
      }),
    })

    if (!response.ok) {
      return { success: false, error: 'SMS delivery failed' }
    }

    return { success: true }
  } catch {
    return { success: false, error: 'SMS service unavailable' }
  }
}
