import PageIntro from '../components/PageIntro.jsx'
import Button from '../components/Button.jsx'
import { BOOKING_URL, CONTACT_EMAIL } from '../config.js'
export default function BookACall() {
  return (
    <>
      <PageIntro
        path="/book-a-call"
        label="Book a Call"
        title="Start with a conversation."
        description="A free 30-minute discovery call to discuss your goals, current workflow, and possible next steps. There is no commitment to start a project."
      />
      <section className="page-section">
        <div className="page-container evidence-layout">
          <div>
            <h2>What we will discuss</h2>
            <ul className="plain-list">
              <li>What you are trying to achieve and who it is for.</li>
              <li>Your current tools, process, and constraints.</li>
              <li>Whether Kryzect can help and what to do next.</li>
            </ul>
            <p className="section-note">
              An idea or short outline is enough. No presentation or technical
              brief is needed.
            </p>
          </div>
          <div className="booking-card">
            <h2>30-minute discovery call</h2>
            <p>
              Choose an available time on Google Calendar. The booking page
              handles your time zone and adds Google Meet details after booking.
            </p>
            <div className="section-cta">
              {BOOKING_URL && (
                <Button href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Choose a Time ↗
                </Button>
              )}
            </div>
            <p className="section-note">
              Need another way to arrange it?{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>Email {CONTACT_EMAIL}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
