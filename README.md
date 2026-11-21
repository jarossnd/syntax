# Syntax

A static Astro website for Syntax, the trade name of Syntax Inc. White, near-black, and bright orange; self-hosted Manrope and DM Sans fonts.

Typography uses 18px body text and navigation, with a 16px minimum for supporting text at the default browser font size. Responsive layouts reflow instead of shrinking text. The accent palette is defined by the `--accent` variables in `src/styles/global.css`.

## Local development

Use Node.js 22.23.4 or newer, as required by Astro.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. The site includes Home (`/`), Services and pricing (`/services/`), Get Help (`/get-help/`), Contact (`/contact/`), and a custom 404 page.

Dedicated service pages cover Managed IT (`/services/managed-it/`), IT consulting (`/services/consulting/`), Web development (`/services/web-development/`), SEO (`/services/seo/`), and Web hosting (`/services/hosting/`). Each has its own title, description, scope, process, FAQs, and contact link that preselects the service. The services overview retains its existing section anchors and pricing.

```sh
npm run check
npm run build
npm run preview
```

The production build is static HTML in `dist/`. No server adapter, database, external font requests, or client framework is required. Small scripts handle analytics consent and contact-plan selection. Navigation and FAQs use native HTML.

## Content

- Shared service descriptions and retainer plans: `src/data/services.ts`
- Dedicated service-page content: the `page` fields in `src/data/services.ts`, rendered as static routes by `src/pages/services/[service].astro`
- Hourly rates, hosting plans, billing policies, and commitment terms: `src/pages/services.astro`
- Global styles and responsive layouts: `src/styles/global.css`
- Shared metadata, navigation, and footer: `src/layouts/Layout.astro`
- Public business contact details, hours, and on-site service areas: `src/data/business.ts`

Each main page supplies a descriptive title and one H1 naming its service or purpose. Marketing titles identify Syntax and include Fargo–Moorhead where relevant; the homepage keeps its brand tagline in the supporting copy.

The shared footer links to the Syntax Facebook page at `https://www.facebook.com/synatxinc`.

Reusable square icon SVGs have transparent backgrounds and outlined artwork (no font dependencies): [light-background version](public/syntax-icon.svg) and [dark-background version](public/syntax-icon-dark.svg). Both use a 1:1 viewBox and scale without losing quality.

Wide "syntax." wordmarks are also available for [white backgrounds](public/syntax-logo.svg) and [dark backgrounds](public/syntax-logo-dark.svg). They use the site's Manrope 800 lettering and spacing, converted to vector paths, with transparent backgrounds and an orange period.

Pricing follows the supplied specification in USD. SEO and complete website builds are custom-quoted. Retainers require an initial three-month commitment; hosting and third-party costs are separate unless specified.

## Public business information

The contact page and shared footer use `src/data/business.ts` for the public email, service areas, and business hours. Syntax visits customers in Fargo, ND and Moorhead, MN, with remote partnerships also available. Business hours are Monday–Friday, 8 am–5 pm local Central Time (CST/CDT); support availability and response times still follow each service agreement.

No street address or phone number is published. Syntax is a service-area business without a public storefront. In the existing Google Business Profile:

- Use the real-world business name **Syntax**, website `https://syntax.dev`, and the same business hours.
- Set Fargo and Moorhead as the actual on-site service areas and hide the business address from customers. Do not add a virtual office or treat remote reach as a local service area.
- Choose the most accurate available primary category and add only services actually offered.
- Keep holiday hours current, add genuine business photos, and request honest reviews without incentives.

A public Google Maps profile URL has not been supplied, so the website does not link to a guessed listing. The management Profile ID alone is not used as a public Maps URL. These website changes do not update the Google account.

Google's guidance: [Service-area businesses](https://support.google.com/business/answer/9157481) and [Business representation guidelines](https://support.google.com/business/answer/3038177).

## Canonical URLs and sitemap

The production URL is `https://syntax.dev`, configured in `astro.config.mjs`. Indexable pages emit absolute canonical and Open Graph URLs with trailing slashes and without query parameters or fragments. For example, `/contact/?plan=Managed%20IT` canonicalizes to `https://syntax.dev/contact/`; the selected service still works normally. Local development and preview hosts also emit production canonical URLs.

`@astrojs/sitemap` generates `dist/sitemap-index.xml` and `dist/sitemap-0.xml` during `npm run build`, including all five dedicated service pages. The 404 page is excluded and emits `noindex` without a canonical URL. `src/pages/robots.txt.ts` generates crawl rules and a sitemap declaration from the same production URL; the shared layout also links to the sitemap index.

Sitemaps are generated at build time, not by the dev server. Use `npm run build` and `npm run preview` to test their HTTP responses. After deployment, submit `https://syntax.dev/sitemap-index.xml` in Google Search Console. If the primary domain changes, update `site` and rebuild; canonical tags do not configure DNS or redirect alternate hosts.

## Analytics and consent

`src/components/AnalyticsConsent.astro` installs Google Tag Manager container `GTM-KFDKQHCV` only after a visitor accepts analytics cookies. Reject and Accept have equal prominence; the footer's **Cookie settings** control lets visitors change their choice.

The consent panel is a compact bottom-right card on desktop and fits within 12px mobile gutters. It retains 18px body text at the default browser font size and equal-width buttons with at least 44px height. On short viewports, the explanation scrolls while the heading and choices remain available.

- The choice is saved in local storage under `syntax-analytics-consent`. Unknown or unreadable choices keep tracking off and display the banner; storage errors are reported.
- No Google script, iframe, preconnect, or tracking request is added before acceptance or after a saved rejection. With JavaScript disabled, tracking remains off.
- The banner works locally, but Google only loads in production builds on `syntax.dev` and `www.syntax.dev`. Localhost, Netlify preview domains, and the separate client portal are not tracked by this installation.
- On acceptance, the consent defaults are queued before the tag initialization: analytics granted, advertising storage/user data/personalization denied.
- Revoking consent saves rejection and reloads the page to remove the running container; already-tracking tabs also reload when the stored choice is withdrawn. The settings panel warns about reloading and unsent forms. Revocation does not erase existing cookies or data already collected by Google.
- There is deliberately no unconditional GTM script or `noscript` tracking iframe, because either would bypass the opt-in requirement.

The container loader responds successfully, but installation alone does not verify Analytics reporting. In Google Tag Manager:

1. Check whether a Google Analytics destination/Google tag is already configured. If not, add one using the GA4 web stream's `G-…` Measurement ID or its associated Google Tag ID, not the `GTM-…` container ID.
2. Use **Initialization - All Pages** for that tag. If you add a consent template, run it on **Consent Initialization** and preserve analytics consent with all advertising consent denied; do not override the website's choices.
3. Keep the container limited to analytics. Advertising and unrelated third-party tags require separate consent and configuration.
4. Do not send names, email addresses, company names, contact messages, or other personal information to Analytics. Disable enhanced-measurement form interactions until the Formspree flow is reviewed; a form-submit event is not proof of a delivered inquiry.
5. Use **Preview / Tag Assistant** to test acceptance and rejection, then **Submit / Publish** the container. After deploying the website, accept analytics and check GA4 Realtime or DebugView.

Review your business's privacy notice and applicable consent requirements before launch. Google's privacy policy linked from the banner is not a substitute for your own privacy notice.

## Contact form

The contact form posts directly to the public Formspree endpoint configured in `src/pages/contact.astro`. It uses native HTML submission rather than a framework or JavaScript form library, so it also works without JavaScript. No deploy key or other credentials belong in the site.

- Name, email, company, and message are required; required fields and text-length limits use browser validation.
- The selected service or plan is included in the submission. Pricing links preselect it when JavaScript is enabled.
- A hidden `_gotcha` honeypot complements the spam protection configured in Formspree.
- Visitors leave the site to complete any Formspree verification and see its confirmation or errors. The site does not show success before Formspree accepts the submission.
- The form explains that entered information is sent to Formspree. No inquiry data is stored locally by the site.

Manage notification recipients, CAPTCHA, domain restrictions, and other settings in the Formspree Dashboard. Before launch, submit a test inquiry, complete any verification, and confirm both dashboard receipt and delivery to the intended inbox. Browser validation does not replace server-side spam protection or validation.

## Client support

The header, mobile menu, and Get Help page link to the live AlgaPSA Client Portal at `https://portal.syntax.dev`, configured in `src/data/business.ts`. Existing clients sign in to submit and track support tickets. Page-level contact calls to action still open the inquiry form. Active navigation uses an orange underline instead of dots.

The Get Help page separates **Ongoing support** (AlgaPSA tickets and follow-up) from **Quick remote session** (Zoho Assist, only when directed by a Syntax technician with a session code). Clients without a code are directed to AlgaPSA; first-time requests open the contact form with "Remote assistance" selected. The contact form sends email through Formspree, not an AlgaPSA ticket, and does not initiate a remote connection. Without JavaScript, contact-form visitors can select that option themselves.

The Zoho code form uses the supplied `https://assist.zoho.com/login/embed-remote-support.jsp` iframe. It has an accessible title and is held in an inert template until a visitor opens **Enter session code**, so visiting the page alone does not load Zoho. Opening it loads a third-party service independently of analytics consent; closing it hides the form but does not unload the running iframe. The supplied `https://assist.zoho.com/client/syntax` session-page link is always available as a fallback, including without JavaScript. That page also offers a request form, so the website directs visitors to **Join an instant remote support session**, not **Raise Your Request**; ongoing requests belong in AlgaPSA. Do not embed technician credentials or collect session codes in the website contact form or analytics.

Zoho is for one-off sessions, not the ongoing client portal. Test the embedded join form and fallback with a technician-issued code, customer permissions, and any required app download before relying on it; displaying a join form does not verify a completed remote connection. Continue using AlgaPSA for ticket tracking and Level for managed devices.

Level's documented remote-control workflow requires an installed, online agent and a technician starting the session from the device list. There is no Level API, admin login, public installer, enrollment key, or remote-control embed in this website.

As of November 2026, Level's official **Ad-hoc Remote Control / Quick Support** feature request is marked **Under consideration**. No Level public session-code or quick-connect website flow has been verified. Use Zoho Assist for quick sessions unless Level releases and documents a suitable option; a device enrollment link is not a one-time remote-support session.

As of November 2026, Level lists all features on its free account for the first 10 devices, but does not include ticketing on any plan. Its pricing says adding an 11th device starts billing for the entire fleet, not only the extra device. Do not publish enrollment links or automatically enroll devices from the public site.

Before offering attended remote support, configure Level's **Ask for approval** mode with **Require approval**, checking group-level overrides too. This is a Level account setting; the website cannot enforce it, and Level's documented default is only to notify the user.

AlgaPSA portal operations:

1. Manage client accounts and portal access in AlgaPSA; direct clients who need access to contact Syntax.
2. Update `clientPortalUrl` in `src/data/business.ts` if the public portal address changes; the header, mobile menu, and Get Help page share this value.
3. Test with a client account: sign-in, ticket creation, notifications, replies, and request tracking. A reachable login page alone does not verify these workflows.
4. The website links to the portal rather than embedding it or calling its API. No AlgaPSA credentials or tokens belong in the public site.

Official references:

- [Level pricing and free-device limits](https://level.io/pricing)
- [Level remote control requirements and workflow](https://docs.level.io/en/articles/9927521-remote-control)
- [Level remote control approval settings](https://docs.level.io/en/articles/9927385-remote-control-approval)
- [Why Level does not include ticketing](https://level.io/why-no-ticketing-or-psa)
- [Level ad-hoc remote control / quick support feature status](https://feedback.level.io/feedback/ad-hoc-remote-control-quick-support-ajmjqe)
- [AlgaPSA support and documentation](https://www.nineminds.com/support)
- [Zoho Assist customer widget](https://www.zoho.com/assist/help/remote-support/customer-widget.html)

## Before launch

- Review the public email, hours, and service areas in `src/data/business.ts`; add an optional public phone number, booking link, or verified Google Maps profile link only when supplied.
- Confirm Formspree delivery and spam settings, then review any additional privacy/legal notice needed for handling inquiries.
- Confirm pricing, SLA coverage/business-hour timezone, rollover terms, and service agreements.
- Confirm `https://syntax.dev` is the primary production domain, redirect alternate hosts in Netlify, and submit the generated sitemap in Google Search Console.
- Review final content and any required legal/privacy pages.

## Netlify

Import `jarossnd/syntax` from GitHub in Netlify and use `main` as the production branch. Keep the base directory at the repository root.

The committed `netlify.toml` configures:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 24

No Netlify CLI, Astro adapter, serverless functions, or environment secrets are required for this static site. Contact submissions continue to use Formspree; Netlify Forms is not needed.

Once the initial deploy succeeds, test Home, Services, Get Help, Contact, and an unknown URL (which should show the custom 404). Confirm the contact form still delivers from the deployed site, especially if Formspree domain restrictions are enabled.

Connect `syntax.dev` through Netlify's domain settings when ready. Configure the requested DNS records at the domain's DNS provider and confirm HTTPS is active before using the domain publicly.

## Source repository

The source is published at [github.com/jarossnd/syntax](https://github.com/jarossnd/syntax) on the `main` branch.

Publishing source does not deploy the website until Netlify's GitHub integration is connected. Netlify configuration is included, but no hosted site or DNS records have been created by this project.
