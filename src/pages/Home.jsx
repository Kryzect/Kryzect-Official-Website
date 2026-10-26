import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Logo from '../components/Logo.jsx'
import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCta from '../components/ProjectCta.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import { PRODUCTS } from '../data/products.js'
import { PROJECTS } from '../data/projects.js'
import { ARTICLES } from '../data/articles.js'
import { ENGAGEMENTS } from '../data/engagements.js'
import { TEAM_MEMBERS } from '../data/team.js'

const capabilities = [
  {
    title: 'Websites & digital products',
    text: 'Web and mobile applications, SaaS, and online stores built around the people using them.',
    to: '/services/web-software',
  },
  {
    title: 'Business tools & automation',
    text: 'Internal software and connected workflows that reduce repetitive work and manual handoffs.',
    to: '/services/automation',
  },
  {
    title: 'AI & document workflows',
    text: 'Assistants, agents, and document processing with attention to data, accuracy, and review.',
    to: '/services/ai-solutions',
  },
  {
    title: 'APIs, cloud & data',
    text: 'Integrations, backend systems, and dashboards that make information useful across your business.',
    to: '/services/api-backend',
  },
]
export default function Home() {
  const { onReplayIntro } = useOutletContext()
  const [introReady, setIntroReady] = useState(false)
  useEffect(() => setIntroReady(true), [])
  const product = PRODUCTS[0]
  const founder = TEAM_MEMBERS[0]
  return (
    <>
      <Seo
        title="Software Engineering, AI & Automation"
        description="Kryzect builds websites, software, AI systems, and automation for businesses and founders. Start with a free business discovery conversation."
        path="/"
      />
      <section className="home-hero">
        <div className="page-container home-hero__grid">
          <div>
            <p className="page-hero__kicker">
              Software engineering · AI · Automation
            </p>
            <h1>
              Think First.
              <br />
              Build Better.
            </h1>
            <p className="home-hero__lead">
              Software built around the way your business needs to work.
            </p>
            <p className="home-hero__text">
              From a focused website to a connected software platform, we help
              you define the scope and build a solution your team can use.
            </p>
            <div className="section-cta">
              <Button to="/contact">Start a Project</Button>
              <Button to="/book-a-call" variant="ghost">
                Book a Free Call
              </Button>
            </div>
            <p className="home-hero__note">
              A 30-minute discovery conversation. No technical brief required.
            </p>
            <button
              type="button"
              className="home-hero__replay"
              disabled={!introReady}
              onClick={onReplayIntro}
            >
              Replay intro
            </button>
          </div>
          <div className="home-hero__mark">
            <Logo animated />
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="page-container">
          <SectionHeading
            kicker="What we build"
            title="The right tools for the work ahead."
          />
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link to={item.to}>Explore services →</Link>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Button to="/services" variant="ghost">
              View All Services
            </Button>
          </div>
        </div>
      </section>
      {product && (
        <section className="page-section">
          <div className="page-container evidence-layout">
            <div>
              <SectionHeading
                kicker="Built at Kryzect"
                title="Turning incident records into a draft postmortem."
              />
              <p className="page-hero__text">
                {product.name} is our product experiment in AI-assisted incident
                analysis. It brings a timeline, root-cause hypothesis, and
                prevention recommendations into a report held for human review.
              </p>
              <p className="status-label">{product.status}</p>
              <div className="section-cta">
                <Button to={`/products/${product.slug}`} variant="ghost">
                  Explore {product.name}
                </Button>
              </div>
            </div>
            <div className="evidence-note">
              <p className="page-section__kicker">Engineering decisions</p>
              <h3>Human approval is part of the workflow.</h3>
              <ul>
                <li>Separate orchestration from AI analysis.</li>
                <li>Validate the timeline before reasoning about it.</li>
                <li>Keep findings as drafts until reviewed.</li>
              </ul>
              <p>
                Read the product overview for current capabilities and the
                public experiment.
              </p>
            </div>
          </div>
        </section>
      )}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading
            kicker="Ways to work together"
            title="A focused build or a deeper discovery."
          />
          <div className="engagement-grid">
            {ENGAGEMENTS.map((item) => (
              <article className="engagement" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>{item.output}</p>
              </article>
            ))}
          </div>
          <p className="section-note">
            Investment depends on scope, complexity, and delivery requirements.
            Maintenance and continued development can be agreed separately.
          </p>
        </div>
      </section>
      <section className="page-section">
        <div className="page-container">
          <SectionHeading
            kicker="Clarity before code"
            title="A practical path from idea to handover."
          />
          <ol className="home-journey">
            <li>
              <h3>Understand & define</h3>
              <p>
                Agree the goal, users, constraints, scope, and measures of
                success.
              </p>
            </li>
            <li>
              <h3>Design & build</h3>
              <p>
                Plan the experience and architecture, then develop with feedback
                at agreed milestones.
              </p>
            </li>
            <li>
              <h3>Test & deliver</h3>
              <p>
                Review the result, deploy it, and hand over the documentation
                and access you need.
              </p>
            </li>
          </ol>
          <div className="section-cta">
            <Link to="/process">See the full process →</Link>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="page-container founder-strip">
          <div>
            <p className="page-section__kicker">Founder-led delivery</p>
            <h2>Work directly with {founder.name}.</h2>
            <p>
              {founder.name} leads discovery and engineering at Kryzect. Explore
              his software and AI work before starting a conversation.
            </p>
          </div>
          <div className="section-cta">
            <Button href={founder.links[0].href} variant="ghost">
              View Founder Portfolio
            </Button>
            <Link to="/team">Meet the founder →</Link>
          </div>
        </div>
      </section>
      {PROJECTS.length > 0 && (
        <section className="page-section">
          <div className="page-container">
            <SectionHeading title="Selected work" />
            <div className="project-grid">
              {PROJECTS.slice(0, 3).map((project) => (
                <article className="project-card" key={project.slug}>
                  <h3>
                    <Link to={`/work/${project.slug}`}>{project.name}</Link>
                  </h3>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
            <Link to="/work">Explore all work →</Link>
          </div>
        </section>
      )}
      {ARTICLES.length > 0 && (
        <section className="page-section">
          <div className="page-container">
            <SectionHeading title="From the blog" />
            <div className="blog-grid">
              {ARTICLES.slice(0, 3).map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
      <ProjectCta />
    </>
  )
}
