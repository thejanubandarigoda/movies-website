import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  releaseYear: string;
}

export default function MovieCard({ id, title, posterPath, rating, releaseYear }: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        <div className="relative h-80 w-full">
          {posterPath ? (
            <Image
              src={posterPath}
              alt={`${title} poster`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1 flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-white text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white text-lg font-semibold truncate">{title}</h3>
          <p className="text-gray-400 text-sm">{releaseYear}</p>
        </div>
      </div>
    </Link>
  );
} 