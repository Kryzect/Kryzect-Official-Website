import Logo from './Logo.jsx'

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span className="route-fallback__logo" aria-hidden="true">
        <Logo animated />
      </span>
      <strong>Kryzect</strong>
      <span>Think First. Build Better.</span>
      <span>Loading page…</span>
    </div>
  )
}

export default RouteFallback
