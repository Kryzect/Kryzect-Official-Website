import { Link } from 'react-router-dom'

import Logo from './Logo.jsx'
import SocialLinks from './SocialLinks.jsx'
import { FOOTER_NAV } from '../data/navigation.js'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__logo" aria-hidden="true">
            <Logo />
          </span>
          <p className="site-footer__tagline">Think First. Build Better.</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          {FOOTER_NAV.map(({ heading, links }) => (
            <div className="site-footer__col" key={heading}>
              <h3 className="site-footer__heading">{heading}</h3>
              <ul className="site-footer__list">
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to} className="site-footer__link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="site-footer__social">
          <h3 className="site-footer__heading">Connect</h3>
          <SocialLinks />
        </div>
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__legal">© {new Date().getFullYear()} Kryzect. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer