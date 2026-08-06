import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import RouteFallback from './components/RouteFallback.jsx'
import Home from './pages/Home.jsx'

const About = lazy(() => import('./pages/About.jsx'))
const WhyKryzect = lazy(() => import('./pages/WhyKryzect.jsx'))
const Team = lazy(() => import('./pages/Team.jsx'))
const Process = lazy(() => import('./pages/Process.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const ServicePage = lazy(() => import('./pages/ServicePage.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'))
const Work = lazy(() => import('./pages/Work.jsx'))
const CaseStudy = lazy(() => import('./pages/CaseStudy.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const ArticlePage = lazy(() => import('./pages/ArticlePage.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const BookACall = lazy(() => import('./pages/BookACall.jsx'))
const Faq = lazy(() => import('./pages/Faq.jsx'))
const Industries = lazy(() => import('./pages/Industries.jsx'))
const IndustryPage = lazy(() => import('./pages/IndustryPage.jsx'))
const Careers = lazy(() => import('./pages/Careers.jsx'))
const UtilityPage = lazy(() => import('./pages/UtilityPage.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
          <Route path="/accessibility" element={<UtilityPage slug="accessibility" />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App