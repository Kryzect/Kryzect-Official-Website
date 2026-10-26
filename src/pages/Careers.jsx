import PageIntro from '../components/PageIntro.jsx'
import { CONTACT_EMAIL } from '../config.js'
export default function Careers() {
  return (
    <>
      <PageIntro
        path="/careers"
        label="Careers"
        title="Work at Kryzect."
        description="There are no open roles or internships at present."
      />
      <section className="page-section">
        <div className="page-container">
          <h2>Future opportunities</h2>
          <p className="page-hero__text">
            Open positions and application instructions will be published here
            when we are hiring. For other enquiries,{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>email Kryzect</a>.
          </p>
        </div>
      </section>
    </>
  )
}
