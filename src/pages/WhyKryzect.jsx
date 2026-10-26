import PageIntro from '../components/PageIntro.jsx'
import ProjectCta from '../components/ProjectCta.jsx'
const principles = [
  [
    'A clear scope before a build',
    'We map the goal, users, current workflow, and constraints. You can review the proposed scope and trade-offs before development starts.',
  ],
  [
    'Decisions you can understand',
    'We explain why a technical approach fits the project, including its costs, limitations, and maintenance needs.',
  ],
  [
    'Feedback during delivery',
    'Agreed milestones make room to review progress and resolve questions while the work is taking shape.',
  ],
  [
    'A system you can take forward',
    'Handover includes the documentation and access agreed for the project. Further support and development are scoped separately.',
  ],
]
export default function WhyKryzect() {
  return (
    <>
      <PageIntro
        path="/why-kryzect"
        label="Why Kryzect"
        title="Know what you are building, and why."
        description="A useful engineering partnership makes the decisions and responsibilities clear throughout the project."
      />
      <section className="page-section">
        <div className="page-container principle-grid">
          {principles.map(([title, text], index) => (
            <article className="principle" key={title}>
              <p className="page-section__kicker">0{index + 1}</p>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <ProjectCta />
    </>
  )
}
