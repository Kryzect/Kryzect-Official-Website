import { CONTACT_EMAIL } from '../config.js'
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
          <a className="site-footer__contact" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <p className="site-footer__location">
            Lahore, Pakistan · Working remotely
          </p>
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
          <div className="site-footer__social">
            <h3 className="site-footer__heading">Connect</h3>
            <SocialLinks />
          </div>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__legal">
          © {new Date().getFullYear()} Kryzect. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
