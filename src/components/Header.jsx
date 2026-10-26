import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { PRIMARY_NAV, HEADER_CTA } from '../data/navigation.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  const location = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [location])
  useEffect(() => {
    const media = window.matchMedia('(min-width: 70rem)')
    const close = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', close)
    return () => media.removeEventListener('change', close)
  }, [])
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  const navClass = ({ isActive }) =>
    `nav-link${isActive ? ' nav-link--active' : ''}`
  return (
    <header
      className="site-header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Kryzect home">
          <span className="site-header__logo">
            <Logo />
          </span>
          <span className="site-header__wordmark">Kryzect</span>
        </Link>
        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          <ul className="site-nav__list">
            {PRIMARY_NAV.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} className={navClass}>
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
          ref={toggle}
          className="site-header__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="site-header__toggle-bar" />
          <span className="site-header__toggle-bar" />
          <span className="site-header__toggle-bar" />
        </button>
      </div>
      <nav
        id="site-mobile-menu"
        className={`site-mobile-menu${open ? ' is-open' : ''}`}
        hidden={!open}
        aria-label="Mobile primary"
      >
        <ul className="site-mobile-menu__list">
          {PRIMARY_NAV.map(({ label, to }) => (
            <li key={to}>
              <NavLink to={to} className={navClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button to={HEADER_CTA.to} className="site-mobile-menu__cta">
          {HEADER_CTA.label}
        </Button>
      </nav>
    </header>
  )
}
