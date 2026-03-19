export interface Lead {
  id: string
  customerName: string
  pickupLocation: string
  dropLocation: string
  tripDate: string
  tripTime: string
  vehicleType: string
  contactNumber: string
  additionalNotes?: string
  status: 'New' | 'Contacted' | 'Converted' | 'Lost'
  createdAt: string
}

export interface OtpState {
  sent: boolean
  verified: boolean
  sessionToken: string | null
  attempts: number
  expiresAt: number | null
  lastSentAt: number | null
}
