// Approved editorial package, transcribed without rewriting.
// Publication candidate: update the date before release if publication occurs later.
import { SITE_URL } from '../../config.js'

export const PHP2SHELL_ARTICLE = {
  slug: 'ai-cybersecurity-php2shell',
  breadcrumbLabel: 'PHP2Shell and AI security',
  title:
    'AI Is Finding Security Flaws Faster Than Ever. Are We Ready for What Comes Next?',
  seoTitle:
    'PHP2Shell, AI and the Gap Between Finding and Fixing Flaws | Kryzect',
  subtitle:
    'How PHP2Shell exposed the awkward distance between discovering a serious vulnerability and making the software behind it safe.',
  excerpt:
    'PHP2Shell showed how AI-assisted vulnerability research can outrun the work of fixing and deploying software. A closer look at what happened and why it matters.',
  category: 'Engineering',
  author: 'Kryzect',
  authorType: 'Organization',
  authorUrl: SITE_URL,
  date: '2026-10-28',
  researchCutoff: '2026-10-27',
  editorial: true,
  showCta: false,
  coverImage: {
    src: '/images/articles/php2shell-hero.webp',
    width: 1600,
    height: 900,
    alt: 'A focused beam of blue light revealing a narrow opening between layers of an intricate dark metal mechanism',
  },
  socialImage: '/images/articles/php2shell-hero.jpg',
  tags: [
    'AI security',
    'PHP2Shell',
    'software security',
    'vulnerability research',
    'security engineering',
  ],
  content: [
    {
      type: 'p',
      text: 'A dangerous bug does not always arrive with a dramatic discovery. Sometimes someone finds the first signs of it, people discuss a possible fix, and the issue sits unresolved because every proposed change has consequences elsewhere.',
      variant: 'body',
    },
    {
      type: 'p',
      text: "That is part of what happened inside PHP. In 2024, a developer encountered an out-of-memory problem while working on findings from an external audit. The security team considered whether the problem could be exploited. It couldn't establish a concrete attack path at the time, and attempts to fix it ran into difficult trade-offs. Two years later, researchers showed that the same underlying weakness could lead to remote code execution. AI-assisted research had helped turn a worrying possibility into something demonstrable.",
      variant: 'body',
    },
    {
      type: 'p',
      text: 'The October 2026 episode became known as PHP2Shell. Its most useful lesson has little to do with any one programming language. We are getting faster at finding ways software can fail. The work required to make that software safe does not necessarily move at the same speed.',
      variant: 'body',
    },
    {
      type: 'h2',
      text: 'The vulnerability that was hiding in plain sight',
    },
    {
      type: 'p',
      text: 'To understand why this mattered, it helps to know where the problems lived. The two critical vulnerabilities disclosed on October 21, 2026, were in PHP itself, not simply in a vulnerable WordPress plugin or a carelessly written website. They involved memory management and error handling, operations that happen deep inside the runtime.',
      variant: 'body',
    },
    {
      type: 'p',
      text: [
        {
          type: 'text',
          text: 'The first, ',
        },
        {
          type: 'link',
          text: 'CVE-2026-109618',
          href: 'https://www.php.net/archive/2026.php',
        },
        {
          type: 'text',
          text: ', concerned what could happen when PHP ran out of memory at the wrong moment. Internal data might be left only partly initialized and then handled as though it were valid. The second, ',
        },
        {
          type: 'link',
          text: 'CVE-2026-109619',
          href: 'https://www.php.net/archive/2026.php',
        },
        {
          type: 'text',
          text: ', concerned internal state that could outlive the memory it referred to. Under certain conditions, those mistakes could be used to corrupt memory, disclose information or execute code on an affected server.',
        },
      ],
      variant: 'body',
    },
    {
      type: 'p',
      text: 'That last phrase deserves care. Remote code execution means an attacker can cause a server to run instructions they control. It does not mean every website using PHP was taken over, or that every installation could be attacked in the same way. The researchers demonstrated serious attack paths in representative environments. Actual exploitability depended on the setup and conditions.',
      variant: 'body',
    },
    {
      type: 'p',
      text: [
        {
          type: 'text',
          text: "The first signs of the out-of-memory issue surfaced in 2024, during the PHP Foundation's work following an audit by Quarkslab. The PHP Foundation's own account is unusually candid: a fix was considered, but the available options carried costs. Some threatened backward compatibility; others raised denial-of-service concerns or required changes across extensions. With a small group of engineers who understood those internals, the decision stalled. The Foundation later described the delay as a structural failure, not a lack of interest in security. ",
        },
        {
          type: 'link',
          text: 'Its explanation is worth reading in full.',
          href: 'https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/',
        },
      ],
      variant: 'body',
    },
    {
      type: 'p',
      text: 'There is an important difference between knowing that a state-management problem exists and proving that somebody on the internet can turn it into a working exploit. In 2024, the latter was still uncertain. By August 2026, it was not.',
      variant: 'body',
    },
    {
      type: 'h2',
      text: 'What AI changed',
    },
    {
      type: 'p',
      text: "The crucial development wasn't an AI system spontaneously attacking PHP. It was security researchers using increasingly capable tools as part of investigations they designed and validated.",
      variant: 'body',
    },
    {
      type: 'p',
      text: [
        {
          type: 'text',
          text: 'According to the PHP Foundation, Calif began an audit in late July and reported an unconditional remote-code-execution path tied to the old out-of-memory problem on August 11. OpenAI independently reported the same root cause and later additional attack vectors. Wiz reported further findings in August. ',
        },
        {
          type: 'link',
          text: "Wiz's technical account",
          href: 'https://www.wiz.io/blog/php2shell-php-rce',
        },
        {
          type: 'text',
          text: ' describes frontier AI models helping researchers investigate the engine and develop complex exploitation chains.',
        },
      ],
      variant: 'body',
    },
    {
      type: 'p',
      text: 'Researchers still had to choose where to look, understand the results, reproduce failures, and establish what worked. The PHP security team, for its part, says it uses AI to help validate and group incoming reports, while humans make decisions and work on the patches. That distinction matters. The models were neither incidental nor the sole authors of the research.',
      variant: 'body',
    },
    {
      type: 'p',
      text: 'What changed was the cost of getting from a suspicious behavior to convincing evidence of impact. A flaw that had resisted practical demonstration became much easier for a well-equipped researcher to analyze. The benefits are real: the same tools can help defenders uncover bugs before somebody else does. But discovery has a second effect. Once a difficult exploit becomes practical to construct, the time available for everyone downstream may shrink.',
      variant: 'body',
    },
    {
      type: 'p',
      text: 'That is a different problem from asking whether AI is good or bad for cybersecurity. The interesting question is what happens to the rest of the security process when its first stage speeds up.',
      variant: 'body',
    },
    {
      type: 'h2',
      text: 'When the disclosure plan fell apart',
    },
    {
      type: 'p',
      text: 'The plan was to give the PHP project and downstream distributors time to prepare updates before details were made public. The Foundation says that, as of October 20, the coordinated release was scheduled for October 22. Then events began to outrun the schedule.',
      variant: 'body',
    },
    {
      type: 'p',
      text: 'On October 20, the two vulnerability identifiers appeared online alongside incorrect severity and release information. The Foundation says those early posts did not contain technical exploit details, but they prompted an earlier public notice and a decision to move the release forward by a day. Later, Calif accidentally published a demonstration video. Copies spread after it was removed. The following morning, a distributor published updated container images ahead of the coordinated disclosure, exposing the fix for others to inspect before ordinary users had the official release.',
      variant: 'body',
    },
    {
      type: 'p',
      text: [
        {
          type: 'text',
          text: 'The patches shipped on October 21 in PHP 8.5.12, 8.4.27, 8.3.36, and 8.2.35. The associated issues were rated 9.2 under CVSS v4.0. Those are historical release details, not a recommendation to install those exact versions forever. For a system being maintained today, the latest supported release and current advisories are the right references. ',
        },
        {
          type: 'link',
          text: "PHP's official security announcements",
          href: 'https://www.php.net/archive/2026.php',
        },
        {
          type: 'text',
          text: ' document the releases and affected configurations.',
        },
      ],
      variant: 'body',
    },
    {
      type: 'p',
      text: [
        {
          type: 'text',
          text: 'The danger was not purely theoretical. AWS later reported that its MadPot sensor network had recorded an apparent PHP2Shell exploitation attempt on October 17, before public disclosure. AWS could not determine how that actor learned about the weakness. An attempt against a honeypot is also not the same thing as proof of a widespread compromise. ',
        },
        {
          type: 'link',
          text: "AWS's report",
          href: 'https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/',
        },
        {
          type: 'text',
          text: ' is careful about both points.',
        },
      ],
      variant: 'body',
    },
    {
      type: 'p',
      text: [
        {
          type: 'text',
          text: "On October 27, Wiz published another useful corrective to the noise surrounding the incident. It had observed attempted exploitation in its own telemetry, but not a completed exploit chain in the attempts it captured. It also cited separate evidence of successful exploitation in a researcher's honeypot. Both observations can be true. Security incidents rarely move neatly from 'nothing happened' to 'everybody is compromised.' ",
        },
        {
          type: 'link',
          text: "Wiz's follow-up",
          href: 'https://www.wiz.io/blog/php2shell-exploitation-so-far',
        },
        {
          type: 'text',
          text: ' sets out that distinction.',
        },
      ],
      variant: 'body',
    },
    {
      type: 'figure',
      id: 'php2shell-timeline',
      image: {
        src: '/images/articles/php2shell-timeline.svg',
        width: 1280,
        height: 405,
        alt: 'PHP2Shell research and disclosure timeline, from the 2024 warning to the October 27, 2026 follow-up.',
      },
      caption: [
        {
          type: 'text',
          text: 'A compressed disclosure window, after a long investigation. Sources: ',
        },
        {
          type: 'link',
          text: 'PHP Foundation',
          href: 'https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/',
        },
        {
          type: 'text',
          text: ', ',
        },
        {
          type: 'link',
          text: 'AWS',
          href: 'https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/',
        },
        {
          type: 'text',
          text: ' and ',
        },
        {
          type: 'link',
          text: 'Wiz',
          href: 'https://www.wiz.io/blog/php2shell-exploitation-so-far',
        },
        {
          type: 'text',
          text: '.',
        },
      ],
      description:
        'Historical research and disclosure events. The October 17 observation was an attempt against a honeypot, identified retrospectively, not proof of widespread compromise.',
      items: [
        {
          label: '2024',
          text: 'First signs of the out-of-memory issue are recognized.',
        },
        {
          label: '11 August 2026',
          text: 'Calif reports a remote-code-execution path.',
        },
        {
          label: '17 October 2026',
          text: 'An exploitation attempt reaches AWS MadPot. AWS identifies it retrospectively and reports it on October 21; this is not evidence of universal compromise.',
        },
        {
          label: '20 October 2026',
          text: 'CVE identifiers circulate; a demonstration video is mistakenly published later that day.',
        },
        {
          label: '21 October 2026',
          text: 'PHP ships the original security patches.',
        },
        {
          label: '23 October 2026',
          text: 'A separate, configuration-dependent session-upload-progress issue receives an advisory.',
        },
        {
          label: '27 October 2026',
          text: 'Wiz publishes its follow-up on exploitation observations.',
        },
      ],
    },
    {
      type: 'p',
      text: 'The disclosure story is sometimes reduced to a simple question: why not publish the patch immediately? Because people also need packages they can install, extensions that still work, and a chance to roll changes out safely. Waiting creates risk. Releasing before the ecosystem can use the fix creates a different kind of risk. Both have to be managed while the clock is running.',
      variant: 'body',
    },
    {
      type: 'h2',
      text: 'The new economics of cybersecurity',
    },
    {
      type: 'p',
      text: [
        {
          type: 'text',
          text: 'PHP2Shell suggests a useful way to think about the problem. Call it the ',
        },
        {
          type: 'em',
          text: 'discovery-to-remediation gap',
        },
        {
          type: 'text',
          text: ': the distance between proving that a vulnerability matters and reducing the corresponding risk in systems people actually run.',
        },
      ],
      variant: 'body',
    },
    {
      type: 'p',
      text: [
        {
          type: 'text',
          text: 'That gap contains four different clocks. ',
        },
        {
          type: 'strong',
          text: 'Discovery',
        },
        {
          type: 'text',
          text: ' is the time it takes to recognize and demonstrate the problem. ',
        },
        {
          type: 'strong',
          text: 'Decision',
        },
        {
          type: 'text',
          text: ' is the time required to choose and verify a safe fix. ',
        },
        {
          type: 'strong',
          text: 'Distribution',
        },
        {
          type: 'text',
          text: ' is the time needed to get that fix into supported releases, packages and platforms. ',
        },
        {
          type: 'strong',
          text: 'Deployment',
        },
        {
          type: 'text',
          text: ' is the time it takes for those changes to reach production systems.',
        },
      ],
      variant: 'body',
    },
    {
      type: 'p',
      text: 'These are not four official stages defined by the PHP Foundation, nor a standardized security metric. They are our way of making the engineering trade-off visible. A breakthrough in the first clock does not automatically speed up the other three.',
      variant: 'body',
    },
    {
      type: 'figure',
      id: 'php2shell-four-clocks',
      image: {
        src: '/images/articles/four-clocks.svg',
        width: 1200,
        height: 395,
        alt: 'Four clocks of the discovery-to-remediation gap: discovery, decision, distribution, and deployment.',
      },
      caption:
        "Kryzect's conceptual model of the discovery-to-remediation gap. The four stages are not measured incident durations.",
      description:
        "Kryzect's conceptual engineering framework, not a standardized metric or measured PHP2Shell incident durations.",
      items: [
        {
          label: 'Discovery',
          text: 'Prove the impact. Find and reproduce the flaw.',
        },
        {
          label: 'Decision',
          text: 'Choose a safe fix. Test trade-offs and regressions.',
        },
        {
          label: 'Distribution',
          text: 'Ship the update. Build releases and packages.',
        },
        {
          label: 'Deployment',
          text: 'Reduce real exposure. Roll out and verify in production.',
        },
      ],
    },
    {
      type: 'p',
      text: 'The PHP case makes each clock concrete. Researchers shortened the path to demonstrating severe impact. Maintainers still had to reason about changes deep in the language runtime. Distributors needed time to package updates. Website operators then had to identify affected services, test compatibility, schedule changes and verify that production was actually running the fixed code.',
      variant: 'body',
    },
    {
      type: 'p',
      text: 'AI may help with all four clocks. It can assist with test generation, patch review, dependency analysis and triage, not just bug hunting. Still, using an AI model does not remove the obligation to prove that a change is correct. A confident-looking patch that introduces a regression is not a security improvement.',
      variant: 'body',
    },
    {
      type: 'p',
      text: "There is another asymmetry here. Attackers often need one workable configuration and one missed update. Defenders have to manage every supported environment they are responsible for. That's not a reason to give up on AI-assisted security research. It's a reason to invest just as deliberately in the unglamorous systems that turn research findings into reliable fixes.",
      variant: 'body',
    },
    {
      type: 'h2',
      text: 'What this means for the software we build',
    },
    {
      type: 'p',
      text: 'Most engineering teams will never patch the PHP runtime themselves. They will, however, make decisions that determine how quickly an upstream fix reaches the product they maintain.',
      variant: 'body',
    },
    {
      type: 'p',
      text: 'Start with the inventory. It should be possible to answer which runtime and version are serving each production application, where that version comes from, and who owns the update. A package listed in a repository is not necessarily the package running in a container or on a server. The distinction is easy to overlook until an urgent advisory arrives.',
      variant: 'body',
    },
    {
      type: 'p',
      text: 'Next, practice the update path before an emergency. Can a team build and test against a new runtime release without manually untangling its environment? Are smoke tests strong enough to catch the most important regressions? Is rollback understood? The first time these questions get answered should not be the night a critical CVE appears.',
      variant: 'body',
    },
    {
      type: 'p',
      text: [
        {
          type: 'text',
          text: "Treat mitigations as bridges, not replacements for a fix. Traffic filtering and temporary configuration changes can reduce exposure, but coverage depends on deployment details. The PHP project's October 23 advisory, for example, described a separate and unusually configuration-dependent session-upload-progress issue, ",
        },
        {
          type: 'link',
          text: 'CVE-2026-115560',
          href: 'https://www.php.net/archive/2026.php',
        },
        {
          type: 'text',
          text: '. It recommended disabling ',
        },
        {
          type: 'code',
          text: 'session.upload_progress.enabled',
        },
        {
          type: 'text',
          text: ' until a regular bug-fix release. That follow-up did not mean the October 21 patches were useless. It showed why security guidance has to remain specific, dated and subject to review.',
        },
      ],
      variant: 'body',
    },
    {
      type: 'p',
      text: 'For teams using AI-assisted tooling, the standard for evidence should stay high. Record the conditions under which a finding was reproduced. Separate a plausible explanation from a working exploit. Require review of both the fix and its side effects. And when a tool produces ten versions of what appears to be the same bug, distinguish duplicate reports from genuinely new attack paths. More findings are not the same as more security.',
      variant: 'body',
    },
    {
      type: 'p',
      text: "Finally, pay attention to the dependency that sits below your application code. Developers spend time reviewing their own endpoints, authentication flows and business logic. That's necessary, but a core-runtime flaw can undermine those safeguards. The safest product team is not necessarily the one with the most elaborate security dashboard. It may be the team that knows its dependencies, can update them without drama, and has rehearsed what happens when something important breaks.",
      variant: 'body',
    },
    {
      type: 'h2',
      text: 'The next vulnerability may already be there',
    },
    {
      type: 'p',
      text: "It's tempting to tell the PHP2Shell story as a sudden failure of old technology, followed by a dramatic rescue from AI. That would miss the part worth remembering.",
      variant: 'body',
    },
    {
      type: 'p',
      text: 'The initial warning was visible long before the public disclosure. Researchers eventually proved the impact. Engineers made difficult choices about how to repair the problem. Distributors and operators had to turn those choices into software people could actually run. Each part depended on the others.',
      variant: 'body',
    },
    {
      type: 'p',
      text: 'AI is making it harder to assume that a flaw is safe merely because exploitation once seemed impractical. That should encourage better research, not panic. It should also change what we reward: not just the speed of finding a bug, but the speed and reliability with which a real system becomes safer.',
      variant: 'body',
    },
    {
      type: 'p',
      text: "Finding the flaw is the beginning of that work. It isn't the finish line.",
      variant: 'body',
    },
    {
      type: 'hr',
    },
    {
      type: 'p',
      text: [
        {
          type: 'strong',
          text: 'Editorial note (27 October 2026).',
        },
        {
          type: 'text',
          text: ' This article analyzes the October 2026 disclosure and the broader engineering lessons. Observations about exploitation attempts reflect the sources available on that date. If you operate PHP systems, consult ',
        },
        {
          type: 'link',
          text: "PHP's current security notices",
          href: 'https://www.php.net/',
        },
        {
          type: 'text',
          text: " and your vendor's advisories rather than relying on historical version numbers here.",
        },
      ],
      variant: 'note',
    },
    {
      type: 'p',
      text: [
        {
          type: 'strong',
          text: 'Reporting and references.',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'link',
          text: "The PHP Foundation's first-hand account",
          href: 'https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/',
        },
        {
          type: 'text',
          text: ' · ',
        },
        {
          type: 'link',
          text: 'PHP releases and advisories',
          href: 'https://www.php.net/archive/2026.php',
        },
        {
          type: 'text',
          text: ' · ',
        },
        {
          type: 'link',
          text: "Wiz's original investigation",
          href: 'https://www.wiz.io/blog/php2shell-php-rce',
        },
        {
          type: 'text',
          text: ' · ',
        },
        {
          type: 'link',
          text: 'AWS threat intelligence',
          href: 'https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/',
        },
        {
          type: 'text',
          text: ' · ',
        },
        {
          type: 'link',
          text: "Wiz's October 27 follow-up",
          href: 'https://www.wiz.io/blog/php2shell-exploitation-so-far',
        },
        {
          type: 'text',
          text: '.',
        },
      ],
      variant: 'note',
    },
  ],
  relatedArticles: [],
}
