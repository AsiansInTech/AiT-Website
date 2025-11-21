import Link from "next/link";

const benefits = [
  {
    id: 1,
    title: "Example Workshop Access",
    description: "Access to hands-on workshops covering various topics. This is example content showing what member benefits might look like.",
  },
  {
    id: 2,
    title: "Example Networking Events",
    description: "Connect with industry professionals and peers. Example description of networking opportunities and community events.",
  },
  {
    id: 3,
    title: "Example Mentorship Program",
    description: "Get guidance from experienced mentors. This is placeholder text demonstrating the mentorship benefit structure.",
  },
  {
    id: 4,
    title: "Example Career Resources",
    description: "Access to exclusive career development tools. Example content showing career support and resources available.",
  },
  {
    id: 5,
    title: "Example Project Collaboration",
    description: "Work on real projects with team members. Example description of collaborative opportunities and hands-on experience.",
  },
  {
    id: 6,
    title: "Example Social Events",
    description: "Join community gatherings and activities. This is sample text for social and cultural event descriptions.",
  },
  {
    id: 7,
    title: "Example Online Community",
    description: "Stay connected through our digital platforms. Example of how members can engage in online discussions and updates.",
  },
];

export default function JoinPage() {
  return (
    <main className="section-shell space-y-12 md:space-y-16">
      <header className="space-y-4">
        <h1>Join Example Organization</h1>
        <p className="max-w-2xl text-gray-300">
          This is an example membership page showing the layout and structure. Replace this content with your actual organization information and benefits.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h2>Why Join Example Org?</h2>
          <p>
            This is example paragraph text describing why someone should join your organization. 
            Replace this with compelling reasons and your unique value proposition. Make it personal 
            and authentic to your community.
          </p>
          <p>
            Here's another example paragraph highlighting key benefits and opportunities. You can describe 
            events, workshops, networking opportunities, or any other activities your organization offers. 
            Keep it engaging and informative.
          </p>
          <p>
            Final example paragraph emphasizing community and culture. Talk about what makes your organization 
            special, the people involved, and the lasting impact membership can have. Make readers excited 
            to be part of the journey.
          </p>
        </div>

        <div className="glass-panel p-6 md:p-7">
          <h2 className="mb-4">Example Member Benefits</h2>
          <div className="space-y-3">
            {benefits.map((benefit) => (
              <div className="glass-card px-4 py-3" key={benefit.id}>
                <h3 className="text-sm font-semibold">{benefit.title}</h3>
                <p className="text-xs md:text-sm text-gray-300 mt-1">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2>Example Membership Options</h2>
            <p className="text-gray-300 max-w-lg">
              This section demonstrates how to present different membership tiers. Customize the pricing, 
              benefits, and descriptions to match your actual offerings.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/signup?plan=paid" className="primary-cta">
              Join Example Org
            </Link>
            <Link href="/contact" className="secondary-cta">
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card p-5 space-y-3">
            <h3>Example Free Tier</h3>
            <p className="text-gray-300 text-sm">
              Example description for a free membership option. Outline what's included at this level 
              and why it's valuable. Perfect for those wanting to explore before committing.
            </p>
            <p className="text-2xl font-semibold text-gray-50">Free</p>
            <Link 
              href="/signup?plan=free" 
              className="secondary-cta w-full"
            >
              Join Free Tier
            </Link>
          </div>

          <div className="glass-card p-5 space-y-3">
            <h3>Example Premium Tier</h3>
            <p className="text-gray-300 text-sm">
              Example description for a paid membership with premium benefits. Highlight exclusive features, 
              priority access, and additional perks that justify the investment.
            </p>
            <p className="text-2xl font-semibold text-gray-50">$XX/period</p>
            <Link 
              href="/signup?plan=paid" 
              className="primary-cta w-full"
            >
              Join Premium Tier
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400">
          Example disclaimer or additional information. Use this space for eligibility requirements, 
          refund policies, or other important membership details.
        </p>
      </section>
    </main>
  );
}
