import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function LandingNavbar({}: Props) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex  text-purple-500 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide w-10 h-10 lucide-truck"
            >
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
            <h1 className="text-xl text-purple-500 font-bold ml-2">
              VRO - Vehicle Routing Optimizer
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/products"
              className="text-gray-700 hover:text-purple-600"
            >
              Products
            </Link>
            <Link
              href="/solutions"
              className="text-gray-700 hover:text-purple-600"
            >
              Solutions
            </Link>
            <Link
              href="/developers"
              className="text-gray-700 hover:text-purple-600"
            >
              Developers
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-purple-600"
            >
              Pricing
            </Link>
          </div>
          <div>
            <Link
              href="/login"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition duration-300"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
