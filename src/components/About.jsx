import Crewmate from './Crewmate.jsx'
import { crewColors } from '../data/content.js'

function About() {
  return (
    <section id="about" className="about">
      <div className="section-label">MISSION BRIEFING</div>

      <div className="about-grid">
        <div className="about-text">
          <h2 className="section-title">
            What is CodeUtsava?
            <Crewmate color={crewColors.purple} size={44} pose="idle" className="about-heading-crewmate" />
          </h2>
          <p>
            CodeUtsava is Central India's largest student coding event, run by the Turing Club
            of Programmers. Every year, crews of students dock in for 24 hours to design, build
            and ship real projects, guided by mentors and pushed by the clock.
          </p>
          <p>
            This year, the mission is simple: pick a problem worth solving, trust your crew, and
            get it built before time runs out.
          </p>
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <p className="about-stat-number">24</p>
            <p className="about-stat-label">Hours On Deck</p>
          </div>
          <div className="about-stat">
            <p className="about-stat-number">500+</p>
            <p className="about-stat-label">Crewmates</p>
            <Crewmate color={crewColors.yellow} size={34} pose="idle" className="about-stat-crewmate" />
          </div>
          <div className="about-stat">
            <p className="about-stat-number">40+</p>
            <p className="about-stat-label">Mentors Onboard</p>
          </div>
          <div className="about-stat">
            <p className="about-stat-number">10</p>
            <p className="about-stat-label">Editions Strong</p>
            <Crewmate color={crewColors.green} size={34} pose="idle" flip className="about-stat-crewmate" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
