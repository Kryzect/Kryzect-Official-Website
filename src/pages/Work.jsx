import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  getProjectCategory,
} from '../data/projects.js'

const MIN_PROJECTS_FOR_FILTERS = 3

function Work() {
  const [active, setActive] = useState('All')
  const categories = PROJECT_CATEGORIES.map((c) => c.label)
  const showFilters = PROJECTS.length >= MIN_PROJECTS_FOR_FILTERS
  const filtered =
    active === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => getProjectCategory(p.category)?.label === active)

  return (
    <>
      <Seo
        title="Work"
        description="Explore selected projects, products, experiments, and case studies built with purpose."
        path="/work"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Work', to: '/work' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Work</span>
          <h1 className="page-hero__title">Work built with purpose.</h1>
          <p className="page-hero__text">
            Explore selected projects, products, experiments, and case studies.
            Where possible, see the live product, source code, and the thinking
            behind the build.
          </p>
        </div>
      </section>

      {/* ============ FILTERS (only when enough genuine projects) ============ */}
      {showFilters && (
        <section className="page-section">
          <div className="page-container">
            <div
              className="work-filters"
              role="group"
              aria-label="Filter projects"
            >
              <button
                type="button"
                aria-pressed={active === 'All'}
                className={`work-filter${active === 'All' ? ' work-filter--active' : ''}`}
                onClick={() => setActive('All')}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  className={`work-filter${active === category ? ' work-filter--active' : ''}`}
                  key={category}
                  aria-pressed={active === category}
                  onClick={() => setActive(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ PROJECTS ============ */}
      <section className="page-section">
        <div className="page-container">
          {filtered.length > 0 ? (
            <div className="project-grid">
              {filtered.map((project) => (
                <article className="project-card" key={project.slug}>
                  <h2 className="project-card__name">
                    <Link to={`/work/${project.slug}`}>{project.name}</Link>
                  </h2>
                  <p className="project-card__type">{project.type}</p>
                  {project.image ? (
                    <img
                      className="project-card__image"
                      src={project.image}
                      alt={project.alt ?? `${project.name} image`}
                      loading="lazy"
                      width={project.imageWidth}
                      height={project.imageHeight}
                    />
                  ) : null}
                  <p className="project-card__desc">{project.description}</p>
                  {project.status ? (
                    <span className="project-card__status">
                      {project.status}
                    </span>
                  ) : null}
                  <div className="project-card__cta">
                    <Button to={`/work/${project.slug}`} variant="ghost">
                      View Case Study →
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="work-empty">
              <p className="work-empty__text">
                Selected work is being prepared and will appear here as it
                becomes available.
              </p>
              <div className="section-cta">
                <Button to="/contact">Start a Project</Button>
                <Button to="/book-a-call" variant="ghost">
                  Book a Call
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Work
