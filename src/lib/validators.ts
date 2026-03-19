import { z } from 'zod'

export const indianMobileSchema = z
  .string()
  .min(10, 'Mobile number must be 10 digits')
  .max(10, 'Mobile number must be 10 digits')
  .regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number (starts with 6-9)')

export const leadFormSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long').trim(),
  pickupLocation: z.string().min(3, 'Please enter pickup location').max(200, 'Location too long').trim(),
  dropLocation: z.string().min(3, 'Please enter drop location').max(200, 'Location too long').trim(),
  tripStartDate: z.string().refine((date) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return new Date(date) >= today
  }, 'Trip start date cannot be in the past'),
  tripEndDate: z.string().min(1, 'Please select trip end date'),
  tripStartTime: z.string().min(1, 'Please select start time'),
  tripEndTime: z.string().min(1, 'Please select end time'),
  vehicleType: z.enum(['Sedan', 'SUV', 'Luxury SUV', 'Tempo Traveller', 'Minibus', 'Bus']).refine(v => v !== undefined, { message: 'Please select a vehicle type' }),
  contactNumber: indianMobileSchema,
  additionalNotes: z.string().max(500, 'Notes too long').optional(),
})

export const otpRequestSchema = z.object({
  phone: indianMobileSchema,
})

export const otpVerifySchema = z.object({
  phone: indianMobileSchema,
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d{6}$/, 'OTP must be numeric'),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name required').max(100).trim(),
  email: z.string().email('Invalid email address').trim(),
  phone: indianMobileSchema,
  subject: z.string().min(3, 'Subject required').max(200).trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000)
    .trim(),
})

export type LeadFormData = z.infer<typeof leadFormSchema>
export type OtpRequestData = z.infer<typeof otpRequestSchema>
export type OtpVerifyData = z.infer<typeof otpVerifySchema>
export type ContactFormValues = z.infer<typeof contactFormSchema>
