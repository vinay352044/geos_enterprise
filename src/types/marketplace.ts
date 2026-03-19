export type VehicleCondition = 'Excellent' | 'Good' | 'Fair'

export interface MarketplaceListing {
  id: string
  slug: string
  make: string
  model: string
  year: number
  kmDriven: number
  registrationType: string
  insuranceValidity: string
  engineCC: number
  seatingCapacity: number
  condition: VehicleCondition
  price: number | null
  callForPrice: boolean
  taxiPlated: boolean
  description: string
  features: string[]
  images: string[]
  specifications: Record<string, string>
}
