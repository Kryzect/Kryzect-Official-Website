import Seo from '../components/Seo.jsx'
import Logo from '../components/Logo.jsx'
import Button from '../components/Button.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import { SERVICE_CATEGORIES } from '../data/services.js'
import { PRODUCTS } from '../data/products.js'
import { PROJECTS } from '../data/projects.js'
import { ARTICLES } from '../data/articles.js'
import { BRAND_VALUES } from '../data/values.js'

import './home.css'
import './blog.css'

const STEPS = [
  {
    number: '01',
    title: 'Understand',
    points: ['objectives', 'users', 'workflows', 'current systems', 'constraints', 'pain points'],
  },
  {
    number: '02',
    title: 'Define',
    points: ['requirements', 'priorities', 'scope', 'success criteria', 'technical direction'],
  },
  {
    number: '03',
    title: 'Design',
    points: ['user experience', 'architecture', 'data', 'APIs', 'integrations', 'infrastructure'],
  },
  {
    number: '04',
    title: 'Engineer',
    points: ['quality', 'maintainability', 'performance', 'security'],
  },
  {
    number: '05',
    title: 'Deliver',
    points: ['testing', 'deployment', 'documentation', 'handover'],
  },
  {
    number: '06',
    title: 'Improve',
    points: ['optimize', 'maintain', 'expand', 'automate', 'evolve'],
  },
]

function SectionHeading({ kicker, title }) {
  return (
    <h2 className="section-heading">
      <span className="section-heading__kicker">{kicker}</span>
      <span className="section-heading__title">{title}</span>
    </h2>
  )
}

function Home() {
  const product = PRODUCTS[0]
  const latestProjects = PROJECTS.slice(0, 3)
  const latestArticles = ARTICLES.slice(0, 3)

  return (
    <>
      <Seo
        title="Think First. Build Better."
        description="Kryzect — software engineering, AI, and automation built around what your business actually needs."
        path="/"
      />
      {/* ============ HERO ============ */}
      <section className="home-section home-section--hero">
        <div className="page-container">
          <div className="hero">
            <div className="hero__content">
              <h1 className="hero__title">Think First. Build Better.</h1>
              <p className="hero__support">
                Software engineering, AI, and automation built around what your business actually
                needs.
              </p>
              <p className="hero__para">
                From web and mobile applications to SaaS, AI systems, automation, APIs, cloud
                solutions, e-commerce, and custom software, we start by understanding the objective
                before choosing the technology.
              </p>
              <div className="hero__actions">
                <Button to="/contact">Start a Project</Button>
                <Button to="/book-a-call" variant="ghost">
                  Book a Call
                </Button>
              </div>
            </div>
            <div className="hero__visual" aria-hidden="true">
              <Logo />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLARITY BEFORE CODE ============ */}
      <section className="home-section">
        <div className="page-container">
          <div className="clarity">
            <h2 className="clarity__title">Technology is not the starting point. Understanding is.</h2>
            <p className="clarity__body">
              A business problem rarely arrives as a technical specification. It arrives as a goal, a
              bottleneck, a workflow, an opportunity, or an idea.
            </p>
            <p className="clarity__body">
              Before writing code, we work to understand what you are trying to achieve, who the
              solution is for, what constraints exist, what success looks like, and what actually
              needs to be built.
            </p>
            <p className="clarity__highlight">Clarity Before Code.</p>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE BUILD ============ */}
      <section className="home-section">
        <div className="page-container">
          <SectionHeading kicker="What we build" title="From digital experiences to complete systems." />
          <p className="home-section__intro">
            Kryzect works across the full technology stack, from focused websites and mobile
            applications to AI systems, SaaS products, automation, cloud infrastructure, and custom
            business software.
          </p>
          <div className="category-grid">
            {SERVICE_CATEGORIES.map((cat) => (
              <div className="category" key={cat.title}>
                <h3 className="category__title">{cat.title}</h3>
                <ul className="category__list">
                  {cat.items.map((item) => (
                    <li key={item} className="category__item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Button to="/services" variant="ghost">
              Explore Services →
            </Button>
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="home-section">
        <div className="page-container">
          <SectionHeading kicker="How we work" title="Before we build, we understand." />
          <p className="home-section__intro">The right solution starts with the right questions.</p>
          <ol className="steps">
            {STEPS.map((step) => (
              <li className="step" key={step.number}>
                <span className="step__number">{step.number}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__desc">{step.points.join(' · ')}</p>
              </li>
            ))}
          </ol>
          <div className="section-cta">
            <Button to="/process" variant="ghost">
              Explore Our Process →
            </Button>
          </div>
        </div>
      </section>

      {/* ============ PRODUCT ============ */}
      <section className="home-section">
        <div className="page-container">
          <SectionHeading kicker="Product" title="Building products, not just projects." />
          <div className="product-card">
            <div className="product-card__top">
              <h3 className="product-card__name">{product.name}</h3>
              <span className="product-card__status">{product.status}</span>
            </div>
            <p className="product-card__desc">{product.description}</p>
            <div className="product-card__cta">
              <Button to="/products/ai-postmortem" variant="ghost">
                Explore IncidentIQ →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WORK ============ */}
      <section className="home-section">
        <div className="page-container">
          <SectionHeading kicker="Work" title="Work built around real objectives." />
          <p className="home-section__intro">
            Explore selected projects and case studies, including the problem, approach, technology,
            and outcome behind each one.
          </p>
          {latestProjects.length > 0 ? (
            <div className="project-grid">
              {latestProjects.map((project) => (
                <div className="project-card" key={project.slug}>
                  <h3 className="project-card__name">{project.name}</h3>
                  <p className="project-card__type">{project.type}</p>
                  <p className="project-card__desc">{project.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="home-section__empty">
              Selected work is being prepared and will appear here as it becomes available.
            </p>
          )}
          <div className="section-cta">
            <Button to="/work" variant="ghost">
              View Our Work →
            </Button>
          </div>
        </div>
      </section>

      {/* ============ WHY KRYZECT ============ */}
      <section className="home-section">
        <div className="page-container">
          <SectionHeading kicker="Why Kryzect" title="Why Kryzect?" />
          <p className="home-section__intro">
            We don&apos;t believe technology should be selected before the problem is understood.
          </p>
          <ul className="values">
            {BRAND_VALUES.map((value) => (
              <li className="value" key={value.title}>
                <span className="value__name">{value.title}</span>
                <p className="value__detail">{value.detail}</p>
              </li>
            ))}
          </ul>
          <div className="section-cta">
            <Button to="/why-kryzect" variant="ghost">
              Why Kryzect →
            </Button>
          </div>
        </div>
      </section>

      {/* ============ BLOG PREVIEW ============ */}
      <section className="home-section">
        <div className="page-container">
          <SectionHeading kicker="Blog" title="Ideas, engineering, and practical thinking." />
          <p className="home-section__intro">
            Practical writing about software, AI, automation, products, data, and the decisions
            behind technology.
          </p>
          {latestArticles.length > 0 ? (
            <div className="blog-grid">
              {latestArticles.map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
            </div>
          ) : (
            <p className="home-section__empty">
              Articles will appear here as they are published.
            </p>
          )}
          <div className="section-cta">
            <Button to="/blog" variant="ghost">
              Read the Blog →
            </Button>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="home-section home-section--final">
        <div className="page-container">
          <div className="final-cta">
            <h2 className="final-cta__title">
              Have an idea, problem, or system that needs building?
            </h2>
            <p className="final-cta__text">Start with the outcome. We&apos;ll work out the technology together.</p>
            <div className="final-cta__actions">
              <Button to="/contact">Start a Project</Button>
              <Button to="/book-a-call" variant="ghost">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home