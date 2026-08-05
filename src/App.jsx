import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Placeholder from './pages/Placeholder.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Core destinations — placeholders until each page is built */}
        <Route path="/services" element={<Placeholder title="Services" />} />
        <Route path="/work" element={<Placeholder title="Work" />} />
        <Route path="/products" element={<Placeholder title="Products" />} />
        <Route path="/products/ai-postmortem" element={<Placeholder title="AI Postmortem" />} />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/why-kryzect" element={<Placeholder title="Why Kryzect" />} />
        <Route path="/team" element={<Placeholder title="Team" />} />
        <Route path="/process" element={<Placeholder title="Process" />} />
        <Route path="/blog" element={<Placeholder title="Blog" />} />
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