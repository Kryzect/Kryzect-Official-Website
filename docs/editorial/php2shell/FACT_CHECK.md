# Kryzect editorial fact check | 27 October 2026

## Confirmed using primary sources

- **Underlying 2024 finding:** During remediation work following a Quarkslab external audit, a PHP developer noticed symptoms of the out-of-memory root cause. An exploit was considered but not demonstrated then. The Foundation explicitly described the stalled decision process as a structural failure. Source: https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/
- **CVE identities:** CVE-2026-109618 (OOM corruption) and CVE-2026-109619 (stale global state), each 9.2 CVSS v4.0, and PHP 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35 fixed the original pair on 21 Oct 2026. Sources: https://www.php.net/archive/2026.php and PHP Foundation above.
- **Research credits:** Calif report on 11 Aug 2026, independent OpenAI reports, Wiz findings in August; Wiz describes frontier AI aiding its own technical research. Source: PHP Foundation above and https://www.wiz.io/blog/php2shell-php-rce
- **Disclosure disruption:** IDs circulated 20 October without exploit details in the initial post; Calif mistakenly released a demonstration video later; the PHP Foundation reports Chainguard distributed a patched image ahead of embargo on 21 October. Source: PHP Foundation above. Attribute Chainguard incident to Foundation's statement, not an independent court finding.
- **Pre-release exploitation attempt:** AWS retrospectively detected an attempted exploit on 17 Oct against MadPot and could not determine how the actor obtained information. No claim of successful real-world compromise. Source: https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/
- **27 Oct status:** Wiz observed attempted exploitation but no completed chain in its captured attempts; separately cited research honeypot evidence for successful exploitation. No worldwide-success claim. Source: https://www.wiz.io/blog/php2shell-exploitation-so-far
- **23 Oct follow-up:** CVE-2026-115560 is a separate, configuration-dependent session-upload-progress issue; PHP advised disabling session.upload_progress.enabled until a regular release. Its fix status can change after 27 Oct; link live upstream guidance. Source: https://www.php.net/archive/2026.php

## Important editorial exclusions

- DO NOT say PHP2Shell took half the internet offline. PHP adoption/exposure is not equivalent to outages or successful compromises.
- DO NOT assert that AI leaked vulnerability information, hackers stole it from an AI, or attackers definitely used AI. None of those claims is established by the cited sources.
- DO NOT conflate exploitation attempts, proof-of-concept demonstrations, honeypot success and verified production compromise.
- DO NOT call CVE-2026-115560 one of the original two critical CVEs.
- DO NOT treat October 21 versions as perpetual current upgrade targets. They are historically accurate release versions. Live remediation must use the latest vendor/PHP guidance.
- DO NOT present 'four clocks' as a standardized metric or attributed to third-party researchers. It is Kryzect's original editorial framework.
- DO NOT fabricate employees, a research lab, security testing performed by Kryzect, clients, case studies, or proprietary findings.

## Editorial quality and disclosure

- Author attribution must be 'Kryzect' (organization). No invented personal byline.
- Keep visible source links and an editorial note with research cutoff; datePublished must be actual publication date, dateModified only on a real update.
- The article is interpretation and editorial analysis, not a vulnerability advisory or substitute for current mitigation steps.
- Review wording, attribution and live source links before publication. This is editorial review, not a guarantee about third-party AI detection or AI citations.
