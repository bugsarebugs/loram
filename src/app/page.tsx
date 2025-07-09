"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function HomePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${query}&page=${page}`
      );
      const fetched = res.data.data.movies || [];
      setMovies(fetched);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query, page]);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie: any) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="border rounded overflow-hidden shadow hover:shadow-lg cursor-pointer relative">
                <Image
                  src={movie.medium_cover_image}
                  width={200}
                  height={300}
                  alt={movie.title}
                  className="w-full h-auto"
                />
                <div className="p-2">
                  <h3 className="text-sm font-bold">{movie.title}</h3>
                  <p className="text-xs text-gray-500">{movie.year}</p>
                </div>
                <div className="text-black font-bold absolute top-0 left-0 w-full h-full align-middle items-center self-center hover:opacity-100 opacity-0 p-45 bg-[rgba(100,200,200,0.5)] text-center">
                    <FaStar className='ml-4' />
                    <h2>{movie.rating}/10</h2>
                    {movie.genres?.map((genre, index) => (
                     <p key={index}>{genre}</p>
  ))}
                  </div>
              </div>
               
              
            </Link>
          ))}
        </div>
      ) : (
        <p>No movies found for “{query}”.</p>
      )}
    </div>
  );
}
