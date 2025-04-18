'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedMovie {
  id: number;
  title: string;
  backdropPath: string;
  overview: string;
}

// Sample featured movies (in a real app, these would come from an API)
const featuredMovies: FeaturedMovie[] = [
  {
    id: 1,
    title: "Inception",
    backdropPath: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: inception.",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    backdropPath: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    backdropPath: "https://image.tmdb.org/t/p/original/5QmtW8VrJs33PEJLQcIZH1GMk.jpg",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
  }
];

export default function Hero() {
  // Using useState with an initial value of 0 - this will be consistent on both server and client
  const [currentSlide, setCurrentSlide] = useState(0);
  // Add a state to track if we're on the client
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Set mounted state to true when component mounts on client
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Use the first slide as a fallback during server rendering
  const movie = featuredMovies[isMounted ? currentSlide : 0];
  
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div 
        className="relative w-full h-full transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${movie.backdropPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
          <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              <p className="text-gray-300 text-lg mb-8 line-clamp-3">
                {movie.overview}
              </p>
              <div className="flex space-x-4">
                <Link 
                  href={`/movie/${movie.id}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  View Details
                </Link>
                <Link 
                  href="/movies"
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Browse All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Only show slide indicators after client-side hydration */}
      {isMounted && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-red-600' : 'bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 