import { useState } from 'react'
import { isSoundEnabled, setSoundEnabled, playClick } from '../utils/sound.js'

// A small 🔊/🔇 button. Sound starts OFF (browsers block autoplay
// anyway, and it's more respectful not to surprise anyone with
// audio). Clicking it flips the shared sound flag in utils/sound.js
// and updates its own icon.
function SoundToggle() {
  const [soundOn, setSoundOn] = useState(isSoundEnabled())

  const toggleSound = () => {
    const next = !soundOn
    setSoundEnabled(next)
    setSoundOn(next)
    if (next) playClick()
  }

  return (
    <button
      className="sound-toggle"
      onClick={toggleSound}
      aria-label={soundOn ? 'Mute sound' : 'Unmute sound'}
      title={soundOn ? 'Mute sound' : 'Unmute sound'}
    >
      {soundOn ? '🔊' : '🔇'}
    </button>
  )
}

export default SoundToggle
