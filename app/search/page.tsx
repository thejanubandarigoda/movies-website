'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import api from '../services/api';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const results = await api.searchMovies(query);
        setSearchResults(results);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError('Failed to load search results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  // Helper to get year from date string
  const getYearFromDate = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  // Handle form submission for new searches
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Update URL with new search term
      window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search form */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for movies..."
                className="bg-gray-800 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Search
            </button>
            <Link
              href="/"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
            >
              <FaArrowLeft className="mr-2" /> Back
            </Link>
          </form>
        </div>

        {/* Search results heading */}
        <div className="mb-8">
          {query ? (
            <h1 className="text-2xl font-bold">
              Search results for: <span className="text-red-500">"{query}"</span>
            </h1>
          ) : (
            <h1 className="text-2xl font-bold">Search for movies</h1>
          )}
          
          {!isLoading && query && (
            <p className="text-gray-400 mt-2">
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>

        {/* Results */}
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
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-xl text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : query && searchResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">No movies found matching "{query}"</p>
            <p className="text-gray-400 mb-6">Try a different search term or browse our collection</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/movies"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Browse All Movies
              </Link>
            </div>
          </div>
        ) : query ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {searchResults.map((movie) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Enter a search term to find movies</p>
            <p className="text-gray-400">Or browse our collection</p>
          </div>
        )}
      </div>
    </div>
  );
} 