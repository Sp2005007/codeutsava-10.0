import Crewmate from './Crewmate.jsx'

// Builds a list of random star positions once. Each star is just a
// tiny styled <span>, and CSS (@keyframes twinkle) handles the animation.
// Keeping the random generation as a plain function makes it easy to
// explain: "we make an array of N random positions and render one
// element per position".
function generateStars(count) {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    })
  }
  return stars
}

const stars = generateStars(140)
const particles = generateStars(25)

function StarBackground() {
  return (
    <div className="space-background">
      {/* soft colorful nebula glow, purely CSS gradients */}
      <div className="nebula nebula-one"></div>
      <div className="nebula nebula-two"></div>
      <div className="nebula nebula-three"></div>

      {/* distant planets drifting extremely slowly */}
      <div className="planet planet-one"></div>
      <div className="planet planet-two"></div>
      <div className="planet planet-three"></div>

      {/* small tumbling asteroids for a lived-in space feel */}
      <div className="asteroid asteroid-one"></div>
      <div className="asteroid asteroid-two"></div>
      <div className="asteroid asteroid-three"></div>

      {/* twinkling stars */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* slow drifting space dust particles */}
      {particles.map((particle) => (
        <span
          key={`particle-${particle.id}`}
          className="space-particle"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${8 + particle.duration * 2}s`,
          }}
        />
      ))}

      {/* occasional shooting stars, staggered with delays */}
      <span className="shooting-star shooting-star-one"></span>
      <span className="shooting-star shooting-star-two"></span>
      <span className="shooting-star shooting-star-three"></span>

      {/* a tiny "sus" crewmate that occasionally scuttles across the
          screen — pure CSS keyframe loop, no state needed */}
      <div className="sus-crewmate">
        <Crewmate color="#e885b3" size={26} pose="walk" />
      </div>
    </div>
  )
}

export default StarBackground
