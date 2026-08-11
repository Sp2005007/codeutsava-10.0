// A hidden Easter egg overlay. Rendered whenever the "active" prop is
// true — the parent (Navbar) owns the state and toggling logic, this
// component just displays the moment, the same red-flash "emergency
// meeting" feeling from the game, done with plain CSS.
function EmergencyMeeting({ active }) {
  if (!active) return null

  return (
    <div className="emergency-overlay">
      <p className="emergency-text">EMERGENCY MEETING</p>
      <p className="emergency-subtext">someone tripled-clicked the logo...</p>
    </div>
  )
}

export default EmergencyMeeting
