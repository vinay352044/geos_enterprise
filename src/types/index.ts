export * from './vehicle'
export * from './lead'
export * from './marketplace'

export interface Client {
  id: string
  name: string
  logoPath: string
  category: 'Government/PSU' | 'Private/Foundation'
  description?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
