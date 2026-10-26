import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import About from './pages/About.jsx'
import WhyKryzect from './pages/WhyKryzect.jsx'
import Team from './pages/Team.jsx'
import Process from './pages/Process.jsx'
import Services from './pages/Services.jsx'
import ServicePage from './pages/ServicePage.jsx'
import Products from './pages/Products.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Work from './pages/Work.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import Blog from './pages/Blog.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import Contact from './pages/Contact.jsx'
import BookACall from './pages/BookACall.jsx'
import Faq from './pages/Faq.jsx'
import Industries from './pages/Industries.jsx'
import IndustryPage from './pages/IndustryPage.jsx'
import Careers from './pages/Careers.jsx'
import UtilityPage from './pages/UtilityPage.jsx'
import NotFound from './pages/NotFound.jsx'

// Eager server imports guarantee visible HTML without suspense reveal scripts.
// Browser routes keep their lazy imports and hydrate this completed markup.
const pages = {
  About,
  WhyKryzect,
  Team,
  Process,
  Services,
  ServicePage,
  Products,
  ProductPage,
  Work,
  CaseStudy,
  Blog,
  ArticlePage,
  Contact,
  BookACall,
  Faq,
  Industries,
  IndustryPage,
  Careers,
  UtilityPage,
  NotFound,
}
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App pages={pages} />
    </StaticRouter>,
  )
}
