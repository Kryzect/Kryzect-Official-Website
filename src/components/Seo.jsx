import { useLocation } from 'react-router-dom'
import {
  SITE_NAME,
  SITE_URL,
  SHARE_IMAGE_URL,
  isIndexable,
} from '../data/site.js'

export default function Seo({
  title,
  description,
  path,
  type = 'website',
  image,
  noindex,
}) {
  const { pathname } = useLocation()
  const current = noindex ? pathname : path
  const url = new URL(current, SITE_URL).href
  const fullTitle = `${SITE_NAME} — ${title}`
  const ogImage = new URL(image || SHARE_IMAGE_URL, SITE_URL).href
  const hidden = noindex ?? !isIndexable(current)
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={hidden ? 'noindex, follow' : 'index, follow'}
      />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta
        property="og:image:alt"
        content={image ? title : 'Kryzect — Think First. Build Better.'}
      />
      {!image && (
        <>
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}
