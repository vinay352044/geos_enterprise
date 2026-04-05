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
      <section style={{ background: '#0a0f1c', paddingTop: 'clamp(120px, 14vw, 180px)', paddingBottom: 'clamp(40px, 4vw, 64px)' }}>
        <div className="container-wide">
          <h1 className="font-heading font-extrabold text-white" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em' }}>
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="section-py bg-[#fafaf8]">
        <div className="container-wide max-w-3xl">
          <p className="font-body text-sm text-[#9ca3af] mb-10">Last updated: March 2025</p>

          <div className="space-y-8">
            {[
              {
                title: '1. Information We Collect',
                body: 'We collect information you provide when submitting booking requests or contact forms, including your name, mobile number, pickup/drop locations, and trip details. This information is used solely for processing your booking request.',
              },
              {
                title: '2. How We Use Your Information',
                body: 'Your information is used to contact you regarding your booking request, provide fleet services, and improve our service quality. We do not sell or share your personal information with third parties.',
              },
              {
                title: '3. Data Security',
                body: 'We implement appropriate technical and organizational measures to protect your personal information. OTP verification is used to ensure that your mobile number is valid and belongs to you.',
              },
              {
                title: '4. Contact Us',
                body: null,
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-heading font-bold text-lg mb-3" style={{ color: '#0a0f1c', letterSpacing: '-0.01em' }}>
                  {section.title}
                </h2>
                {section.body ? (
                  <p className="font-body text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    {section.body}
                  </p>
                ) : (
                  <p className="font-body text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    For any privacy-related queries, contact us at{' '}
                    <a href="mailto:info@geosenterprises.com" className="text-[#3366ff] hover:underline">
                      info@geosenterprises.com
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
