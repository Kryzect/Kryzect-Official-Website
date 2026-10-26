export default function SectionHeading({ kicker, title }) {
  return (
    <div className="page-section__heading">
      {kicker && <p className="page-section__kicker">{kicker}</p>}
      <h2 className="page-section__title">{title}</h2>
    </div>
  )
}
