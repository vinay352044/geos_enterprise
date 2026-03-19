import { google } from 'googleapis'

function getAuth() {
  const credentials = process.env.GOOGLE_CREDENTIALS
  if (!credentials) return null

  const parsed = JSON.parse(Buffer.from(credentials, 'base64').toString('utf-8'))
  return new google.auth.GoogleAuth({
    credentials: parsed,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

export async function appendLeadToSheet(lead: {
  leadId: string
  customerName: string
  pickupLocation: string
  dropLocation: string
  tripStartDate: string
  tripEndDate: string
  tripStartTime: string
  tripEndTime: string
  vehicleType: string
  contactNumber: string
  additionalNotes?: string
}): Promise<{ success: boolean; error?: string }> {
  const auth = getAuth()
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!auth || !sheetId) {
    console.log(`[DEV] Would append lead ${lead.leadId} to Google Sheets`)
    return { success: true }
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth })
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'GEOS_Leads_2025!A:K',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            lead.leadId,
            lead.customerName,
            lead.pickupLocation,
            lead.dropLocation,
            lead.tripStartDate,
            lead.tripEndDate,
            lead.tripStartTime,
            lead.tripEndTime,
            lead.vehicleType,
            lead.contactNumber,
            lead.additionalNotes || '',
            'New',
          ],
        ],
      },
    })
    return { success: true }
  } catch (error) {
    console.error('[SHEETS ERROR]', error instanceof Error ? error.message : 'Unknown')
    return { success: false, error: 'Sheets logging failed' }
  }
}
