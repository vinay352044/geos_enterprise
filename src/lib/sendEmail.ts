import { Resend } from 'resend'
import nodemailer from 'nodemailer'

const NOTIFY_EMAILS = ['vinaysharma352044@gmail.com', 'geosenterprises@gmail.com']

export async function sendLeadEmail(lead: {
  leadId: string
  customerName: string
  contactNumber: string
  pickupLocation: string
  dropLocation: string
  tripStartDate: string
  tripEndDate: string
  tripStartTime: string
  tripEndTime: string
  vehicleType: string
  additionalNotes?: string
}): Promise<{ success: boolean; error?: string }> {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const formattedStartDate = formatDate(lead.tripStartDate)
  const formattedEndDate = formatDate(lead.tripEndDate)

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Lead - GEOS Enterprises</title></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
  <div style="background: #0D2B5E; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">NEW BOOKING REQUEST</h1>
    <p style="color: #93C5FD; margin: 8px 0 0;">GEOS Enterprises Lead Management</p>
  </div>
  <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: 3px solid #1E40AF;">
    <div style="background: #EFF6FF; border-left: 4px solid #1E40AF; padding: 12px 16px; margin-bottom: 24px; border-radius: 0 4px 4px 0;">
      <strong style="color: #1E40AF;">Lead ID: ${lead.leadId}</strong>
    </div>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; width: 40%; color: #334155;">Customer Name</td><td style="padding: 10px; border: 1px solid #E2E8F0;">${lead.customerName}</td></tr>
      <tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; color: #334155;">Mobile</td><td style="padding: 10px; border: 1px solid #E2E8F0;">+91-${lead.contactNumber}</td></tr>
      <tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; color: #334155;">Pickup</td><td style="padding: 10px; border: 1px solid #E2E8F0;">${lead.pickupLocation}</td></tr>
      <tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; color: #334155;">Drop</td><td style="padding: 10px; border: 1px solid #E2E8F0;">${lead.dropLocation}</td></tr>
      <tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; color: #334155;">Trip Start Date</td><td style="padding: 10px; border: 1px solid #E2E8F0;">${formattedStartDate}</td></tr>
      <tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; color: #334155;">Trip End Date</td><td style="padding: 10px; border: 1px solid #E2E8F0;">${formattedEndDate}</td></tr>
      <tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; color: #334155;">Start Time</td><td style="padding: 10px; border: 1px solid #E2E8F0;">${lead.tripStartTime}</td></tr>
      <tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; color: #334155;">End Time</td><td style="padding: 10px; border: 1px solid #E2E8F0;">${lead.tripEndTime}</td></tr>
      <tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; color: #334155;">Vehicle Type</td><td style="padding: 10px; border: 1px solid #E2E8F0;">${lead.vehicleType}</td></tr>
      ${lead.additionalNotes ? `<tr><td style="padding: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; font-weight: bold; color: #334155;">Notes</td><td style="padding: 10px; border: 1px solid #E2E8F0;">${lead.additionalNotes}</td></tr>` : ''}
    </table>
    <div style="margin-top: 24px; padding: 16px; background: #FFF7ED; border-radius: 6px; border: 1px solid #FED7AA;">
      <p style="margin: 0; color: #92400E;"><strong>Action Required:</strong> Contact this lead within 2 hours for best conversion rate.</p>
    </div>
  </div>
</body>
</html>`

  const subject = `[NEW LEAD] GEOS Enterprises — Booking Request from ${lead.customerName} | ${formattedStartDate}`

  // Use Resend if API key is configured (no app passwords needed)
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    try {
      await resend.emails.send({
        from: 'GEOS Enterprises <onboarding@resend.dev>',
        to: NOTIFY_EMAILS,
        subject,
        html,
      })
      return { success: true }
    } catch (error) {
      console.error('[RESEND ERROR]', error instanceof Error ? error.message : 'Unknown error')
      return { success: false, error: 'Email delivery failed' }
    }
  }

  // Fallback: SMTP (nodemailer) if configured
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    try {
      await transporter.sendMail({
        from: `"GEOS Enterprises Leads" <${process.env.SMTP_USER}>`,
        to: [...new Set([...NOTIFY_EMAILS, process.env.ADMIN_EMAIL].filter(Boolean))].join(', '),
        subject,
        html,
      })
      return { success: true }
    } catch (error) {
      console.error('[EMAIL ERROR]', error instanceof Error ? error.message : 'Unknown error')
      return { success: false, error: 'Email delivery failed' }
    }
  }

  console.log(`[DEV] No email provider configured. Lead ${lead.leadId} would be sent to: ${NOTIFY_EMAILS.join(', ')}`)
  return { success: true }
}

export async function sendContactEmail(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  const html = `<div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #0D2B5E;">New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> +91-${data.phone}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>
  </div>`

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    try {
      await resend.emails.send({
        from: 'GEOS Website <onboarding@resend.dev>',
        to: NOTIFY_EMAILS,
        replyTo: data.email,
        subject: `[CONTACT] ${data.subject} — ${data.name}`,
        html,
      })
      return { success: true }
    } catch {
      return { success: false, error: 'Email delivery failed' }
    }
  }

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    try {
      await transporter.sendMail({
        from: `"GEOS Website" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: data.email,
        subject: `[CONTACT] ${data.subject} — ${data.name}`,
        html,
      })
      return { success: true }
    } catch {
      return { success: false, error: 'Email delivery failed' }
    }
  }

  console.log('[DEV] No email provider configured for contact form.')
  return { success: true }
}
