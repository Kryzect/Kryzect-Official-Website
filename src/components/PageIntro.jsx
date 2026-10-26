import Seo from './Seo.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'

export default function PageIntro({
  path,
  label,
  title,
  description,
  children,
}) {
  return (
    <>
      <Seo title={label} description={description} path={path} />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label, to: path },
        ]}
      />
      <section className="page-hero">
        <div className="page-container">
          <p className="page-hero__kicker">{label}</p>
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__text">{description}</p>
          {children}
        </div>
      </section>
    </>
  )
}
