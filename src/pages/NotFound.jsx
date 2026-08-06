import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Logo from '../components/Logo.jsx'

import './company.css'
import './notfound.css'

// Custom 404 page. Subtle Kryzect branding, exact requested copy, and two
// primary exits. Rendered by the catch-all route in App.jsx.
function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="This page doesn't exist. It may have moved, or perhaps we haven't built it yet."
        path="/"
      />
      <section className="notfound">
        <div className="page-container">
          <div className="notfound__inner">
            <span className="notfound__logo" aria-hidden="true">
              <Logo />
            </span>
            <h1 className="notfound__title">This page doesn&apos;t exist.</h1>
            <p className="notfound__text">
              It may have moved, or perhaps we haven&apos;t built it yet.
            </p>
            <div className="notfound__actions">
              <Button to="/">Back Home</Button>
              <Button to="/services" variant="ghost">
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound