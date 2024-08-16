import React from 'react';
import Link from 'next/link';
import { UserCircle, LogOut, MapPin, Truck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-violet-700 px-4 py-2 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold flex items-center">
            <Truck className="mr-2" />
            RouteOptimizer
          </span>
        </Link>
        <div className="flex items-center">
          <Link href="/home">
            <span className="px-4 py-2 hover:bg-violet-600 rounded-md flex items-center transition duration-300">
              <MapPin className="mr-2" size={18} />
              Home
            </span>
          </Link>
          <Link href="/profile">
            <span className="px-4 py-2 hover:bg-violet-600 rounded-md flex items-center transition duration-300">
              <UserCircle className="mr-2" size={18} />
              Profile
            </span>
          </Link>
          <Link href="/logout">
            <span className="px-4 py-2 hover:bg-violet-600 rounded-md flex items-center transition duration-300">
              <LogOut className="mr-2" size={18} />
              Logout
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}