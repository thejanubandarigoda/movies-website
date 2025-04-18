'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-red-600">FilmFlex</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="px-3 py-2 text-sm font-medium hover:text-red-500">Home</Link>
              <Link href="/movies" className="px-3 py-2 text-sm font-medium hover:text-red-500">Movies</Link>
              <Link href="/genres" className="px-3 py-2 text-sm font-medium hover:text-red-500">Genres</Link>
              <Link href="/about" className="px-3 py-2 text-sm font-medium hover:text-red-500">About</Link>
            </div>
          </div>
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="bg-gray-800 text-white px-4 py-1 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                <FaSearch />
              </button>
            </form>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-gray-400 hover:text-white focus:outline-none">
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <Link href="/" className="block px-3 py-2 text-base font-medium hover:text-red-500">Home</Link>
            <Link href="/movies" className="block px-3 py-2 text-base font-medium hover:text-red-500">Movies</Link>
            <Link href="/genres" className="block px-3 py-2 text-base font-medium hover:text-red-500">Genres</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium hover:text-red-500">About</Link>
            <form onSubmit={handleSearch} className="relative mt-3 px-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="bg-gray-800 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button type="submit" className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
} 