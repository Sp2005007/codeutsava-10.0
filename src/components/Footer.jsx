import Crewmate from './Crewmate.jsx'
import { crewColors } from '../data/content.js'

const footerCrew = ['red', 'yellow', 'green', 'blue', 'pink']

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-airlock">
        <div className="footer-panel-lights">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="footer-crew">
        {footerCrew.map((color, index) => (
          <Crewmate
            key={color}
            color={crewColors[color]}
            size={40}
            pose={index % 2 === 0 ? 'walk' : 'idle'}
            flip={index % 2 === 1}
            className="footer-crewmate"
          />
        ))}
      </div>

      <p className="footer-logo">
        CODEUTSAVA <span>10.0</span>
      </p>
      <p className="footer-tagline">Trust your crew. Build the future.</p>

      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#about">Mission</a>
        <a href="#timeline">Progress</a>
        <a href="#faq">FAQ</a>
      </div>

      <p className="footer-copyright">
        © 2026 Turing Club of Programmers. Made by the crew, for the crew.
      </p>
    </footer>
  )
}

export default Footer
