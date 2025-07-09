'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaStar } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  const page = parseInt(searchParams.get('page') || '1');
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (search = '', pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?quality=2D&query_term=${search}&page=${pageNum}`
      );
      const { movies = [], movie_count = 0, limit = 20 } = res.data.data;

      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(search.toLowerCase()) ||
        movie.title.toLowerCase().includes(search.toLowerCase())
      );

      setMovies(filteredMovies);
      setTotalPages(Math.ceil(movie_count / limit));
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(query, page);
  }, [query, page]);



  const goToPage = (newPage) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', newPage.toString());
    if (query) newParams.set('query', query);
    router.replace(`/?${newParams.toString()}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Movie List (2D)</h1>


      {loading ? (
        <div className="flex justify-center items-center space-x-2 text-2xl font-bold animate-bounce">
          {'LORAM'.split('').map((char, idx) => (
            <span
              key={idx}
              className="text-blue-500 animate-bounce"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      ) : (
        <>
          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
  <div className="relative border rounded shadow hover:shadow-lg transition overflow-hidden cursor-pointer hover:border-2 hover:border-amber-300">
    <img
      src={movie.medium_cover_image}
      alt={movie.title}
      className="w-full"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{movie.title}</h3>
      <p className="text-sm text-gray-500">{movie.year}</p>
    </div>

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-[rgba(100,200,200,0.5)] text-black font-bold opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
      <FaStar className="text-yellow-500 text-2xl mb-2" />
      <h2 className="text-lg mb-2">{movie.rating}/10</h2>
      {movie.genres?.map((genre, index) => (
        <p key={index} className="text-sm">{genre}</p>
      ))}
    </div>
  </div>
</Link>

              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No movies found.</p>
          )}

          <div className="mt-6 flex justify-center items-center space-x-4">
            {page > 1 && (
              <button
                onClick={() => goToPage(page - 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-400 rounded"
              >
                ← Previous
              </button>
            )}
            {page < totalPages && (
              <button
                onClick={() => goToPage(page + 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-400 rounded"
              >
                Next →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
