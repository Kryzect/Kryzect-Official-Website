export const UTILITY_PAGES = [
  {
    slug: 'privacy',
    label: 'Privacy',
    kicker: 'Website information',
    heroText:
      'How information is handled when you browse this website or contact Kryzect.',
    lastUpdated: '2026-10-26',
    sections: [
      {
        heading: 'Information and purposes',
        paragraphs: [
          'We use the details you provide to respond to enquiries, discuss a potential project, and manage any agreed engagement. The form asks for your name, email, and goal; company and project context are optional. Please do not send passwords or sensitive client records.',
          'Hosting and service providers also process technical request information, such as IP addresses and browser details, to deliver and protect their services.',
        ],
        contact: false,
      },
      {
        heading: 'Contact forms and email',
        paragraphs: [
          'Form submissions are sent to Web3Forms for delivery to our Gmail inbox. Direct email is handled by our email provider. We use these messages to respond and communicate with you; we do not sell enquiry information.',
        ],
        contact: false,
      },
      {
        heading: 'Call booking',
        paragraphs: [
          'The booking link opens Google Calendar appointment scheduling. Google processes the booking details you enter and supplies Google Meet details after booking. The information is used to arrange and conduct the call.',
        ],
        contact: false,
      },
      {
        heading: 'AI assistant',
        paragraphs: [
          'The AI assistant is intended for business enquiries from adults aged 18 or older. Sending a message confirms that you meet that age requirement. The website pages and direct contact options remain available without AI chat.',
          'When AI is enabled, your message and a short recent conversation are sent through our server to Google Gemini or, if needed, OpenRouter and its selected model provider to produce a reply. When AI is not configured or is disabled, saved-source answers are generated in your browser without sending the question to our chat API. A saved-source answer after an attempted AI reply does not mean the message was never sent. Please do not share passwords, confidential records, or sensitive personal information. Provider processing, retention, and any use for service improvement depend on their applicable terms and account settings; we do not promise zero provider retention.',
          'Chat history stays in the current page memory and is cleared by Clear chat or a page refresh. We do not store chat transcripts in an application database. Hosting and AI providers may keep their own technical records. We may record operational metadata such as response times, provider status, token usage, and error categories without message contents.',
          'For abuse prevention and usage limits, an expiring store may hold pseudonymous request counters and short-lived provider availability flags. It does not store your message text. You can use direct contact or booking instead of the assistant. AI replies may be mistaken; project scope, pricing, and commitments are confirmed by a person.',
        ],
        contact: false,
      },
      {
        heading: 'Hosting and fonts',
        paragraphs: [
          'This website is hosted on Vercel. Fonts are served with the website; browsing does not request fonts from Google Fonts. We do not deploy visitor analytics or advertising trackers in the site code. Providers may maintain technical or security logs under their own policies.',
        ],
        contact: false,
      },
      {
        heading: 'Service providers',
        paragraphs: [
          'Vercel, Web3Forms, and Google provide hosting, form delivery, email, scheduling, meeting, and AI services. OpenRouter and its selected model providers may process assistant messages during fallback; Upstash provides expiring abuse-prevention counters when configured. Providers may process information in countries different from your own. Their own privacy terms also apply when you use their services.',
        ],
        contact: false,
      },
      {
        heading: 'Retention and requests',
        paragraphs: [
          'Enquiry correspondence is retained while needed to respond and manage the relationship, and where records must be kept for contractual or legal reasons. You can contact us to ask about, correct, or request deletion of your information. Rights and exceptions depend on the law applicable to your circumstances.',
        ],
        contact: false,
      },
      {
        heading: 'Contact',
        paragraphs: [
          'For privacy questions or requests, email Kryzect using the address below.',
        ],
        contact: true,
      },
    ],
  },
  {
    slug: 'cookies',
    label: 'Cookies',
    kicker: 'Website information',
    heroText: 'The website does not use advertising or analytics cookies.',
    lastUpdated: '2026-10-26',
    sections: [
      {
        heading: 'Website storage',
        paragraphs: [
          'The website code does not set cookies or store enquiry messages in browser storage. The form holds your input in memory while the page is open.',
          'A session-storage flag remembers whether the homepage brand intro has been shown in the current tab session. It contains no enquiry information and is not used for analytics or advertising. If session storage is unavailable, the automatic intro is skipped.',
          'The assistant keeps the current conversation and a random session identifier in page memory, without persistent browser storage or an assistant cookie. Clearing the chat removes its messages; refreshing resets page memory. Expiring server-side counters help prevent abuse.',
        ],
        contact: false,
      },
      {
        heading: 'External services',
        paragraphs: [
          'Links to Google Calendar, social platforms, the product experiment, and other external websites open services with their own cookie and storage practices. Their policies apply on those sites.',
        ],
        contact: false,
      },
      {
        heading: 'Browser controls',
        paragraphs: [
          'You can manage cookies and website storage through your browser settings. Blocking JavaScript disables form submission; direct email remains available.',
        ],
        contact: false,
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Contact us if you have a question about website storage.',
        ],
        contact: true,
      },
    ],
  },
  {
    slug: 'security',
    label: 'Security',
    kicker: 'Website information',
    heroText: 'How we handle project enquiries and approach secure delivery.',
    lastUpdated: '2026-10-26',
    sections: [
      {
        heading: 'This website',
        paragraphs: [
          'The public website is a static site. Enquiries use a hosted delivery provider; booking uses Google Calendar. Do not include credentials, confidential records, or production logs in the enquiry form.',
        ],
        contact: false,
      },
      {
        heading: 'Project information',
        paragraphs: [
          'Information you share for a project is used to discuss and deliver the agreed work. Confidentiality, access, data handling, and any specialist security requirements are agreed for each engagement.',
        ],
        contact: false,
      },
      {
        heading: 'Engineering approach',
        paragraphs: [
          'Security requirements are considered with the scope: input validation, access boundaries, dependency maintenance, deployment configuration, and handover responsibilities. Requirements vary by project; this page is not a certification or assurance of compliance for a particular system.',
        ],
        contact: false,
      },
      {
        heading: 'Reporting a concern',
        paragraphs: [
          'Email a description and reproduction steps for suspected security issues. Please avoid sending sensitive data in the initial message and allow time for investigation before public disclosure.',
        ],
        contact: true,
      },
    ],
  },
  {
    slug: 'terms',
    label: 'Terms',
    kicker: 'Website information',
    heroText: 'Terms for browsing the Kryzect website.',
    lastUpdated: '2026-10-26',
    sections: [
      {
        heading: 'Website information',
        paragraphs: [
          'This website describes Kryzect and its services. Descriptions are informational, not a binding offer or a guarantee of project results. Use of the website does not create a client engagement.',
        ],
        contact: false,
      },
      {
        heading: 'Content and acceptable use',
        paragraphs: [
          'Website content and brand assets belong to their respective owners. You may link to the site and refer to its content with attribution. Commercial reuse of Kryzect brand assets or content requires permission. Do not interfere with the website, misuse the enquiry service, or submit harmful content.',
        ],
        contact: false,
      },
      {
        heading: 'External links',
        paragraphs: [
          'External websites, social profiles, scheduling tools, and product experiments have their own terms and availability. We do not control third-party services.',
        ],
        contact: false,
      },
      {
        heading: 'Client engagements',
        paragraphs: [
          'Scope, fees, payment milestones, confidentiality, intellectual property, handover, support, and changes are defined in separate project agreements. Those agreements govern client work.',
        ],
        contact: false,
      },
      {
        heading: 'Availability and changes',
        paragraphs: [
          'We may update website content and functionality. While we work to keep information accurate, the site is provided for general information and may contain errors or interruptions. Nothing in these terms excludes rights that cannot lawfully be excluded.',
        ],
        contact: false,
      },
      {
        heading: 'Questions',
        paragraphs: [
          'Contact Kryzect if you have questions about website content or use.',
        ],
        contact: true,
      },
    ],
  },
  {
    slug: 'accessibility',
    label: 'Accessibility',
    kicker: 'Website information',
    heroText:
      'We aim to make the website usable across different abilities and devices.',
    lastUpdated: '2026-10-26',
    sections: [
      {
        heading: 'Our approach',
        paragraphs: [
          'We use semantic pages, labeled form fields, keyboard-operable controls, visible focus, and responsive layouts. Our working target is WCAG 2.2 AA. This is a target, not a claim of independent certification.',
        ],
        contact: false,
      },
      {
        heading: 'Motion and navigation',
        paragraphs: [
          'Decorative motion is disabled when reduced motion is requested. The skip link moves to the main content. Mobile navigation can be closed with Escape.',
        ],
        contact: false,
      },
      {
        heading: 'Forms and external services',
        paragraphs: [
          'Form errors identify the field that needs attention. Email is available as an alternative. External booking and social services are controlled by their providers.',
        ],
        contact: false,
      },
      {
        heading: 'Feedback',
        paragraphs: [
          'If something prevents you from using the site, email the page address, the issue, and any browser or assistive technology details you are comfortable sharing.',
        ],
        contact: true,
      },
    ],
  },
]
export const getUtilityPage = (slug) =>
  UTILITY_PAGES.find((page) => page.slug === slug) ?? null
