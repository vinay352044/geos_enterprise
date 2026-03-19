export type VehicleCategory = 'Sedan' | 'SUV' | 'Luxury SUV' | 'Tempo Traveller' | 'Minibus' | 'Bus'

export interface Vehicle {
  id: string
  slug: string
  name: string
  model: string
  category: VehicleCategory
  year: number
  seatingCapacity: number
  fuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Electric'
  transmission: 'Manual' | 'Automatic'
  engineCC: number
  acAvailable: boolean
  taxiPlated: boolean
  insuranceValid: boolean
  permitType: string
  description: string
  features: string[]
  images: string[]
  specifications: Record<string, string>
  availableFor: string[]
}
