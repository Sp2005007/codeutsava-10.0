import { useState } from 'react'
import Intro from './components/Intro.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Timeline from './components/Timeline.jsx'
import Guidelines from './components/Guidelines.jsx'
import Sponsors from './components/Sponsors.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'
import StarBackground from './components/StarBackground.jsx'

function App() {
  // true while the intro screen is showing. Once the user clicks
  // "Enter The Mission" this flips to false and the real page renders.
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return <Intro onEnter={() => setShowIntro(false)} />
  }

  return (
    <div className="page">
      <StarBackground />
      <Navbar />
      <main className="page-fade-in">
        <Hero />
        <About />
        <Timeline />
        <Guidelines />
        <Sponsors />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
