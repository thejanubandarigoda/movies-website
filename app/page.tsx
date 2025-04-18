'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Hero from './components/Hero';
import MovieCard from './components/MovieCard';
import api, { SAMPLE_MOVIES } from './services/api';
import { FaChevronRight, FaFire, FaStar, FaClock } from 'react-icons/fa';

// Define interface for a movie
interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
  genres: string[];
}

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await api.getPopularMovies();
        setPopularMovies(movies);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Helper to get year from date string
  const getYearFromDate = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  // Get unique genres from all movies
  const allGenres = Array.from(
    new Set(
      SAMPLE_MOVIES.flatMap(movie => movie.genres)
    )
  ).slice(0, 6); // Limit to 6 genres for display

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Popular Movies Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <FaFire className="text-red-600 mr-2" />
            <h2 className="text-2xl font-bold">Popular Movies</h2>
          </div>
          <Link href="/movies" className="text-red-500 hover:text-red-400 flex items-center">
            View All <FaChevronRight className="ml-1" size={14} />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
                <div className="h-80 bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularMovies.slice(0, 5).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.posterPath}
                rating={movie.rating}
                releaseYear={getYearFromDate(movie.releaseDate)}
              />
            ))}
          </div>
        )}
      </section>
      
      {/* Browse by Genre Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Browse by Genre</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allGenres.map((genre) => (
            <Link 
              key={genre} 
              href={`/genres/${genre.toLowerCase()}`}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 text-center transition duration-300"
            >
              <div className="text-xl font-semibold text-gray-100">{genre}</div>
              <div className="text-sm text-gray-400 mt-2">
                {SAMPLE_MOVIES.filter(m => m.genres.includes(genre)).length} movies
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Ultimate Film Experience Awaits
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Discover thousands of movies, create watchlists, and share your favorites with friends.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/movies"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Browse Movies
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
