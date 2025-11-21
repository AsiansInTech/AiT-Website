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
    <main className="section-shell space-y-12 md:space-y-16">
      {/* Header */}
      <header className="space-y-4">
        <h1>Contact Us</h1>
        <p className="max-w-2xl text-gray-300">
          Have questions or want to get involved? Reach out to us directly or connect with our team.
        </p>
      </header>

      {/* Two-column section - Info and Form */}
      <section className="grid gap-10 md:grid-cols-2">
        {/* Left Column - Information */}
        <div className="space-y-4">
          <h2>Get in Touch</h2>
          <p>
            If you have any questions or concerns, please feel free to reach out to us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-100 underline underline-offset-4 hover:text-gray-50 transition">
              {CONTACT_EMAIL}
            </a>{' '}
            or via this form.
          </p>
          <p>
            You can also join our{' '}
            <a href={DISCORD_LINK} className="text-gray-100 underline underline-offset-4 hover:text-gray-50 transition">
              Discord
            </a>
            , follow us on{' '}
            <a href={INSTAGRAM_LINK} className="text-gray-100 underline underline-offset-4 hover:text-gray-50 transition">
              Instagram
            </a>
            , or connect with us on{' '}
            <a href="#linkedin-link-temp" className="text-gray-100 underline underline-offset-4 hover:text-gray-50 transition">
              LinkedIn!
            </a>
          </p>
          <p>
            Have someone specific in mind? Our officers for the current term are listed below.
          </p>
        </div>

        {/* Right Column - Contact Form */}
        <div className="glass-panel p-6 md:p-7">
          <h2 className="mb-6">Send us a Message</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2.5 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                placeholder="Cody Cougar"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2.5 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                placeholder="info@cougarcs.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2.5 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition resize-none"
                placeholder="Questions, comments, concerns, suggestions"
              />
            </div>

            <button type="submit" className="primary-cta w-full">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Officers Section */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2>Our Officers</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the team leading Asians in Tech this year. Feel free to reach out directly!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {officers.map((officer) => (
            <div key={officer.id} className="glass-card p-5 space-y-4">
              <div className="aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                <img
                  src={officer.image}
                  alt={`${officer.name} - ${officer.role}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-50">{officer.name}</h3>
                <p className="text-sm text-gray-400">{officer.role}</p>
                <div className="flex gap-2 pt-2">
                  <a
                    href={`mailto:${officer.email}`}
                    className="flex-1 text-center text-xs py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-gray-100 transition"
                    aria-label={`Email ${officer.name}`}
                  >
                    Email
                  </a>
                  <a
                    href={officer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-gray-100 transition"
                    aria-label={`${officer.name} LinkedIn`}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ContactPage
