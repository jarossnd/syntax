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

Each main page supplies a descriptive title and one H1 naming its service or purpose. Marketing titles identify Syntax and include Fargo–Moorhead where relevant; the homepage keeps its brand tagline in the supporting copy.

The shared footer links to the Syntax Facebook page at `https://www.facebook.com/synatxinc`.

Reusable square icon SVGs have transparent backgrounds and outlined artwork (no font dependencies): [light-background version](public/syntax-icon.svg) and [dark-background version](public/syntax-icon-dark.svg). Both use a 1:1 viewBox and scale without losing quality.

Wide "syntax." wordmarks are also available for [white backgrounds](public/syntax-logo.svg) and [dark backgrounds](public/syntax-logo-dark.svg). They use the site's Manrope 800 lettering and spacing, converted to vector paths, with transparent backgrounds and an orange period.

Pricing follows the supplied specification in USD. SEO and complete website builds are custom-quoted. Retainers require an initial three-month commitment; hosting and third-party costs are separate unless specified.

## Analytics and consent

`src/components/AnalyticsConsent.astro` installs Google Tag Manager container `GTM-KFDKQHCV` only after a visitor accepts analytics cookies. Reject and Accept have equal prominence; the footer's **Cookie settings** control lets visitors change their choice.

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

The header and mobile menu link to the Client Portal at `https://portal.syntax.dev`. Page-level contact calls to action still open the inquiry form. Active navigation uses an orange underline instead of dots.

The Get Help page provides a remote-assistance request link and a clearly disabled Jira Service Management portal panel. The remote-assistance link opens the existing contact form with "Remote assistance" selected; it sends an email through Formspree, not a Jira ticket, and does not initiate a remote connection. Without JavaScript, clients can select that option themselves.

Level's documented remote-control workflow requires an installed, online agent and a technician starting the session from the device list. There is no Level API, admin login, public installer, enrollment key, or remote-control embed in this website.

As of November 2026, Level lists all features on its free account for the first 10 devices, but does not include ticketing on any plan. Its pricing says adding an 11th device starts billing for the entire fleet, not only the extra device. Do not publish enrollment links or automatically enroll devices from the public site.

Before offering attended remote support, configure Level's **Ask for approval** mode with **Require approval**, checking group-level overrides too. This is a Level account setting; the website cannot enforce it, and Level's documented default is only to notify the user.

To connect ticketing later:

1. Create a Jira Service Management service project and configure customer access and request types. The currently advertised Free plan supports up to 3 agents.
2. Provide the public customer portal URL; replace the disabled panel action in `src/pages/get-help.astro` with that verified link and update the status text and FAQ.
3. If an embedded experience is preferred, use the code generated by Jira's **Channels & self service → Widget → Embed code**, not an API token or a guessed script configuration. Confirm the request type's required fields are supported by the widget.
4. Test customer access, actual ticket creation, notifications, and request tracking before claiming they are available.

Official references:

- [Level pricing and free-device limits](https://level.io/pricing)
- [Level remote control requirements and workflow](https://docs.level.io/en/articles/9927521-remote-control)
- [Level remote control approval settings](https://docs.level.io/en/articles/9927385-remote-control-approval)
- [Why Level does not include ticketing](https://level.io/why-no-ticketing-or-psa)
- [Atlassian plan details](https://www.atlassian.com/collections/service/pricing)
- [Atlassian's official widget instructions](https://support.atlassian.com/jira-service-management-cloud/docs/embed-a-widget-onto-a-web-page/)

## Before launch

- Supply the public email, optional phone number, and any booking link.
- Confirm Formspree delivery and spam settings, then review any additional privacy/legal notice needed for handling inquiries.
- Confirm pricing, SLA coverage/business-hour timezone, rollover terms, and service agreements.
- Set the production `site` URL in `astro.config.mjs`, then add canonical URLs and a sitemap using that verified domain.
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
