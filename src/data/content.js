// Among Us style crewmate colors.
// Keeping this in one place means every component that needs a crew
// color (Crewmate, Hero, Sponsors...) reads from the same source.
export const crewColors = {
  red: '#e53935',
  yellow: '#facc15',
  green: '#22c55e',
  blue: '#3b82f6',
  pink: '#f472b6',
  purple: '#8b5cf6',
  orange: '#f97316',
  cyan: '#67e8f9',
  white: '#f5f7f8',
  black: '#3f4451',
}

// "MISSION PROGRESS" — event timeline. Each task carries the name of
// a crew color (matching a key in crewColors above) so Timeline.jsx
// can give every task its own colored crewmate and marker.
export const timelineData = [
  {
    date: '15th September, 11:00 AM',
    title: 'Registration Opens',
    description:
      "Registrations begin for CodeUtsava 10.0, the flagship event of The Turing Club of Programmers.",
    color: 'red',
  },
  {
    date: 'Task 02',
    title: 'Mission Briefing',
    description:
      'Submit your problem statement and a short pitch of the mission your crew plans to complete.',
    color: 'yellow',
  },
  {
    date: '9th October, 11:00 AM',
    title: 'Shortlisting Begins',
    description:
      'Team shortlisting begins in batches.',
    color: 'green',
  },
  {
    date: 'Task 04',
    title: 'Hack Day',
    description:
      '24 hours on campus. Build, debug, and survive the emergency meetings with your mentors.',
    color: 'blue',
  },
  {
    date: '1st November, 11:59 PM',
    title: 'Registration Closes',
    description:
      'Final call to lock in your crew — registrations for CodeUtsava 10.0 close.',
    color: 'purple',
  },
]

// "CREWMATE RULES" — guidelines
export const guidelinesData = [
  {
    title: 'Team Size',
    description: 'Every crew must have 2 to 4 members. Solo imposters are not allowed to compete alone.',
  },
  {
    title: 'Original Work',
    description: 'All code must be written during the event. Bringing a pre-built project will get you voted out.',
  },
  {
    title: 'Stay On Campus',
    description: 'Teams are expected to stay within the venue for the full duration of the hack day.',
  },
  {
    title: 'Respect The Crew',
    description: 'Be respectful to fellow participants, mentors and volunteers at all times.',
  },
  {
    title: 'Report Progress',
    description: 'Check in with your mentor at every scheduled emergency meeting to log your progress.',
  },
  {
    title: 'Use Allowed Tools',
    description: 'Any language, framework or API is fair game unless stated otherwise by the organizers.',
  },
]

// "OUR CREW" — sponsors, grouped by tier
export const sponsorsData = [
  { tier: 'Title Sponsor', names: ['Nova Systems'] },
  { tier: 'Gold Sponsor', names: ['Skyline Cloud', 'Vertex Labs'] },
  { tier: 'Silver Sponsor', names: ['Byteforge', 'Lumen Dev', 'Circuit Hub'] },
  { tier: 'Community Partner', names: ['DevCircle', 'HackNight', 'CodeRaipur'] },
]

// "EMERGENCY MEETING" — FAQ
export const faqData = [
  {
    question: 'How do I register for the hackathon?',
    answer:
      'No, you can register first and finalize your mission (problem statement) closer to the event.',
    color: 'red',
  },
  {
    question: 'What is the participation fee?',
    answer: 'No. Boarding CodeUtsava 10.0 is completely free for all registered crews.',
    color: 'yellow',
  },
  {
    question: 'Who can participate?',
    answer:
      'Any student crew, from first year to final year, across any college, is welcome to board the ship.',
    color: 'green',
  },
  {
    question: 'What is the ideal team size?',
    answer: 'You can register solo or in a pair, and we will help you find crewmates during team formation.',
    color: 'blue',
  },
  {
    question: 'Why should I participate in CodeUtsava?',
    answer: 'Yes, meals and a resting area are provided to every crew member for the full duration.',
    color: 'purple',
  },
]
