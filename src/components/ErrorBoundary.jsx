import { Component } from 'react'
import { CONTACT_EMAIL } from '../config.js'

export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <section className="page-section">
        <div className="page-container">
          <h1>This page could not load.</h1>
          <p className="page-hero__text">
            Please reload the page, or contact us directly.
          </p>
          <div className="section-cta">
            <a className="btn btn--primary" href="">
              Reload page
            </a>
            <a className="btn btn--ghost" href={`mailto:${CONTACT_EMAIL}`}>
              Email Kryzect
            </a>
          </div>
        </div>
      </section>
    )
  }
}
