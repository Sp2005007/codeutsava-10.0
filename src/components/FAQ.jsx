import { useState } from 'react'
import { faqData, crewColors } from '../data/content.js'
import Crewmate from './Crewmate.jsx'
import { playClick, playTaskComplete } from '../utils/sound.js'

// A "crew comms" style FAQ instead of a plain accordion. Every
// question is one row in a contact-list-like panel. Tapping a row
// doesn't just reveal text — it brings the crewmate for that question
// on screen next to a speech-bubble holding the answer, like they
// walked up to answer it themselves.
function FAQ() {
  // stores the index of the currently open question, or null if none are open
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index) => {
    const opening = openFAQ !== index
    setOpenFAQ(openFAQ === index ? null : index)
    opening ? playTaskComplete() : playClick()
  }

  return (
    <section id="faq" className="faq">
      <div className="section-label">EMERGENCY MEETING</div>
      <h2 className="section-title">Frequently Asked Questions</h2>

      <div className="faq-list">
        {faqData.map((item, index) => {
          const isOpen = openFAQ === index
          const color = crewColors[item.color] || crewColors.red

          return (
            <div key={item.question} className={`faq-row ${isOpen ? 'faq-row-open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <span className="faq-avatar" style={{ '--faq-color': color }}>
                  <Crewmate color={color} size={26} pose="idle" />
                </span>
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-signal">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>

              <div className="faq-answer-wrap">
                <div className="faq-answer">
                  <Crewmate color={color} size={54} pose="idle" className="faq-answer-crewmate" />
                  <div className="faq-bubble" style={{ '--faq-color': color }}>
                    <p>{item.answer}</p>
                    <p className="faq-task-complete">TASK COMPLETED ✓</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FAQ
