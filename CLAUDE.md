# GEOS Enterprises — Corporate Fleet Logistics Website

Government & Corporate Fleet Logistics website for GEOS Enterprises. Specializes in 100% Taxi Plated (commercially registered) fleet vehicles for PSUs, government bodies, and large corporations.

## Tech Stack
- Next.js 15 (App Router, TypeScript strict)
- Material UI v6 for component library
- Tailwind CSS for utilities and layout
- Redux Toolkit for global state management
- TanStack Query for server state / API integration
- React Hook Form + Zod validation
- Framer Motion for animations
- Embla Carousel for logo slider and galleries
- NodeMailer for transactional emails
- Google Sheets API v4 for lead logging
- MSG91/Fast2SMS for OTP verification
- Vercel deployment with auto-SSL

## Architecture
- /src/app/ — Pages (App Router), API routes, sitemap, not-found
- /src/components/layout/ — Navbar, Footer, UtilityBar, MobileMenu
- /src/components/home/ — Hero, Stats, ClientCarousel, WhyChooseUs, CallBasisForm
- /src/components/fleet/ — VehicleCard, Gallery, Specs, FleetBanner
- /src/components/marketplace/ — ListingCard, Gallery, InquireModal, FiltlookinerBar
- /src/components/ui/ — Button, Input, Select, OtpInput, Modal, Badge
- /src/lib/ — googleSheets, sendEmail, sendOtp, rateLimiter, validators, utils
- /src/data/ — Static data: vehicles.ts, marketplace.ts, clients.ts
- /src/types/ — TypeScript interfaces for Vehicle, Lead, MarketplaceListing, API responses
- /src/hooks/ — useCountUp, useInView, useOtp
- /src/store/ — Redux store with slices for UI state, form state

## Brand Design Tokens
- Primary Navy: #0D2B5E
- Slate Grey: #334155
- Accent Blue: #1E40AF
- Background Light: #F1F5F9
- Success Green: #166534
- Error Red: #991B1B
- Heading Font: Montserrat (Google Fonts)
- Body Font: Roboto (Google Fonts)
- 8px spacing system

## Critical Business Rules
- EVERY vehicle is Taxi Plated — this is the #1 trust signal, badge it everywhere
- Call-Basis form is the PRIMARY business objective — must work flawlessly on mobile
- OTP verification is MANDATORY before form submission
- Admin email + Google Sheets logging on EVERY submission
- Rate limiting: max 5 submissions per hour, max 5 OTP requests per phone per hour
- All form inputs validated server-side with Zod
- No PII in server logs
- All images use Next.js Image component

## Commands
- Dev: pnpm dev
- Build: pnpm build
- Lint: pnpm lint
- Type check: pnpm tsc --noEmit
