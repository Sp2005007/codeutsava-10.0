import { useState } from 'react'
import Crewmate from './Crewmate.jsx'
import { crewColors } from '../data/content.js'
import { playTaskComplete, playClick, playVent } from '../utils/sound.js'

// Crewmates arranged around the centered hero title, like a crew
// gathered for a mission briefing. Clicking one plays a vent sound
// and sends it floating off screen — a small easter egg.
const heroCrew = [
  { key: 'yellow', color: 'yellow', size: 76, className: 'hero-crewmate-yellow', flip: false },
  { key: 'blue', color: 'blue', size: 84, className: 'hero-crewmate-blue', flip: true },
  { key: 'red', color: 'red', size: 96, className: 'hero-crewmate-red', flip: false },
  { key: 'green', color: 'green', size: 70, className: 'hero-crewmate-green', flip: true },
  { key: 'cyan', color: 'cyan', size: 58, className: 'hero-crewmate-cyan', flip: true },
  { key: 'pink', color: 'pink', size: 54, className: 'hero-crewmate-pink', flip: false },
  { key: 'purple', color: 'purple', size: 50, className: 'hero-crewmate-purple', flip: false },
  { key: 'orange', color: 'orange', size: 46, className: 'hero-crewmate-orange', flip: true },
]

function Hero() {
  const [flownAway, setFlownAway] = useState(() => new Set())

  const handleCrewmateClick = (key) => {
    playVent()
    setFlownAway((prev) => new Set(prev).add(key))
    // bring them back after a while so the hero doesn't stay empty
    setTimeout(() => {
      setFlownAway((prev) => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
    }, 4000)
  }

  return (
    <section id="home" className="hero">
      <div className="hero-vent hero-vent-left"></div>
      <div className="hero-vent hero-vent-right"></div>
      <div className="hero-wire hero-wire-one"></div>
      <div className="hero-wire hero-wire-two"></div>
      <div className="hero-porthole"></div>

      <div className="hero-crew">
        {heroCrew.map((member) => (
          <Crewmate
            key={member.key}
            color={crewColors[member.color]}
            size={member.size}
            flip={member.flip}
            onClick={() => handleCrewmateClick(member.key)}
            className={`hero-crewmate ${member.className} ${
              flownAway.has(member.key) ? 'hero-crewmate-flown' : ''
            }`}
          />
        ))}
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">// Turing Club presents</p>
        <h1 className="hero-title">
          CODEUTSAVA <span className="hero-title-accent">10.0</span>
        </h1>
        <p className="hero-tagline">TRUST YOUR CREW. BUILD THE FUTURE.</p>
        <p className="hero-description">
          A 24 hour hackathon where your crew builds real software, debugs on the fly,
          and completes the mission before the airlock closes.
        </p>

        <div className="hero-actions">
          <a href="#timeline" className="btn btn-emergency" onClick={playTaskComplete}>
            <span className="btn-emergency-ring"></span>
            Join The Crew
          </a>
          <a href="#about" className="btn btn-ghost" onClick={playClick}>
            View Mission
          </a>
        </div>

        <div className="hero-task-panel">
          <p className="hero-task-panel-title">TASKS</p>
          <ul>
            <li>
              <span className="task-dot"></span> Assemble your crew
            </li>
            <li>
              <span className="task-dot"></span> Submit your mission idea
            </li>
            <li>
              <span className="task-dot"></span> Build for 24 hours
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
