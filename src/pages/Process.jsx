import { PROCESS_STAGES, PROCESS_PRINCIPLE } from '../data/process.js'

import './company.css'

// Process — "How do we actually work?" Blueprint V2 §30.
// This is the detailed 8-stage workflow (expanded from the Home 6-step journey).
// Copy verbatim from the spec.
function Process() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <h1 className="page-hero__title">The process starts before the code.</h1>
          <p className="page-hero__text">
            Every engagement begins not with technology, but with understanding the objective,
            the people, and the constraints.
          </p>
        </div>
      </section>

      {/* ============ STAGES ============ */}
      <section className="page-section">
        <div className="page-container">
          <ol className="step-list">
            {PROCESS_STAGES.map((stage) => (
              <li className="step" key={stage.number}>
                <span className="step__number">{stage.number}</span>
                <h2 className="step__title">{stage.title}</h2>
                <p className="step__intro">{stage.intro}:</p>
                <ul className="step__points">
                  {stage.points.map((point) => (
                    <li className="step__point" key={point}>
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="process-principle">
            <span className="process-principle__label">Process principle</span>
            <p className="process-principle__quote">{PROCESS_PRINCIPLE}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Process