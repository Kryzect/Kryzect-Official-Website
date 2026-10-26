import PageIntro from '../components/PageIntro.jsx'
import ProjectCta from '../components/ProjectCta.jsx'
const stages = [
  [
    'Discover',
    'Understand the users, business goal, existing workflow, systems, and constraints.',
    'A shared account of the problem and whether further discovery is needed.',
  ],
  [
    'Define',
    'Agree priorities, requirements, boundaries, and success criteria.',
    'A scope with deliverables, assumptions, and acceptance criteria.',
  ],
  [
    'Plan & design',
    'Map the user experience, architecture, data, integrations, and delivery milestones.',
    'A design and technical plan suited to the agreed scope.',
  ],
  [
    'Build & review',
    'Develop in increments and review progress at agreed checkpoints.',
    'Working increments, feedback, and documented decisions. Scope changes are assessed before extra work starts.',
  ],
  [
    'Test & deliver',
    'Check the agreed functionality, responsive behavior, and relevant performance and security requirements.',
    'An acceptance review, deployment, and handover of agreed documentation and access.',
  ],
  [
    'Support & improve',
    'Review what needs maintenance, optimization, or further development.',
    'A separate support or development scope where ongoing work is needed.',
  ],
]
export default function Process() {
  return (
    <>
      <PageIntro
        path="/process"
        label="How We Work"
        title="A clear process, with useful outputs."
        description="The depth of discovery depends on the project. A focused website needs a lighter path than a software platform with multiple workflows and integrations."
      />
      <section className="page-section">
        <div className="page-container">
          <ol className="delivery-stages">
            {stages.map(([title, text, output], index) => (
              <li key={title}>
                <span className="page-section__kicker">0{index + 1}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                  <p>
                    <strong>Output:</strong> {output}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ProjectCta />
    </>
  )
}
