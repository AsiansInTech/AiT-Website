import React from 'react'

const ContactPage = () => {
  // Temp variables for social media links
  const DISCORD_LINK = '#discord-link-temp'
  const INSTAGRAM_LINK = '#instagram-link-temp'
  const CONTACT_EMAIL = 'info@cougarcs.com'

  // Temp officer data - replace with actual data later
  const officers = [
    {
      id: 1,
      name: 'John Smith',
      role: 'President',
      email: 'president@cougarcs.com',
      linkedin: 'https://linkedin.com/in/johnsmith-temp',
      image: '/officer-placeholder-1.jpg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Vice President',
      email: 'vp@cougarcs.com',
      linkedin: 'https://linkedin.com/in/sarahjohnson-temp',
      image: '/officer-placeholder-2.jpg'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Secretary',
      email: 'secretary@cougarcs.com',
      linkedin: 'https://linkedin.com/in/michaelchen-temp',
      image: '/officer-placeholder-3.jpg'
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Treasurer',
      email: 'treasurer@cougarcs.com',
      linkedin: 'https://linkedin.com/in/emilydavis-temp',
      image: '/officer-placeholder-4.jpg'
    },
    {
      id: 5,
      name: 'David Wilson',
      role: 'Events Coordinator',
      email: 'events@cougarcs.com',
      linkedin: 'https://linkedin.com/in/davidwilson-temp',
      image: '/officer-placeholder-5.jpg'
    },
    {
      id: 6,
      name: 'Jessica Martinez',
      role: 'Marketing Director',
      email: 'marketing@cougarcs.com',
      linkedin: 'https://linkedin.com/in/jessicamartinez-temp',
      image: '/officer-placeholder-6.jpg'
    },
    {
      id: 7,
      name: 'Robert Taylor',
      role: 'Technical Lead',
      email: 'technical@cougarcs.com',
      linkedin: 'https://linkedin.com/in/roberttaylor-temp',
      image: '/officer-placeholder-7.jpg'
    },
    {
      id: 8,
      name: 'Amanda Brown',
      role: 'Outreach Coordinator',
      email: 'outreach@cougarcs.com',
      linkedin: 'https://linkedin.com/in/amandabrown-temp',
      image: '/officer-placeholder-8.jpg'
    }
  ]

  return (
    <div className="contact-container">
      {/* Dark Gray Header */}
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
      </div>

      {/* Main Content Section - Two Columns */}
      <div className="contact-main-content">
        {/* Left Column - Information Panel */}
        <div className="contact-info-panel">
          <p className="contact-info-text">
            If you have any questions or concerns, please feel free to reach out to us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">
              {CONTACT_EMAIL}
            </a>{' '}
            or via this form.
          </p>
          <p className="contact-info-text">
            You can also join our{' '}
            <a href={DISCORD_LINK} className="contact-link">
              Discord
            </a>
            , follow us on{' '}
            <a href={INSTAGRAM_LINK} className="contact-link">
              Instagram
            </a>
            , or connect with us on{' '}
            <a href="#linkedin-link-temp" className="contact-link">
              Linkedin!
            </a>
          </p>
          <p className="contact-info-text">
            Have someone specific in mind? Our officers for the current term are listed in the section below.
          </p>
          <div className="contact-divider"></div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="contact-form-section">
          <form className="contact-form">
            <div className="contact-form-group">
              <label htmlFor="name" className="contact-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="contact-input"
                placeholder="Cody Cougar"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="email" className="contact-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="contact-input"
                placeholder="info@cougarcs.com"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="message" className="contact-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="contact-textarea"
                placeholder="Questions, comments, concerns, suggestions"
              />
            </div>

            <button type="submit" className="contact-submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Officers Section */}
      <div className="officers-section">
        <div className="officers-container">
          {officers.map((officer) => (
            <div key={officer.id} className="officer-card">
              <div className="officer-image-wrapper">
                <img
                  src={officer.image}
                  alt={`${officer.name} - ${officer.role}`}
                  className="officer-image"
                />
              </div>
              <div className="officer-info">
                <h3 className="officer-name">{officer.name}</h3>
                <p className="officer-role">{officer.role}</p>
                <div className="officer-links">
                  <a
                    href={`mailto:${officer.email}`}
                    className="officer-link officer-email"
                    aria-label={`Email ${officer.name}`}
                  >
                    Email
                  </a>
                  <a
                    href={officer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="officer-link officer-linkedin"
                    aria-label={`${officer.name} LinkedIn`}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactPage