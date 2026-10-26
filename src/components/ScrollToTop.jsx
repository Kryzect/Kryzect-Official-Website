import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const navigation = useNavigationType()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let target
      try {
        target =
          hash && document.getElementById(decodeURIComponent(hash.slice(1)))
      } catch {
        target = null
      }
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' })
        target.focus({ preventScroll: true })
      } else if (navigation !== 'POP') {
        window.scrollTo({ top: 0, behavior: 'instant' })
        document.querySelector('#main-content')?.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key, navigation])
  return null
}
