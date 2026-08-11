import { sponsorsData, crewColors } from '../data/content.js'
import Crewmate from './Crewmate.jsx'

// Cycles through crew colors for the card borders so neighboring
// cards don't repeat the same accent.
const accentCycle = ['red', 'cyan', 'yellow', 'purple', 'green', 'pink', 'blue', 'orange']

// Flatten the tiered sponsor data into one list of individual cards.
const flatSponsors = sponsorsData.flatMap((tier) =>
  tier.names.map((name) => ({ name, tier: tier.tier }))
)

// The list is duplicated once so the marquee can loop seamlessly:
// animating the track exactly -50% lines the second copy up with
// where the first one started.
const marqueeSponsors = [...flatSponsors, ...flatSponsors]

function Sponsors() {
  return (
    <section id="sponsors" className="sponsors">
      <Crewmate color={crewColors.white} size={46} pose="idle" className="sponsors-crewmate sponsors-crewmate-left" />
      <Crewmate color={crewColors.purple} size={50} pose="walk" flip className="sponsors-crewmate sponsors-crewmate-right" />

      <div className="section-label">OUR CREW</div>
      <h2 className="section-title">Our Sponsors</h2>

      <div className="sponsor-marquee">
        <div className="sponsor-track">
          {marqueeSponsors.map((sponsor, index) => {
            const accentColor = crewColors[accentCycle[index % accentCycle.length]]
            return (
              <div
                key={`${sponsor.name}-${index}`}
                className="sponsor-card"
                style={{ borderColor: accentColor }}
              >
                <p className="sponsor-card-tier" style={{ color: accentColor }}>
                  {sponsor.tier}
                </p>
                <p className="sponsor-card-name">{sponsor.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Sponsors
