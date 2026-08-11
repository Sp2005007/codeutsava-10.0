// Small sound utility built entirely on the browser's built-in Web
// Audio API — no audio files, no npm package. It plays short
// synthesized tones (beeps/chimes) instead of real game sound clips.
//
// A single AudioContext is shared and reused. "enabled" is a plain
// module-level variable rather than React state, since any component
// anywhere in the tree just needs to call playClick()/playTaskComplete()
// and have it silently do nothing when sound is off — that doesn't need
// React state or Context, just a shared flag.

let audioContext = null
let enabled = false

function getContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    audioContext = new AudioContextClass()
  }
  return audioContext
}

export function isSoundEnabled() {
  return enabled
}

export function setSoundEnabled(value) {
  enabled = value
  // browsers require audio to be "unlocked" by a user gesture,
  // so we resume the context right when the user turns sound on
  if (enabled) {
    getContext().resume()
  }
}

// Plays one short tone. frequency in Hz, duration in seconds.
function playTone(frequency, duration, delay = 0, type = 'sine', volume = 0.12) {
  if (!enabled) return

  const ctx = getContext()
  const startTime = ctx.currentTime + delay

  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, startTime)

  // quick fade in/out so the tone doesn't click at the edges
  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.02)
  gain.gain.linearRampToValueAtTime(0, startTime + duration)

  oscillator.connect(gain)
  gain.connect(ctx.destination)

  oscillator.start(startTime)
  oscillator.stop(startTime + duration + 0.05)
}

// Small UI click, used for nav links and secondary buttons
export function playClick() {
  playTone(520, 0.08, 0, 'square', 0.06)
}

// "Task completed" style two-note rising chime
export function playTaskComplete() {
  playTone(660, 0.12, 0, 'sine', 0.1)
  playTone(880, 0.16, 0.1, 'sine', 0.1)
}

// Emergency meeting style buzzer — two short low honks
export function playEmergency() {
  playTone(220, 0.22, 0, 'sawtooth', 0.09)
  playTone(196, 0.28, 0.24, 'sawtooth', 0.09)
}

// Vent/airlock style whoosh, used for the click-to-fly-away crewmates
export function playVent() {
  const ctx = getContext()
  if (!enabled) return
  const startTime = ctx.currentTime

  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(500, startTime)
  oscillator.frequency.exponentialRampToValueAtTime(120, startTime + 0.3)

  gain.gain.setValueAtTime(0.08, startTime)
  gain.gain.linearRampToValueAtTime(0, startTime + 0.3)

  oscillator.connect(gain)
  gain.connect(ctx.destination)

  oscillator.start(startTime)
  oscillator.stop(startTime + 0.35)
}
