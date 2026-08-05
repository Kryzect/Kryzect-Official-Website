import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'

import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { PRIMARY_NAV, HEADER_CTA } from '../data/navigation.js'

function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const location = useLocation()

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false)
  }, [location])

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const navClass = ({ isActive }) =>
    `nav-link${isActive ? ' nav-link--active' : ''}`

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Kryzect home">
          <span className="site-header__logo" aria-hidden="true">
            <Logo />
          </span>
          <span className="site-header__wordmark">Kryzect</span>
        </Link>

        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          <ul className="site-nav__list">
            {PRIMARY_NAV.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} className={navClass} end={to === '/'}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Button to={HEADER_CTA.to} className="site-header__cta">
          {HEADER_CTA.label}
        </Button>

        <button
          type="button"
          ref={toggleRef}
          className="site-header__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="site-header__toggle-bar" aria-hidden="true" />
          <span className="site-header__toggle-bar" aria-hidden="true" />
          <span className="site-header__toggle-bar" aria-hidden="true" />
        </button>
      </div>

      {createPortal(
        <div
          id="site-mobile-menu"
          className={`site-mobile-menu${open ? ' is-open' : ''}`}
          hidden={!open}
        >
          <nav className="site-mobile-menu__nav" aria-label="Mobile primary">
            <ul className="site-mobile-menu__list">
              {PRIMARY_NAV.map(({ label, to }) => (
                <li key={to}>
                  <NavLink to={to} className={navClass} end={to === '/'}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Button to={HEADER_CTA.to} className="site-mobile-menu__cta">
            {HEADER_CTA.label}
          </Button>
        </div>,
        document.body,
      )}
    </header>
  )
}

export default Header