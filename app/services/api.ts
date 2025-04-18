import axios from 'axios';

// For a real implementation, you would use a real API key
// Typically you'd store this in environment variables (Next.js supports .env.local)
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.themoviedb.org/3';

// Sample movie data for demo purposes
// In a real app, this would come from an actual API call
export const SAMPLE_MOVIES = [
  {
    id: 1,
    title: 'Inception',
    overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: inception.',
    posterPath: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    releaseDate: '2010-07-16',
    rating: 8.4,
    genres: ['Action', 'Science Fiction', 'Adventure']
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    overview: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.',
    posterPath: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    releaseDate: '1994-09-23',
    rating: 8.7,
    genres: ['Drama', 'Crime']
  },
  {
    id: 3,
    title: 'The Dark Knight',
    overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
    posterPath: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/original/5QmtW8Vr and Js33PEJLQcIZH1GMk.jpg',
    releaseDate: '2008-07-16',
    rating: 8.5,
    genres: ['Action', 'Crime', 'Drama', 'Thriller']
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    overview: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper.',
    posterPath: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    releaseDate: '1994-09-10',
    rating: 8.5,
    genres: ['Thriller', 'Crime']
  },
  {
    id: 5,
    title: 'The Godfather',
    overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers.',
    posterPath: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    releaseDate: '1972-03-14',
    rating: 8.7,
    genres: ['Drama', 'Crime']
  },
  {
    id: 6,
    title: 'Fight Club',
    overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
    posterPath: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
    releaseDate: '1999-10-15',
    rating: 8.4,
    genres: ['Drama']
  }
];

// For a real implementation with TMDB API
const api = {
  // Get popular movies
  getPopularMovies: async () => {
    // In a real application, you would make an actual API call:
    // const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    // return response.data.results;
    
    // For demo purposes, return sample data
    return SAMPLE_MOVIES;
  },
  
  // Get movie details
  getMovieDetails: async (movieId: number) => {
    // In a real application:
    // const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    // return response.data;
    
    // For demo purposes, find movie in sample data
    const movie = SAMPLE_MOVIES.find(movie => movie.id === movieId);
    return movie || null;
  },
  
  // Search movies
  searchMovies: async (query: string) => {
    // In a real application:
    // const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
    // return response.data.results;
    
    // For demo purposes, filter sample data
    const results = SAMPLE_MOVIES.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase())
    );
    return results;
  },
  
  // Get movies by genre
  getMoviesByGenre: async (genreId: string) => {
    // In a real application:
    // const response = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    // return response.data.results;
    
    // For demo purposes, filter sample data
    const results = SAMPLE_MOVIES.filter(movie => 
      movie.genres.some(genre => genre.toLowerCase() === genreId.toLowerCase())
    );
    return results;
  }
};

export default api; 