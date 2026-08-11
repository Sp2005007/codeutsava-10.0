import { useId } from 'react'

// Turns a hex color into a lighter or darker shade of itself.
// percent is negative to darken (shadow) and positive to lighten
// (highlight). This is what lets one crewmate look flat-shaded
// like the real game instead of a single flat blob of color.
function shadeColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16)
  let r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100))
  let g = ((num >> 8) & 0x00ff) + Math.round((255 - ((num >> 8) & 0x00ff)) * (percent / 100))
  let b = (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * (percent / 100))

  if (percent < 0) {
    r = (num >> 16) + Math.round((num >> 16) * (percent / 100))
    g = ((num >> 8) & 0x00ff) + Math.round(((num >> 8) & 0x00ff) * (percent / 100))
    b = (num & 0x0000ff) + Math.round((num & 0x0000ff) * (percent / 100))
  }

  const clamp = (v) => Math.max(0, Math.min(255, v))
  const toHex = (v) => clamp(v).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// The full body silhouette, reused for the fill, the clip path and
// the outline stroke so all three always line up perfectly.
const BODY_PATH = `M20 60
  C20 30 35 10 55 10
  C75 10 85 25 85 45
  L85 95
  C85 112 72 122 52 122
  C32 122 20 112 20 95
  Z`

// Two leg positions so not every crewmate on the page looks like it's
// standing in the exact same spot. "idle" is straight legs (the
// original pose), "walk" offsets one leg forward and one back.
const LEG_POSES = {
  idle: { left: 'M28 108 h16 v16 a6 6 0 0 1 -6 6 h-4 a6 6 0 0 1 -6 -6 Z', right: 'M56 108 h16 v16 a6 6 0 0 1 -6 6 h-4 a6 6 0 0 1 -6 -6 Z' },
  walk: { left: 'M24 106 h15 v18 a6 6 0 0 1 -6 6 h-3 a6 6 0 0 1 -6 -6 Z', right: 'M60 110 h15 v14 a6 6 0 0 1 -6 6 h-3 a6 6 0 0 1 -6 -6 Z' },
}

// A single reusable crewmate character, drawn with plain SVG shapes.
// We pass "color" as a prop so the same component can render every
// crewmate in the crew just by giving it a different color. A darker
// shadow shape and a lighter highlight shape are clipped to the body
// outline so the character reads as flat cel-shaded 2D art, the same
// way the actual game shades its crewmates, instead of one flat blob.
//
// "pose" swaps the leg shapes so crewmates don't all look identical,
// and "onClick" is passed straight through so a parent section can
// make a crewmate react when clicked (e.g. float away).
function Crewmate({ color = '#c5231f', size = 120, flip = false, pose = 'idle', className = '', onClick }) {
  const clipId = useId()
  const shadow = shadeColor(color, -35)
  const outline = shadeColor(color, -55)
  const legs = LEG_POSES[pose] || LEG_POSES.idle

  return (
    <div
      className={`crewmate ${onClick ? 'crewmate-clickable' : ''} ${className}`}
      onClick={onClick}
      style={{
        width: size,
        // keep the SVG's natural aspect ratio (roughly 3:4)
        height: size * 1.3,
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
    >
      <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id={clipId}>
            <path d={BODY_PATH} />
          </clipPath>
        </defs>

        {/* backpack, sits behind the body */}
        <rect x="70" y="46" width="16" height="34" rx="8" fill={shadow} stroke={outline} strokeWidth="2" />

        {/* legs, drawn before the body so the hips stay hidden underneath */}
        <path d={legs.left} fill={color} stroke={outline} strokeWidth="2" />
        <path d={legs.right} fill={shadow} stroke={outline} strokeWidth="2" />

        {/* body base color */}
        <path d={BODY_PATH} fill={color} stroke={outline} strokeWidth="2.5" />

        {/* flat cel-shading: a soft shadow on the lower right and a
            soft highlight on the upper left, both clipped so they
            never spill outside the body outline */}
        <ellipse cx="66" cy="78" rx="26" ry="46" fill={shadow} opacity="0.55" clipPath={`url(#${clipId})`} />
        <ellipse cx="38" cy="32" rx="17" ry="13" fill="#ffffff" opacity="0.16" clipPath={`url(#${clipId})`} />

        {/* visor */}
        <ellipse cx="58" cy="42" rx="22" ry="16" fill="#b9edf6" stroke="#4c7a86" strokeWidth="2" />
        <ellipse cx="66" cy="46" rx="14" ry="10" fill="#6fb9c9" opacity="0.5" />
        <ellipse cx="50" cy="35" rx="7" ry="4.5" fill="#ffffff" opacity="0.85" />
      </svg>
    </div>
  )
}

export default Crewmate
