import { useParams } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { PROJECTS, getProjectCategory } from '../data/projects.js'

function SectionHeading({ kicker, title }) {
  return (
    <div className="page-section__heading">
      <span className="page-section__kicker">{kicker}</span>
      <h2 className="page-section__title">{title}</h2>
    </div>
  )
}

function CaseStudy() {
  const { slug } = useParams()
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <Seo
          title="Case study not found"
          description="This case study could not be found. Explore all Kryzect work."
          path="/work"
          noindex
        />
        <section className="page-hero">
          <div className="page-container">
            <h1 className="page-hero__title">Case study not found.</h1>
            <p className="page-hero__text">
              Case studies are added here as real projects are completed.
            </p>
            <div className="page-hero__actions">
              <Button to="/work">Back to Work</Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  const category = getProjectCategory(project.category)

  return (
    <>
      <Seo
        title={`${project.name} — Case Study`}
        description={project.description}
        path={`/work/${project.slug}`}
        type="article"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Work', to: '/work' },
          { label: project.name, to: `/work/${project.slug}` },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Case Study</span>
          <h1 className="page-hero__title">{project.name}</h1>
          {project.image ? (
            <img
              className="case-hero__image"
              src={project.image}
              alt={project.alt ?? `${project.name} hero`}
              width={project.imageWidth}
              height={project.imageHeight}
              fetchPriority="high"
            />
          ) : null}
        </div>
      </section>

      {/* ============ OVERVIEW ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Overview" title="Case study at a glance." />
          <dl className="case-overview">
            <div className="case-overview__row">
              <dt>Project</dt>
              <dd>{project.name}</dd>
            </div>
            <div className="case-overview__row">
              <dt>Category</dt>
              <dd>{category?.label ?? project.type}</dd>
            </div>
            <div className="case-overview__row">
              <dt>Type</dt>
              <dd>{project.type}</dd>
            </div>
            {project.role ? (
              <div className="case-overview__row">
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
            ) : null}
            {project.status ? (
              <div className="case-overview__row">
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
            ) : null}
          </dl>
          <div className="case-links">
            {project.liveUrl ? (
              <Button href={project.liveUrl} variant="ghost">
                Live Project →
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button href={project.githubUrl} variant="ghost">
                GitHub →
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {/* ============ THE PROBLEM ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Context" title="The problem." />
          <div className="story">
            <p className="story__para">{project.problem}</p>
          </div>
        </div>
      </section>

      {/* ============ OBJECTIVE ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Goal" title="Objective." />
          <div className="story">
            <p className="story__para">{project.objective}</p>
          </div>
        </div>
      </section>

      {/* ============ UNDERSTANDING ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Research" title="Understanding." />
          <div className="story">
            <p className="story__para">{project.understanding}</p>
          </div>
        </div>
      </section>

      {/* ============ APPROACH ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Approach" title="Approach." />
          <div className="story">
            <p className="story__para">{project.approach}</p>
          </div>
        </div>
      </section>

      {/* ============ SOLUTION ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Solution" title="Solution." />
          <div className="story">
            <p className="story__para">{project.solution}</p>
          </div>
          {project.screenshots?.length > 0 && (
            <div className="screenshot-grid">
              {project.screenshots.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes={image.sizes}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ TECHNICAL DETAILS (expandable) ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading
            kicker="How it was built"
            title="Technical details."
          />
          <details className="case-tech">
            <summary className="case-tech__summary">
              Show technical details
            </summary>
            <div className="case-tech__body">
              <p className="story__para">{project.technicalDetails}</p>
              {project.technologies?.length > 0 && (
                <ul className="plain-list">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        </div>
      </section>

      {/* ============ CHALLENGES ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="What was hard" title="Challenges." />
          <div className="story">
            <p className="story__para">{project.challenges}</p>
          </div>
        </div>
      </section>

      {/* ============ OUTCOME ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Result" title="Outcome." />
          <div className="story">
            <p className="story__para">{project.outcome}</p>
          </div>
        </div>
      </section>

      {/* ============ LINKS ============ */}
      <section className="page-section page-section--final">
        <div className="page-container">
          <SectionHeading kicker="Links" title="Project links." />
          <div className="case-links">
            {project.productUrl && (
              <Button href={project.productUrl} variant="ghost">
                Product overview →
              </Button>
            )}
            {project.liveUrl ? (
              <Button href={project.liveUrl} variant="ghost">
                Live Project →
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button href={project.githubUrl} variant="ghost">
                GitHub →
              </Button>
            ) : null}
            {!project.liveUrl && !project.githubUrl && !project.productUrl ? (
              <p className="home-page__empty">
                Private project — details are not published.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}

export default CaseStudy
