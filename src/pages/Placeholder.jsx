import Button from '../components/Button.jsx'
import './home.css'

// Generic route destination for pages not yet built. Gives Home CTAs and the
// header/footer links a real, non-dead destination until each page is built.
function Placeholder({ title }) {
  return (
    <section className="home-section">
      <div className="page-container">
        <div className="clarity">
          <h1 className="hero__title">{title}</h1>
          <p className="clarity__body">
            This page is being built. The Kryzect team is working on it and it will be available
            soon.
          </p>
          <div className="hero__actions">
            <Button to="/">Back Home</Button>
            <Button to="/contact" variant="ghost">
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Placeholder