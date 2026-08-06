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
import Placeholder from './pages/Placeholder.jsx'

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

        {/* Core destinations — placeholders until each page is built */}
        <Route path="/contact" element={<Placeholder title="Contact" />} />
        <Route path="/book-a-call" element={<Placeholder title="Book a Call" />} />

        {/* Legal / utility */}
        <Route path="/privacy" element={<Placeholder title="Privacy" />} />
        <Route path="/terms" element={<Placeholder title="Terms" />} />
        <Route path="/security" element={<Placeholder title="Security" />} />
        <Route path="/accessibility" element={<Placeholder title="Accessibility" />} />

        <Route path="*" element={<Placeholder title="Page not found" />} />
      </Route>
    </Routes>
  )
}

export default App