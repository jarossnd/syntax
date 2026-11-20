# Syntax

A static Astro website for Syntax, the trade name of Syntax Inc. White, near-black, and orange; self-hosted Manrope and DM Sans fonts.

## Local development

Use Node.js 22.23.4 or newer, as required by Astro.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. The site includes Home (`/`), Services and pricing (`/services/`), Contact (`/contact/`), and a custom 404 page.

```sh
npm run check
npm run build
npm run preview
```

The production build is static HTML in `dist/`. No server adapter, database, external font requests, or client framework is required. The contact page has a small script to preselect a plan from pricing links. Navigation and FAQs use native HTML.

## Content

- Shared service descriptions and retainer plans: `src/data/services.ts`
- Hourly rates, hosting plans, billing policies, and commitment terms: `src/pages/services.astro`
- Global styles and responsive layouts: `src/styles/global.css`
- Shared metadata, navigation, and footer: `src/layouts/Layout.astro`

Pricing follows the supplied specification in USD. SEO and complete website builds are custom-quoted. Retainers require an initial three-month commitment; hosting and third-party costs are separate unless specified.

## Contact form

The contact form posts directly to the public Formspree endpoint configured in `src/pages/contact.astro`. It uses native HTML submission rather than a framework or JavaScript form library, so it also works without JavaScript. No deploy key or other credentials belong in the site.

- Email and message are required; optional name/company fields and text-length limits use browser validation.
- The selected service or plan is included in the submission. Pricing links preselect it when JavaScript is enabled.
- A hidden `_gotcha` honeypot complements the spam protection configured in Formspree.
- Visitors leave the site to complete any Formspree verification and see its confirmation or errors. The site does not show success before Formspree accepts the submission.
- The form explains that entered information is sent to Formspree. No inquiry data is stored locally by the site.

Manage notification recipients, CAPTCHA, domain restrictions, and other settings in the Formspree Dashboard. Before launch, submit a test inquiry, complete any verification, and confirm both dashboard receipt and delivery to the intended inbox. Browser validation does not replace server-side spam protection or validation.

## Before launch

- Supply the public email, optional phone number, and any booking link.
- Confirm Formspree delivery and spam settings, then review any additional privacy/legal notice needed for handling inquiries.
- Confirm pricing, SLA coverage/business-hour timezone, rollover terms, and service agreements.
- Set the production `site` URL in `astro.config.mjs`, then add canonical URLs and a sitemap using that verified domain.
- Review final content and any required legal/privacy pages.

## Source repository

The source is published at [github.com/jarossnd/syntax](https://github.com/jarossnd/syntax) on the `main` branch.

Publishing source does not deploy the website. Hosting and DNS for the intended domain, `syntax.dev`, have not been configured by this project.
