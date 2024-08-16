// Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/maps" className="hover:text-purple-300">Maps</Link></li>
              <li><Link href="/search" className="hover:text-purple-300">Search</Link></li>
              <li><Link href="/navigation" className="hover:text-purple-300">Navigation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/documentation" className="hover:text-purple-300">Documentation</Link></li>
              <li><Link href="/tutorials" className="hover:text-purple-300">Tutorials</Link></li>
              <li><Link href="/blog" className="hover:text-purple-300">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-purple-300">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-purple-300">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-purple-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-purple-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-300">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-700 text-center">
          <p>&copy; 2024 VRO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}