import { timelineData, crewColors } from '../data/content.js'
import Crewmate from './Crewmate.jsx'

function Timeline() {
  return (
    <section id="timeline" className="timeline">
      <div className="section-label">MISSION PROGRESS</div>
      <h2 className="section-title">Task List</h2>

      <div className="timeline-track">
        {timelineData.map((item) => (
          <div key={item.title} className="timeline-item">
            <div className="timeline-marker" style={{ background: crewColors[item.color] }}>
              <span className="timeline-check">✓</span>
            </div>

            <Crewmate
              color={crewColors[item.color]}
              size={44}
              pose="walk"
              className="timeline-crewmate"
            />

            <div className="timeline-body">
              <p className="timeline-date">{item.date}</p>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Timeline
