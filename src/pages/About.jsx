import Button from '../components/Button.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import { BRAND_VALUES } from '../data/values.js'

import './company.css'

// About — "Who is Kryzect?" Blueprint V2 §14. Copy verbatim from the spec.
const MARKETS = [
  'North America',
  'United Kingdom',
  'Europe',
  'Middle East',
  'Asia',
  'Australia',
  'anywhere Kryzect can deliver effectively',
]

const QUESTIONS = [
  'What are you trying to accomplish?',
  'Who needs the solution?',
  'What is currently getting in the way?',
  'What constraints matter?',
  'What would success actually look like?',
]

function SectionHeading({ kicker, title }) {
  return (
    <div className="page-section__heading">
      <span className="page-section__kicker">{kicker}</span>
      <h2 className="page-section__title">{title}</h2>
    </div>
  )
}

function About() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <h1 className="page-hero__title">We build technology around the problem.</h1>
          <div>
            <p className="page-hero__text">
              Kryzect is a technology company focused on software engineering, AI, automation,
              and digital products.
            </p>
            <p className="page-hero__text">
              We work across web, mobile, backend systems, APIs, SaaS, cloud, data, e-commerce,
              and custom software.
            </p>
            <p className="page-hero__text">
              But our process starts before technology.
            </p>
          </div>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="The story" title="Where Kryzect came from" />
          <div className="story">
            <p className="story__para">
              Software projects often begin with a technology choice: a framework, a platform,
              an AI model, or a feature list. We believe the better starting point is the
              objective.
            </p>
            <ul className="story__questions">
              {QUESTIONS.map((q) => (
                <li className="story__question" key={q}>
                  {q}
                </li>
              ))}
            </ul>
            <p className="story__para">
              Kryzect was built around that thinking.
            </p>
            <p className="story__underline">Understand first. Engineer second.</p>
          </div>
        </div>
      </section>

      {/* ============ BUILDING TOWARD ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="The ambition" title="From projects to products." />
          <div className="story">
            <p className="story__para">
              Kryzect begins with engineering services, but the long-term ambition is larger.
            </p>
            <p className="story__para">
              We want to build a technology company capable of creating software for clients,
              developing its own products, solving complex problems, and eventually growing
              into a global software and technology organization.
            </p>
          </div>
        </div>
      </section>

      {/* ============ INTERNATIONAL ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="International scope" title="Built for a global market." />
          <div className="story">
            <p className="story__para">Kryzect is designed from the beginning to work internationally.</p>
          </div>
          <ul className="markets" style={{ marginTop: 'var(--space-8)' }}>
            {MARKETS.map((m) => (
              <li className="market" key={m}>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="What we believe" title="The principles we build on." />
          <ul className="value-list">
            {BRAND_VALUES.map((v) => (
              <li className="value" key={v.title}>
                <span className="value__name">{v.title}</span>
                <p className="value__detail">{v.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ SOCIAL ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Connect" title="Find Kryzect online." />
          <div className="social-block">
            <SocialLinks row />
            <div>
              <Button to="/contact" variant="ghost">
                Contact Kryzect →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About