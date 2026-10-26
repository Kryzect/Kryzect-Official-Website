import { Suspense, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import JsonLd from './JsonLd.jsx'
import { ENTITY } from '../data/site.js'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import RouteFallback from './RouteFallback.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import BrandIntro from './BrandIntro.jsx'

// Persistent shell; only route content suspends or enters error recovery.
// A skip link jumps keyboard users past the header to the main content.
function Layout() {
  const { pathname } = useLocation()
  const replayIntro = useRef(null)
  return (
    <div className="site">
      <JsonLd data={ENTITY} />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<RouteFallback />}>
            <ScrollToTop />
            <Outlet
              context={{ onReplayIntro: () => replayIntro.current?.() }}
            />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <BrandIntro replayRef={replayIntro} />
    </div>
  )
}

export default Layout
