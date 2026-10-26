import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { FAQS } from '../data/faq.js'

// data/faq.js. Uses the shared <details> accordion styling from services.css.

function Faq() {
  return (
    <>
      <Seo
        title="FAQ"
        description="Answers to common questions about what Kryzect builds and how we work."
        path="/faq"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'FAQ', to: '/faq' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">FAQ</span>
          <h1 className="page-hero__title">Questions, plainly answered.</h1>
          <p className="page-hero__text">
            Some of the things people ask us most often.
          </p>
        </div>
      </section>

      {/* ============ QUESTIONS ============ */}
      <section className="page-section">
        <div className="page-container">
          <div className="faq-list">
            {FAQS.map((faq) => (
              <details className="faq" key={faq.question}>
                <summary className="faq__question">{faq.question}</summary>
                <p className="faq__answer">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="section-cta">
            <Button to="/contact">Ask Us Something →</Button>
            <Button to="/book-a-call" variant="ghost">
              Book a Call
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Faq
