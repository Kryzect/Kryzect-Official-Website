import { Link } from 'react-router-dom'

// Shared Kryzect button. Renders an in-app Link when `to` is present, an
// external anchor when `href` is present, otherwise a native <button>.
// `variant`: "primary" | "ghost". `className` is appended for layout contexts.
function Button({
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  children,
  type,
  ...rest
}) {
  const classes = `btn btn--${variant}${className ? ` ${className}` : ''}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
