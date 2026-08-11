import { useRef, useState } from 'react'
import SoundToggle from './SoundToggle.jsx'
import EmergencyMeeting from './EmergencyMeeting.jsx'
import Crewmate from './Crewmate.jsx'
import { crewColors } from '../data/content.js'
import { playClick, playEmergency } from '../utils/sound.js'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Mission', href: '#about' },
  { label: 'Progress', href: '#timeline' },
  { label: 'Rules', href: '#guidelines' },
  { label: 'Crew', href: '#sponsors' },
  { label: 'FAQ', href: '#faq' },
]

function Navbar() {
  // controls whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false)

  // small hidden easter egg: click the logo 3 times quickly to call
  // an "emergency meeting". logoClicks counts clicks, and a timer
  // resets the count if the user pauses for too long between clicks.
  const [meetingActive, setMeetingActive] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const clickResetTimer = useRef(null)

  const closeMenu = () => setMenuOpen(false)

  const handleLinkClick = () => {
    playClick()
    closeMenu()
  }

  const handleLogoClick = (event) => {
    event.preventDefault()
    const nextCount = logoClicks + 1
    setLogoClicks(nextCount)

    clearTimeout(clickResetTimer.current)
    clickResetTimer.current = setTimeout(() => setLogoClicks(0), 800)

    if (nextCount >= 3) {
      setLogoClicks(0)
      setMeetingActive(true)
      playEmergency()
      setTimeout(() => setMeetingActive(false), 2200)
    }
  }

  return (
    <nav className="navbar">
      <a href="#home" className="navbar-logo-link" onClick={handleLogoClick}>
        <Crewmate color={crewColors.red} size={26} pose="idle" className="navbar-crewmate" />
        <span className="navbar-logo">
          CODEUTSAVA <span>10.0</span>
        </span>
      </a>

      <div className="navbar-right">
        <ul className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={handleLinkClick}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <SoundToggle />

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <EmergencyMeeting active={meetingActive} />
    </nav>
  )
}

export default Navbar
