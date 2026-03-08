import { React } from '../react'

const stats = {
  websiteVisits: '0',
  totalCompletions: '0',
  averageCompletionTime: '0 minutes',
}

export const AboutSection = () => {
  return (
    <section aria-label="About section" className="about-section">
      <p>
        The Person Above is a top down 2d story driven indi game developed by Joel Goodrum. I have
        developed many game prototypes before but this is my first completed project from start to
        finish.
      </p>
      <ul>
        <li>Website visits: {stats.websiteVisits}</li>
        <li>Total times game has been completed: {stats.totalCompletions}</li>
        <li>Average time to completion: {stats.averageCompletionTime}</li>
      </ul>
    </section>
  )
}
