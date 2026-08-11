import { useMemo, useState } from 'react'
import Crewmate from './Crewmate.jsx'
import StarBackground from './StarBackground.jsx'
import { crewColors } from '../data/content.js'
import { playClick, playTaskComplete, playEmergency } from '../utils/sound.js'

// The lineup of crewmates the player has to pick from. One of these
// colors is secretly the impostor, chosen once per visit.
const suspectColors = ['red', 'blue', 'yellow']

// The intro is now a tiny "Find The Impostor" game instead of a plain
// title card. We keep it as simple state + conditional rendering so
// it stays easy to follow:
//   1. show a lineup of crewmates, player taps one
//   2. wrong guess -> that crewmate is "cleared", player tries again
//   3. right guess -> reveal text + the real Enter The Mission button
//   4. clicking Enter plays a short "doors opening" transition, then
//      tells App to swap the intro out for the main site
function Intro({ onEnter }) {
  const [exiting, setExiting] = useState(false)
  const [doorsOpen, setDoorsOpen] = useState(false)
  const [found, setFound] = useState(false)
  const [message, setMessage] = useState('IMPOSTOR FOUND')
  const [wrongKey, setWrongKey] = useState(null)
  const [clearedKeys, setClearedKeys] = useState(() => new Set())

  // picked once when the component first mounts, and never changes
  // again during this visit
  const imposterKey = useMemo(
    () => suspectColors[Math.floor(Math.random() * suspectColors.length)],
    []
  )

  const handleSuspectClick = (key) => {
    if (clearedKeys.has(key)) return

    if (key === imposterKey) {
      playTaskComplete()
      setMessage('IMPOSTOR FOUND')
      setFound(true)
      // swap the message a moment later so it reads like two beats
      // instead of one long sentence appearing at once
      setTimeout(() => setMessage('THE CREW IS READY.'), 1300)
      return
    }

    playEmergency()
    setWrongKey(key)
    setClearedKeys((prev) => new Set(prev).add(key))
    setTimeout(() => setWrongKey(null), 1300)
  }

  const handleEnter = () => {
    playClick()
    setDoorsOpen(true)
    // let the door-slide animation play before fading the whole
    // screen, then hand control back to App once it's done
    setTimeout(() => setExiting(true), 500)
    setTimeout(onEnter, 1150)
  }

  return (
    <div className={`intro ${exiting ? 'intro-exiting' : ''}`}>
      <StarBackground />
      <div className="intro-lights"></div>

      {!found && (
        <div className="intro-game">
          <p className="intro-alert">⚠ ONE OF THEM ISN'T CREW ⚠</p>
          <h1 className="intro-title intro-title-small">FIND THE IMPOSTOR</h1>
          <p className="intro-subtitle">Tap the crewmate you suspect</p>

          <div className="intro-suspects">
            {suspectColors.map((key, index) => (
              <button
                key={key}
                type="button"
                className={`intro-suspect ${key === imposterKey ? 'intro-suspect-imposter' : ''} ${
                  clearedKeys.has(key) ? 'intro-suspect-cleared' : ''
                } ${wrongKey === key ? 'intro-suspect-wrong' : ''}`}
                style={{ animationDelay: `${index * 0.12}s` }}
                onClick={() => handleSuspectClick(key)}
                aria-label={`Accuse the ${key} crewmate`}
                disabled={clearedKeys.has(key)}
              >
                <Crewmate color={crewColors[key]} size={56} pose="idle" />
              </button>
            ))}
          </div>

          <p className={`intro-feedback ${wrongKey ? 'intro-feedback-show' : ''}`}>
            INCORRECT. THAT CREWMATE IS CLEAN.
          </p>
        </div>
      )}

      {found && (
        <div className="intro-content">
          <p className="intro-alert intro-alert-success">✓ {message}</p>
          <h1 className="intro-title">CODEUTSAVA 10.0</h1>
          <p className="intro-subtitle">THE CREW IS ASSEMBLING...</p>
          <button className="btn btn-primary intro-button" onClick={handleEnter}>
            Enter The Mission
          </button>
        </div>
      )}

      <div className={`intro-doors ${doorsOpen ? 'intro-doors-open' : ''}`}>
        <div className="intro-door intro-door-left"></div>
        <div className="intro-door intro-door-right"></div>
      </div>
    </div>
  )
}

export default Intro
