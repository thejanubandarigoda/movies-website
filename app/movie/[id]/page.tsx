'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaCalendarAlt, FaClock, FaUser, FaList } from 'react-icons/fa';
import api from '../../services/api';

interface MovieDetailsProps {
  params: {
    id: string;
  };
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  rating: number;
  genres: string[];
}

export default function MovieDetails({ params }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await api.getMovieDetails(parseInt(params.id));
        setMovie(movieData);
      } catch (err) {
        setError('Failed to load movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
        <p className="text-gray-400 mb-8">{error || "The requested movie couldn't be found."}</p>
        <Link href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg">
          Return Home
        </Link>
      </div>
    );
  }

  // Format release date
  const formatReleaseDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Movie backdrop */}
      <div className="relative h-[50vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${movie.backdropPath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>
      </div>

      {/* Movie details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-full md:w-80 h-[450px] rounded-lg overflow-hidden shadow-xl border-2 border-gray-800">
              <Image
                src={movie.posterPath}
                alt={`${movie.title} poster`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex items-center mt-2 mb-6">
              <div className="flex items-center bg-gray-800 rounded-lg px-3 py-1 mr-4">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center text-gray-400 mr-4">
                <FaCalendarAlt className="mr-1" />
                <span>{formatReleaseDate(movie.releaseDate)}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Link 
                    key={genre} 
                    href={`/genres/${genre.toLowerCase()}`}
                    className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg text-sm transition duration-300"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 font-bold py-3 px-6 rounded-lg flex items-center transition duration-300">
                <FaList className="mr-2" />
                Add to Watchlist
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 font-bold py-3 px-6 rounded-lg flex items-center transition duration-300">
                <FaStar className="mr-2" />
                Rate This Movie
              </button>
            </div>
          </div>
        </div>
        
        {/* Similar movies section would go here */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <p className="text-gray-400">Similar movies would be displayed here.</p>
        </div>
      </div>
    </div>
  );
} 