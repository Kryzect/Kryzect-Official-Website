import { TEAM_INTRO, TEAM_MEMBERS } from '../data/team.js'

import './company.css'

// Team — "Who are the people behind Kryzect?" Blueprint V2 §16.
// Data-driven from data/team.js so future members can be added without
// touching this component. Never invents team members.

// Minimal inline icons (same restraint as the shell social links).
const ICONS = {
  portfolio: (
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 3h7v7M21 3l-9.5 9.5M14 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h4"
    />
  ),
  github: (
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  ),
}

function Team() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <h1 className="page-hero__title">The people behind Kryzect.</h1>
          <p className="page-hero__text">{TEAM_INTRO}</p>
        </div>
      </section>

      {/* ============ MEMBERS ============ */}
      <section className="page-section">
        <div className="page-container">
          <div className="team-grid">
            {TEAM_MEMBERS.map((member) => (
              <article className="team-card" key={member.name}>
                <h2 className="team-card__name">{member.name}</h2>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
                <ul className="team-card__links">
                  {member.links.map((link) => (
                    <li key={link.label}>
                      <a className="team-card__link" href={link.href} target="_blank" rel="noreferrer">
                        <svg
                          className="team-card__link-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          {ICONS[link.icon]}
                        </svg>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="team-note">
            Kryzect is growing its network of collaborators and plans to build a larger
            engineering team. New members will be added here as the team grows.
          </p>
        </div>
      </section>
    </>
  )
}

export default Team