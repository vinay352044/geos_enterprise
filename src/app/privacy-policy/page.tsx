import type { Metadata } from 'next'
import { SEO_DEFAULTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy — GEOS Enterprises',
  description: 'Privacy policy for GEOS Enterprises fleet logistics website.',
  alternates: { canonical: `${SEO_DEFAULTS.url}/privacy-policy` },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-navy py-16 pt-24">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-heading font-bold text-white">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
          <p className="text-slate text-sm mb-6">Last updated: March 2025</p>
          <h2 className="font-heading font-semibold text-navy">1. Information We Collect</h2>
          <p className="font-body text-slate mb-4">
            We collect information you provide when submitting booking requests or contact forms,
            including your name, mobile number, pickup/drop locations, and trip details. This
            information is used solely for processing your booking request.
          </p>
          <h2 className="font-heading font-semibold text-navy">2. How We Use Your Information</h2>
          <p className="font-body text-slate mb-4">
            Your information is used to contact you regarding your booking request, provide fleet
            services, and improve our service quality. We do not sell or share your personal
            information with third parties.
          </p>
          <h2 className="font-heading font-semibold text-navy">3. Data Security</h2>
          <p className="font-body text-slate mb-4">
            We implement appropriate technical and organizational measures to protect your personal
            information. OTP verification is used to ensure that your mobile number is valid and
            belongs to you.
          </p>
          <h2 className="font-heading font-semibold text-navy">4. Contact Us</h2>
          <p className="font-body text-slate mb-4">
            For any privacy-related queries, contact us at{' '}
            <a href="mailto:info@geosenterprises.com" className="text-accent hover:underline">
              info@geosenterprises.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
