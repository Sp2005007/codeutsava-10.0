import { guidelinesData } from '../data/content.js'

function Guidelines() {
  return (
    <section id="guidelines" className="guidelines">
      <div className="section-label">CREWMATE RULES</div>
      <h2 className="section-title">Guidelines</h2>

      <div className="guidelines-list">
        {guidelinesData.map((rule) => (
          <div key={rule.title} className="guideline-item">
            <span className="guideline-check">✓</span>
            <div>
              <h3 className="guideline-title">{rule.title}</h3>
              <p className="guideline-description">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Guidelines
