import type { Metadata } from 'next'
import { SEO_DEFAULTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us — GEOS Enterprises | Car Rental & Fleet Services Since 1988, Ahmedabad',
  description:
    'Founded in 1988 by George Varghese in Ahmedabad, Gujarat. GEOS Enterprises has been providing car rental, contract hire & used vehicles to corporates, PSUs & individuals for 35+ years.',
  keywords: 'GEOS Enterprises history, car rental company Ahmedabad, fleet services Gujarat since 1988, George Varghese GEOS',
  alternates: { canonical: `${SEO_DEFAULTS.url}/about` },
  openGraph: {
    title: 'About GEOS Enterprises — Car Rental & Fleet Services Since 1988, Ahmedabad',
    description: 'Established in 1988 in Ahmedabad. 35+ years of car rental, contract hire & fleet services across Gujarat and India.',
    url: `${SEO_DEFAULTS.url}/about`,
  },
}

const milestones = [
  {
    year: '1988',
    event: 'Founded by George Varghese in Ahmedabad, Gujarat. First government transport contracts awarded.',
  },
  {
    year: 'Mid 1990s',
    event: 'Expanded into corporate fleet solutions. Secured first energy sector clients in the western India corridor.',
  },
  {
    year: '2000s',
    event: 'Partnered with ONGC and BPCL for large-scale fleet provisioning across infrastructure projects.',
  },
  {
    year: '2010s',
    event: 'Onboarded Vedanta, GVK EMRI, and Adani Group. Fleet expanded to 100% commercial plating compliance.',
  },
  {
    year: 'Present',
    event: 'Continuing to serve government and corporate clients while expanding into used vehicle sales — offering quality fleet vehicles directly to the public.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: '#12235A' }}>
        {/* faint large year watermark */}
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 font-heading font-extrabold select-none pointer-events-none"
          style={{ fontSize: 'clamp(120px,20vw,220px)', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}
          aria-hidden="true"
        >
          1988
        </span>

        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <p className="font-heading font-bold text-xs tracking-widest uppercase mb-5 flex items-center gap-3" style={{ color: '#F0A500' }}>
                <span style={{ display: 'inline-block', height: '2px', width: '32px', backgroundColor: '#F0A500' }} />
                EST. 1988 · AHMEDABAD, INDIA
              </p>

              <h1 className="text-white font-extrabold mb-6 leading-tight">
                India&apos;s Most{' '}
                <em style={{ color: '#F0A500', fontStyle: 'italic' }}>Trusted</em>
                <br />Fleet Partner.
              </h1>

              <p className="font-body text-blue-100 text-lg leading-relaxed mb-10 max-w-lg">
                From government corridors to the heart of India&apos;s energy sector — Geos Enterprises has delivered reliable, compliant fleet solutions for over three decades.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-0 divide-x" style={{ borderLeft: '3px solid #8E1B2D' }}>
                {[
                  { value: '35+', label: 'YEARS OF\nSERVICE' },
                  { value: '100%', label: 'COMMERCIALLY\nPLATED' },
                  { value: '8+', label: 'MAJOR\nCLIENTS' },
                ].map((s) => (
                  <div key={s.label} className="px-6">
                    <div className="font-heading font-extrabold text-white" style={{ fontSize: '2.2rem' }}>{s.value}</div>
                    <div className="font-heading font-semibold text-xs tracking-widest mt-1 whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Founder card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-2xl p-8 relative" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="absolute top-0 left-8 h-0.5 w-16" style={{ backgroundColor: '#8E1B2D' }} />
                <p className="font-heading font-bold text-xs tracking-widest uppercase mb-6" style={{ color: '#F0A500' }}>
                  FOUNDER &amp; CHAIRMAN
                </p>
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-heading font-bold text-xl mb-6" style={{ border: '2px solid #F0A500', color: '#F0A500', backgroundColor: 'rgba(240,165,0,0.1)' }}>
                  GV
                </div>
                <h3 className="font-heading font-bold text-white text-2xl mb-1">George Varghese</h3>
                <p className="font-heading font-semibold text-xs tracking-widest mb-6" style={{ color: '#F0A500' }}>
                  VISIONARY · ENTREPRENEUR · LEADER
                </p>
                <blockquote className="font-body italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', borderLeft: '3px solid #8E1B2D', paddingLeft: '16px' }}>
                  &ldquo;Built on integrity and driven by the belief that every contract is a promise — to our clients, our drivers, and our nation.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Story + Milestones ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — Story */}
            <div>
              <p className="font-heading font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-3" style={{ color: '#8E1B2D' }}>
                <span>OUR STORY</span>
                <span style={{ display: 'inline-block', height: '2px', width: '40px', backgroundColor: '#8E1B2D' }} />
              </p>

              <h2 className="font-heading font-extrabold mb-8 leading-tight" style={{ color: '#12235A' }}>
                Three Decades of<br />
                <span style={{ color: '#8E1B2D' }}>Driving India Forward.</span>
              </h2>

              <div className="space-y-5 font-body leading-relaxed" style={{ color: '#334155' }}>
                <p>
                  In 1988, <strong>George Varghese</strong> founded Geos Enterprises with a singular conviction — that India&apos;s growing infrastructure needed fleet partners it could truly rely on. Starting from Ahmedabad, Gujarat, he built a company rooted in discipline, compliance, and service excellence.
                </p>
                <p>
                  What began as a local transport contractor evolved into one of India&apos;s respected names in{' '}
                  <strong style={{ color: '#12235A' }}>government and corporate fleet provisioning</strong>. Over the decades, Geos Enterprises forged long-standing relationships with the giants of India&apos;s energy, mining, and infrastructure sectors.
                </p>
                <p>
                  Today, the company operates a <strong>100% commercially plated, fully verified fleet</strong> — offering everything from executive car hire to heavy-duty logistics support, and a growing public marketplace for quality used commercial vehicles.
                </p>
              </div>
            </div>

            {/* Right — Timeline */}
            <div>
              <p className="font-heading font-bold text-xs tracking-widest uppercase mb-8 flex items-center gap-3" style={{ color: '#8E1B2D' }}>
                <span>MILESTONES</span>
                <span style={{ display: 'inline-block', height: '2px', width: '40px', backgroundColor: '#8E1B2D' }} />
              </p>

              <div className="space-y-0 relative">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5" style={{ backgroundColor: '#E8ECF4' }} />

                {milestones.map((m) => (
                  <div key={m.year} className="relative flex gap-5 pb-8">
                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-4 h-4 rounded-full mt-0.5" style={{ backgroundColor: '#8E1B2D', border: '3px solid white', boxShadow: '0 0 0 2px #8E1B2D' }} />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm mb-1" style={{ color: '#12235A' }}>{m.year}</p>
                      <p className="font-body text-sm leading-relaxed" style={{ color: '#334155' }}>{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="py-16" style={{ backgroundColor: '#F5F7FC' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="font-heading font-bold text-xs tracking-widest uppercase" style={{ color: '#8E1B2D' }}>LEGAL &amp; COMPLIANCE</span>
            <span style={{ display: 'block', height: '2px', width: '40px', backgroundColor: '#8E1B2D' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: 'GST Registration', value: '24AASFG7969G1ZQ' },
              { label: 'Established', value: '1988 — 35+ Years in Operation' },
              { label: 'Headquarters', value: 'Ahmedabad, Gujarat, India' },
            ].map((c) => (
              <div key={c.label} className="bg-white rounded-xl p-6 text-center" style={{ border: '1px solid #E8ECF4' }}>
                <p className="font-heading font-semibold text-xs tracking-widest uppercase mb-2" style={{ color: '#8E1B2D' }}>{c.label}</p>
                <p className="font-body text-sm" style={{ color: '#12235A' }}>{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
