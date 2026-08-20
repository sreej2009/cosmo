import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar.jsx'
import MobileNav from './components/MobileNav.jsx'
import Footer from './components/Footer.jsx'
import BranchGate from './components/BranchGate.jsx'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import Booking from './pages/Booking.jsx'
import Branches from './pages/Branches.jsx'
import BranchDetail from './pages/BranchDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()
  const [showBranchGate, setShowBranchGate] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <AnimatePresence>
        {showBranchGate && <BranchGate onDone={() => setShowBranchGate(false)} />}
      </AnimatePresence>
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-36">
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/movies" element={<PageTransition><Movies /></PageTransition>} />
              <Route path="/movies/:id" element={<PageTransition><MovieDetail /></PageTransition>} />
              <Route path="/booking/:movieId" element={<PageTransition><Booking /></PageTransition>} />
              <Route path="/branches" element={<PageTransition><Branches /></PageTransition>} />
              <Route path="/branches/:branchId" element={<PageTransition><BranchDetail /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
              <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <MobileNav />
    </div>
  )
}

export default App
