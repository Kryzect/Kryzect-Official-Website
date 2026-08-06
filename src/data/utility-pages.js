// Kryzect — utility page content (Terms / Privacy / Cookies / Security / Accessibility).
// SINGLE source of truth. Edit here, not in the page component.
//
// "Last updated" dates are FIXED and generic-but-realistic. They are updated
// ONLY when the content on this page actually changes. Do not bump them as a
// routine or cosmetic step.
//
// Honesty rule: policies describe the infrastructure that actually exists.
// The site is a static site with no analytics and no non-essential cookies;
// the contact form and booking calendar are not yet configured. Nothing here
// claims systems the site does not use.
//
// The contact email used in each page is pulled from src/config.js
// (CONTACT_EMAIL) at render time — never hardcode an address here.
//
// Section model: { heading, paragraphs?: string[], list?: string[], contact?: boolean }
//   - paragraphs render as <p>
//   - list renders as a <ul>
//   - contact: true renders the email button using CONTACT_EMAIL

export const UTILITY_PAGES = [
  {
    slug: 'terms',
    label: 'Terms',
    kicker: 'Legal',
    heroText:
      'The terms that apply when you use this website and engage with Kryzect.',
    lastUpdated: '2026-08-06',
    sections: [
      {
        heading: '1. Website use',
        paragraphs: [
          'These Terms of Use govern your access to and use of the Kryzect website and the information it contains. By using this site, you agree to these terms. If you do not agree, please do not use the site.',
          'This website describes what Kryzect does. Using it does not create an engagement. Work is only undertaken through separate, written client agreements (see section 9).',
        ],
      },
      {
        heading: '2. Intellectual property',
        paragraphs: [
          'The content of this website — including text, design, the Kryzect logo, and other brand assets — belongs to Kryzect or its licensors and is protected by intellectual property laws.',
          'You may view and share this content for personal, non-commercial reference with attribution. You may not reproduce, modify, or republish it for commercial purposes without our written permission.',
        ],
      },
      {
        heading: '3. Content ownership',
        paragraphs: [
          'This website does not grant you any ownership or licence over its content beyond the limited, non-commercial use described above.',
          'Intellectual property created for clients under a written agreement belongs to that client per the terms of their contract.',
        ],
      },
      {
        heading: '4. Acceptable use',
        paragraphs: [
          'You agree to use this website lawfully and not to interfere with its operation or security.',
          'You may not attempt to disrupt the site, probe it for vulnerabilities beyond reasonable disclosure practice, scrape it aggressively, or use it to distribute harmful content.',
        ],
      },
      {
        heading: '5. Third-party links',
        paragraphs: [
          'This site links to external services such as GitHub, LinkedIn, hosted form providers, and other websites. Those links are provided for convenience; we do not control and are not responsible for their content, privacy practices, or availability.',
        ],
      },
      {
        heading: '6. Disclaimers',
        paragraphs: [
          'This website is provided "as is" and for information only. While we do our best to keep it accurate and current, we make no guarantees about the completeness or accuracy of the content.',
          'Descriptions of services on this site are informational and are not a binding offer. Nothing on this site is a promise of specific project outcomes.',
        ],
      },
      {
        heading: '7. Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, Kryzect is not liable for any damages arising from your use of this website or from reliance on its content.',
        ],
      },
      {
        heading: '8. Changes to these terms',
        paragraphs: [
          'We may update these terms from time to time to reflect how the site or our business works. When we do, the "Last updated" date above is revised.',
          'Continued use of the site after changes take effect means you accept the updated terms.',
        ],
      },
      {
        heading: '9. These are not client contracts',
        paragraphs: [
          'These website terms are not client contracts. They govern use of this website only.',
          'Client work is governed by separate, written agreements agreed with you per project, including:',
        ],
        list: [
          'Proposal',
          'Scope of work (SOW)',
          'Contract',
          'Payment terms',
          'Intellectual property',
          'Confidentiality',
          'Support',
        ],
      },
      {
        heading: '10. Contact',
        contact: true,
        paragraphs: [
          'If you have questions about these terms, reach us by email at the address below.',
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    label: 'Privacy',
    kicker: 'Legal',
    heroText:
      'How Kryzect handles the information you share with us, plainly explained.',
    lastUpdated: '2026-08-06',
    sections: [
      {
        heading: '1. Information we collect',
        paragraphs: [
          'This website is a static site. It does not run analytics or tracking scripts on its own, and it does not set non-essential cookies. We collect only the information you choose to send us.',
        ],
      },
      {
        heading: '2. Contact form data',
        paragraphs: [
          'If you use the contact form, we receive what you provide: your name, email address, company (optional), and the details of your project or question. The form also asks about your timeline, service interest, and current system if you choose to share them.',
        ],
      },
      {
        heading: '3. Booking information',
        paragraphs: [
          'If you book a call, we receive the details you provide to schedule it — typically your name and contact information. The booking calendar is not yet configured, so no booking data is currently collected.',
        ],
      },
      {
        heading: '4. Email communications',
        paragraphs: [
          'If you email us directly, we receive your email address and the contents of your message. We use email correspondence to respond and, where relevant, to deliver services.',
        ],
      },
      {
        heading: '5. Analytics',
        paragraphs: [
          'No analytics are currently deployed on this website. If analytics are added in the future, this policy will be updated to describe what is collected and how it is used.',
        ],
      },
      {
        heading: '6. Cookies',
        paragraphs: [
          'This website does not currently set cookies. If non-essential cookies are added later, they will be documented in our Cookie Policy.',
        ],
      },
      {
        heading: '7. How we use data',
        paragraphs: [
          'We use the information you share to respond to your enquiry, discuss your project, and, if we work together, to deliver our services.',
          'We do not sell your personal information, and we do not use it for unrelated marketing without your consent.',
        ],
      },
      {
        heading: '8. How data is stored',
        paragraphs: [
          'This website is a static site hosted on Vercel. Information you submit through the contact form or email is received by the hosted providers we use (see "Third-party services") and forwarded to us at our email address.',
        ],
      },
      {
        heading: '9. Third-party services',
        paragraphs: [
          'We use a limited set of third-party services to run the site and receive enquiries: the static hosting provider (Vercel), a hosted form provider (once configured), an email provider, and tools we may use to schedule calls.',
          'These providers receive only what is necessary for the task and apply their own security and data-handling practices. We do not otherwise share your information with third parties unless required by law.',
        ],
      },
      {
        heading: '10. Retention',
        paragraphs: [
          'We keep the information you send us for as long as needed to respond to you and manage our relationship, and where legally required.',
          'If you ask us to delete your information and we are not otherwise required to keep it, we will remove it.',
        ],
      },
      {
        heading: '11. Your rights (incl. GDPR/CCPA)',
        paragraphs: [
          'If you are located in the EU, UK, or California, you have rights over your personal information, including the right to access, correct, or delete it, and to object to or restrict certain processing.',
          'To exercise any of these rights, email us at the address below and we will respond within the timeframes required by applicable law.',
        ],
      },
      {
        heading: '12. Contact',
        contact: true,
        paragraphs: [
          'For any privacy question or request, contact us at the address below.',
        ],
      },
    ],
  },
  {
    slug: 'cookies',
    label: 'Cookies',
    kicker: 'Legal',
    heroText:
      'What cookies (if any) this website uses, and how you can control them.',
    lastUpdated: '2026-08-06',
    sections: [
      {
        heading: '1. Necessary cookies',
        paragraphs: [
          'This website is a static site and does not require login or session functionality, so it does not currently use necessary cookies for its operation.',
        ],
      },
      {
        heading: '2. Analytics cookies',
        paragraphs: [
          'No analytics cookies are used. No analytics or tracking scripts are deployed on this website.',
        ],
      },
      {
        heading: '3. Third-party cookies',
        paragraphs: [
          'Third-party services we may link to (such as GitHub, LinkedIn, or future form/booking providers) may set their own cookies on their own sites. We do not control those cookies.',
        ],
      },
      {
        heading: '4. Controlling cookies',
        paragraphs: [
          'You can control and delete cookies in your browser settings, and you can block cookies entirely. Because this site does not use cookies, blocking them should not affect your ability to browse it.',
        ],
      },
      {
        heading: '5. Contact',
        contact: true,
        paragraphs: [
          'If you have questions about cookies on this site, email us at the address below.',
        ],
      },
    ],
  },
  {
    slug: 'security',
    label: 'Security',
    kicker: 'Legal',
    heroText:
      'How Kryzect approaches the confidentiality and protection of your information.',
    lastUpdated: '2026-08-06',
    sections: [
      {
        heading: '1. Security mindset',
        paragraphs: [
          'We treat security as part of how we work, not an afterthought. The default is to ask "what could go wrong" before "how do we build it".',
        ],
      },
      {
        heading: '2. Secure development principles',
        paragraphs: [
          'We follow security-in-depth principles in what we build: validate input, apply the principle of least privilege, keep dependencies reviewed, and handle secrets properly.',
        ],
      },
      {
        heading: '3. Secret management',
        paragraphs: [
          'We do not put credentials, API keys, or secrets into client-side code or public repositories. Secrets are managed separately and we audit before publishing.',
        ],
      },
      {
        heading: '4. Least privilege',
        paragraphs: [
          'Access to systems and data is limited to what is genuinely needed, for the people and processes that need it.',
        ],
      },
      {
        heading: '5. Dependency management',
        paragraphs: [
          'We keep dependencies updated and review known vulnerabilities before they reach production.',
        ],
      },
      {
        heading: '6. Secure deployment',
        paragraphs: [
          'Deployments go through our build pipeline, and we verify a build before it ships. This website is served over HTTPS.',
        ],
      },
      {
        heading: '7. Data handling principles',
        paragraphs: [
          'We treat the details you share with us — your business context, project ideas, source material, and any non-public information — as confidential.',
          'We do not include confidential client or project details in public materials without your permission.',
        ],
      },
      {
        heading: '8. Reporting a vulnerability',
        paragraphs: [
          'If you believe you have found a security issue on this website or in something we have built, please tell us privately at the address below.',
          'Include a description of the issue and, if possible, steps to reproduce. We will review reports and respond as quickly as we reasonably can. Please do not exploit issues or share them publicly before we have had a chance to fix them.',
        ],
      },
      {
        heading: '9. Contact',
        contact: true,
        paragraphs: [
          'To report a vulnerability or ask a security question, email us at the address below.',
        ],
      },
    ],
  },
  {
    slug: 'accessibility',
    label: 'Accessibility',
    kicker: 'Legal',
    heroText:
      'Our commitment to making this website usable by everyone, regardless of ability.',
    lastUpdated: '2026-08-06',
    sections: [
      {
        heading: '1. Commitment',
        paragraphs: [
          'We build for real people, and that includes people who use assistive technology. We aim to make this website accessible to as many people as possible.',
          'Accessibility is treated as part of how we work, not an add-on. We target conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level as our working standard.',
        ],
      },
      {
        heading: '2. Keyboard accessibility',
        paragraphs: [
          'The site is designed to be fully navigable by keyboard: all menus, links, buttons, and form fields are reachable and operable with the keyboard, with visible focus states.',
        ],
      },
      {
        heading: '3. Readable contrast',
        paragraphs: [
          'Colour choices are made to keep text readable against the site background. Wherever possible, we use sufficient contrast for body text and interactive elements.',
        ],
      },
      {
        heading: '4. Semantic HTML',
        paragraphs: [
          'Pages use semantic markup — landmarks, headings in a logical hierarchy, lists, and native elements — so screen readers and other assistive tools can interpret the structure correctly.',
        ],
      },
      {
        heading: '5. Labels and alt text',
        paragraphs: [
          'Form fields have descriptive labels, and images that convey meaning carry appropriate alt text. Decorative elements are hidden from assistive technology where appropriate.',
        ],
      },
      {
        heading: '6. Reduced motion',
        paragraphs: [
          'We respect the prefers-reduced-motion setting, meaning decorative animation is skipped for visitors who ask for less motion.',
        ],
      },
      {
        heading: '7. Responsive design',
        paragraphs: [
          'The site is responsive and works across screen sizes, from small phones to wide desktop displays, without losing content or functionality.',
        ],
      },
      {
        heading: '8. Accessible forms',
        paragraphs: [
          'Forms use real labels, clear error messages that are announced to assistive technology, and status regions that inform users of progress.',
        ],
      },
      {
        heading: '9. Reporting a problem',
        paragraphs: [
          'If you encounter any accessibility issue on this site, please tell us. We genuinely want to know and will fix what we can.',
        ],
      },
      {
        heading: '10. Contact',
        contact: true,
        paragraphs: [
          'Send accessibility feedback to the address below.',
        ],
      },
    ],
  },
]

export function getUtilityPage(slug) {
  return UTILITY_PAGES.find((page) => page.slug === slug)
}
