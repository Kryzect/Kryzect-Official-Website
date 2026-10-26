import Button from './Button.jsx'
export default function ProjectCta() {
  return (
    <section className="page-section">
      <div className="page-container final-cta">
        <h2 className="final-cta__title">
          Start with what you want to achieve.
        </h2>
        <p className="final-cta__text">
          Tell us about your idea or the work that needs to run better. We can
          help define a useful next step.
        </p>
        <div className="final-cta__actions">
          <Button to="/contact">Start a Project</Button>
          <Button to="/book-a-call" variant="ghost">
            Book a Free Discovery Call
          </Button>
        </div>
      </div>
    </section>
  )
}
