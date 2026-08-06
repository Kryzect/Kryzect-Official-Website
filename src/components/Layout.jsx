import { Outlet } from 'react-router-dom'

import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Loading from './Loading.jsx'
import ScrollToTop from './ScrollToTop.jsx'

// Global shell: Loading intro -> Header -> page content -> Footer.
// A skip link jumps keyboard users past the header to the main content.
function Layout() {
  return (
    <div className="site">
      <Loading />
      <ScrollToTop />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout