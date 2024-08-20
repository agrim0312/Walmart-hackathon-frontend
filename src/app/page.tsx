import Footer from "@/components/footer";
import LandingNavbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              VRO - Vehicle Routing Optimizer
            </h1>
            <p className="text-lg text-gray-600">
              Solve optimization and routing challenges for your fleet, drivers,
              and deliveries. Calculate accurate travel distances and times with
              our advanced genetic algorithm.
            </p>
            <div className="flex space-x-4">
              <Link href="/login">
                <span className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300">
                  Get Started
                </span>
              </Link>
              <Link href="https://github.com/agrim0312/Walmart-hackathon-frontend">
                <span className="px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition duration-300">
                  Github Repo
                </span>
              </Link>
            </div>
          </div>

          {/* Right side video */}
          <div className="md:w-1/2 relative">
            <div className="video-embed-old position-absolute spread w-embed">
              <video
                className="video-tag w-full rounded-lg shadow-lg"
                muted
                autoPlay
                playsInline
                loop
              >
                <source
                  src="https://static-assets.mapbox.com/www/videos/matrix-api/section_hero/video@800p.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Problems Section */}
        <div className="mt-16 max-w-6xl w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Common Routing Challenges
          </h2>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Inefficient Routes & Manual Errors
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>
                  Traditional planning often results in longer, costlier routes.
                </li>
                <li>
                  Delivery services face increased costs due to suboptimal
                  routes.
                </li>
                <li>Manual planning is slow and error-prone.</li>
                <li>Missed traffic updates can cause delays.</li>
              </ul>
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Uneven Workload & Limited Visualization
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Imbalanced workload distribution among vehicles.</li>
                <li>
                  Some trucks may be overused while others are underutilized.
                </li>
                <li>Inadequate tools for route monitoring and analysis.</li>
                <li>
                  Managers cant easily track or improve route performance.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="mt-16 max-w-6xl w-full bg-purple-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Solutions
          </h2>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="md:w-1/3 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Optimized Routes
              </h3>
              <p className="text-gray-600">
                Our Genetic Algorithm minimizes total travel distance for
                delivery vehicles, reducing costs and improving delivery speed.
                It identifies the most efficient paths, cutting down fuel
                expenses and delivery times.
              </p>
            </div>
            <div className="md:w-1/3 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Balanced Workload Distribution
              </h3>
              <p className="text-gray-600">
                Our algorithm ensures that the workload is evenly distributed
                across all vehicles, preventing overuse and optimizing resource
                utilization. By balancing tasks, we extend vehicle lifespan and
                ensure that no truck is overburdened.
              </p>
            </div>
            <div className="md:w-1/3 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Clear Route Visualization
              </h3>
              <p className="text-gray-600">
                Managers can easily monitor and adjust routes, making informed
                decisions to further improve efficiency. Our intuitive interface
                provides real-time insights and analytics.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/learn-more">
              <span className="text-purple-600 hover:underline">
                Learn more about our solutions →
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
