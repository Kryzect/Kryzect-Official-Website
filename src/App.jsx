import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'

const LazyAbout = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/About.jsx'))
const LazyWhyKryzect = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/WhyKryzect.jsx'))
const LazyTeam = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Team.jsx'))
const LazyProcess = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Process.jsx'))
const LazyServices = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Services.jsx'))
const LazyServicePage = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/ServicePage.jsx'))
const LazyProducts = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Products.jsx'))
const LazyProductPage = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/ProductPage.jsx'))
const LazyWork = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Work.jsx'))
const LazyCaseStudy = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/CaseStudy.jsx'))
const LazyBlog = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Blog.jsx'))
const LazyArticlePage = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/ArticlePage.jsx'))
const LazyContact = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Contact.jsx'))
const LazyBookACall = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/BookACall.jsx'))
const LazyFaq = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Faq.jsx'))
const LazyIndustries = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Industries.jsx'))
const LazyIndustryPage = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/IndustryPage.jsx'))
const LazyCareers = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/Careers.jsx'))
const LazyUtilityPage = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/UtilityPage.jsx'))
const LazyNotFound = import.meta.env.SSR
  ? null
  : lazy(() => import('./pages/NotFound.jsx'))

function App({ pages = {} }) {
  const About = pages.About ?? LazyAbout
  const WhyKryzect = pages.WhyKryzect ?? LazyWhyKryzect
  const Team = pages.Team ?? LazyTeam
  const Process = pages.Process ?? LazyProcess
  const Services = pages.Services ?? LazyServices
  const ServicePage = pages.ServicePage ?? LazyServicePage
  const Products = pages.Products ?? LazyProducts
  const ProductPage = pages.ProductPage ?? LazyProductPage
  const Work = pages.Work ?? LazyWork
  const CaseStudy = pages.CaseStudy ?? LazyCaseStudy
  const Blog = pages.Blog ?? LazyBlog
  const ArticlePage = pages.ArticlePage ?? LazyArticlePage
  const Contact = pages.Contact ?? LazyContact
  const BookACall = pages.BookACall ?? LazyBookACall
  const Faq = pages.Faq ?? LazyFaq
  const Industries = pages.Industries ?? LazyIndustries
  const IndustryPage = pages.IndustryPage ?? LazyIndustryPage
  const Careers = pages.Careers ?? LazyCareers
  const UtilityPage = pages.UtilityPage ?? LazyUtilityPage
  const NotFound = pages.NotFound ?? LazyNotFound

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/why-kryzect" element={<WhyKryzect />} />
        <Route path="/team" element={<Team />} />
        <Route path="/process" element={<Process />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-a-call" element={<BookACall />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/careers" element={<Careers />} />

        {/* Legal / utility */}
        <Route path="/privacy" element={<UtilityPage slug="privacy" />} />
        <Route path="/terms" element={<UtilityPage slug="terms" />} />
        <Route path="/cookies" element={<UtilityPage slug="cookies" />} />
        <Route path="/security" element={<UtilityPage slug="security" />} />
        <Route
          path="/accessibility"
          element={<UtilityPage slug="accessibility" />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
