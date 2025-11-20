import Link from "next/link";

export default function JoinPage() {
  return (
    <main className="page-shell py-10 md:py-16 space-y-12 md:space-y-16">
      <header className="pb-8 md:pb-12 border-b border-neutral-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Join Asians in Tech (AiT)
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
          AiT is a student organization at UH focused on building community for Asian students interested in tech, 
          providing events, mentorship, and career resources.
        </p>
      </header>

      <section>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Join AiT?</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Asians in Tech is more than just a student org—it's a community where Asian students 
                passionate about technology can connect, grow, and thrive together. Whether you're just 
                starting your tech journey or already deep into your major, AiT provides a supportive 
                environment to learn and collaborate.
              </p>
              <p>
                We host technical workshops, panel discussions with industry professionals, and networking 
                events that help you build both hard and soft skills. Our members get access to exclusive 
                opportunities to connect with tech companies, participate in hackathons, and work on 
                real-world projects.
              </p>
              <p>
                Beyond career development, AiT is about building lasting friendships and a sense of belonging. 
                We celebrate Asian culture in tech, provide mentorship from upperclassmen and alumni, and 
                collaborate with other organizations to create meaningful experiences for our members.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Member Benefits</h2>
            <ul className="space-y-3">
              <li className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 md:p-5 hover:bg-neutral-900 transition">
                <h3 className="text-lg font-semibold mb-2">Exclusive Workshops & Member Events</h3>
                <p className="text-gray-400 text-sm">
                  Access hands-on technical workshops covering web dev, data science, AI/ML, and more. 
                  Members-only events with deeper dives into topics.
                </p>
              </li>
              <li className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 md:p-5 hover:bg-neutral-900 transition">
                <h3 className="text-lg font-semibold mb-2">Tech Talks & Industry Panels</h3>
                <p className="text-gray-400 text-sm">
                  Hear from professionals working at top tech companies, startups, and innovative 
                  organizations. Get insider perspectives on the industry.
                </p>
              </li>
              <li className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 md:p-5 hover:bg-neutral-900 transition">
                <h3 className="text-lg font-semibold mb-2">Mentorship & Career Support</h3>
                <p className="text-gray-400 text-sm">
                  Connect with upperclassmen and alumni mentors who can guide you through coursework, 
                  internships, and career planning.
                </p>
              </li>
              <li className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 md:p-5 hover:bg-neutral-900 transition">
                <h3 className="text-lg font-semibold mb-2">Study Nights & Interview Prep</h3>
                <p className="text-gray-400 text-sm">
                  Regular study sessions for tough CS courses, plus mock interviews and leetcode practice 
                  to help you ace technical interviews.
                </p>
              </li>
              <li className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 md:p-5 hover:bg-neutral-900 transition">
                <h3 className="text-lg font-semibold mb-2">Hackathon & Project Support</h3>
                <p className="text-gray-400 text-sm">
                  Form teams, get project ideas, and receive guidance for hackathons and personal projects. 
                  Build your portfolio with real experience.
                </p>
              </li>
              <li className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 md:p-5 hover:bg-neutral-900 transition">
                <h3 className="text-lg font-semibold mb-2">Social Events & Community Building</h3>
                <p className="text-gray-400 text-sm">
                  Game nights, food outings, and cultural celebrations. Make friends and build a network 
                  that lasts beyond graduation.
                </p>
              </li>
              <li className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 md:p-5 hover:bg-neutral-900 transition">
                <h3 className="text-lg font-semibold mb-2">Access to Member Discord & Online Community</h3>
                <p className="text-gray-400 text-sm">
                  Join our active Discord server for announcements, discussions, resource sharing, and 
                  staying connected with members year-round.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Membership Options</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AiT offers both free and paid membership tiers. Free membership keeps you connected with 
            events and announcements, while paid membership unlocks additional perks and priority access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <article className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5 md:p-6 shadow">
            <h3 className="text-2xl font-bold mb-3">Free Membership</h3>
            <p className="text-gray-400 mb-4">
              Perfect for staying in the loop with AiT events, announcements, and community updates. 
              Great for exploring what we offer.
            </p>
            <p className="text-3xl font-bold mb-6">Free</p>
            <Link 
              href="/signup?plan=free" 
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium w-full border border-neutral-700 hover:bg-neutral-900 transition"
            >
              Join as Free Member
            </Link>
          </article>

          <article className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5 md:p-6 shadow">
            <h3 className="text-2xl font-bold mb-3">Paid Membership</h3>
            <p className="text-gray-400 mb-4">
              Unlock all benefits including priority event access, exclusive workshops, merch discounts, 
              and more. Full access to everything AiT offers.
            </p>
            <p className="text-3xl font-bold mb-6">$20/semester or $35/year</p>
            <Link 
              href="/signup?plan=paid" 
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium w-full bg-gray-100 text-black hover:bg-white transition"
            >
              Join as Paid Member
            </Link>
          </article>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Membership is open to all UH students. Pricing and specific perks may be updated throughout the year.
        </p>
      </section>
    </main>
  );
}
