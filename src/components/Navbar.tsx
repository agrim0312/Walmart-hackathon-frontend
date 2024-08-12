import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold">My App</a>
        </Link>
        <div>
          <Link href="/login">
            <a className="px-4">Login</a>
          </Link>
          <Link href="/signup">
            <a className="px-4">Signup</a>
          </Link>
          <Link href="/form">
            <a className="px-4">Form</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
