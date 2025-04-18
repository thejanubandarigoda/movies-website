'use client';

import { useState, useEffect } from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import api from '../services/api';

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
  genres: string[];
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await api.getPopularMovies();
        setMovies(moviesData);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies');
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

  // Sort movies based on selected option
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'releaseDate') {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    } else {
      // Default sort by rating/popularity
      return b.rating - a.rating;
    }
  });
  
  // Filter movies if a genre is selected
  const filteredMovies = filter === 'all' 
    ? sortedMovies 
    : sortedMovies.filter(movie => movie.genres.some(genre => 
        genre.toLowerCase() === filter.toLowerCase()
      ));

  // Extract all unique genres for the filter dropdown
  const allGenres = Array.from(
    new Set(
      movies.flatMap(movie => movie.genres)
    )
  ).sort();

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Browse Movies</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Filter dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <FaFilter className="text-gray-400 mr-2" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Genres</option>
                  {allGenres.map(genre => (
                    <option key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Sort dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <FaSort className="text-gray-400 mr-2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="popularity">Popularity</option>
                  <option value="releaseDate">Release Date</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Display number of results */}
        <p className="text-gray-400 mb-6">
          {filteredMovies.length} {filteredMovies.length === 1 ? 'result' : 'results'} found
        </p>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
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
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">No movies found matching your criteria.</p>
            <button 
              onClick={() => setFilter('all')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
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
      </div>
    </div>
  );
} 