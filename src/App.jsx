import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
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

function App() {
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
        <Route path="/accessibility" element={<UtilityPage slug="accessibility" />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App