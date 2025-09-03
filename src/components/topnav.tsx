"use client";

import {  useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function TopNav() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://yts.mx/api/v2/list_movies.json?query_term=${query}&limit=5`
        );
        setMovies(res.data.data.movies || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('query', value);
        params.set('page', '1');
      }, 500)
    );
  };

  return (
    <nav className="flex flex-row justify-between bg-white dark:bg-blue-950 items-center gap-4 p-4">
      <div>
        <Link href="/">
          <Image src="/LOGO.png" width={150} height={50} className="hover:w-40 hover:h-20" alt="logo" />
        </Link>
      </div>

      <div className="relative w-[300px]">
        <input
          type="search"
          placeholder="Search Movie Here"
          onChange={handleSearchChange}
          value={query}
          className="text-black dark:text-white border-2 px-10 border-amber-400 rounded-2xl p-2 w-full"
        />
        <span className="absolute left-3 top-3 text-gray-500"><FaSearch /></span>

        {movies.length > 0 && (
          <div className="absolute top-12 z-10 bg-black w-full rounded-md shadow-lg max-h-80 overflow-y-auto">
            <div className="flex flex-col p-2">
              {movies.map((movie) => (
                <Link
                  href={`/movie/${movie.id}`}
                  key={movie.id}
                  className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded"
                >
                  <Image
                    src={movie.medium_cover_image}
                    width={40}
                    height={60}
                    alt={movie.title}
                    className="rounded"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-white">{movie.title}</h3>
                    <p className="text-xs text-gray-400">{movie.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <span><Link href="/howto">How to Download?</Link></span>
    </nav>
  );
}
