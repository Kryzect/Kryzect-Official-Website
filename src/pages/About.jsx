import PageIntro from '../components/PageIntro.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCta from '../components/ProjectCta.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import { Link } from 'react-router-dom'
export default function About() {
  return (
    <>
      <PageIntro
        path="/about"
        label="About Kryzect"
        title="A software company built around understanding."
        description="Kryzect is a founder-led software engineering and AI company working with businesses, startups, and individuals."
      />
      <section className="page-section">
        <div className="page-container evidence-layout">
          <div>
            <SectionHeading title="From the business question to the working system." />
            <div className="story">
              <p>
                We build websites, applications, AI systems, automation, and the
                APIs and data services that connect them.
              </p>
              <p>
                The starting point is a conversation about what needs to change:
                a customer experience, an internal process, or an idea ready to
                become a product. That context shapes the scope and the
                technical decisions.
              </p>
            </div>
          </div>
          <div className="evidence-note">
            <h2>Founder-led, based in Lahore.</h2>
            <p>
              Muhammad Ali Aamir leads Kryzect's discovery and engineering. We
              work remotely and welcome international enquiries.
            </p>
            <Link to="/team">Meet the founder →</Link>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="page-container">
          <SectionHeading title="Client work and our own products." />
          <p className="page-hero__text">
            Alongside engineering services, we develop product experiments such
            as IncidentIQ. These give us room to investigate problems, test
            architectural decisions, and turn ideas into working software.
          </p>
          <div className="section-cta">
            <Link to="/products">Explore our products →</Link>
            <Link to="/process">How delivery works →</Link>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="page-container">
          <SectionHeading title="Find Kryzect online." />
          <SocialLinks row />
        </div>
      </section>
      <ProjectCta />
    </>
  )
}
