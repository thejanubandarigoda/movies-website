'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  // Use state to store the year, with a default value for SSR
  const [year, setYear] = useState("2024");
  
  // Update the year only on the client side after hydration
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">FilmFlex</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for all things cinema. Discover, explore, and enjoy the magic of movies.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/movies" className="text-gray-400 hover:text-white">Browse Movies</Link></li>
              <li><Link href="/genres" className="text-gray-400 hover:text-white">Categories</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {year} FilmFlex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 