import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-3xl">
        {/* Logo in Glass Card */}
        <div className="inline-flex items-center justify-center">
          <div className="glass-card w-[180px] h-[180px] md:w-[220px] md:h-[220px] flex items-center justify-center">
            <Image 
              src="/AiT_Logo.ico" 
              alt="AiT Logo" 
              width={120}
              height={120}
              className="md:w-[140px] md:h-[140px]"
            />
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
            Join the <span className="text-gray-400 font-normal">Community.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Asians in Tech at UH. Building community, growing skills, and creating opportunities for Asian students in technology.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/join" className="primary-cta px-8 py-3">
            Become a Member
          </Link>
          <Link href="/contact" className="secondary-cta px-8 py-3">
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}
