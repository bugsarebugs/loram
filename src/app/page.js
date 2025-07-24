// app/page.js
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }) {
  const query = searchParams?.query || "";
  const page = parseInt(searchParams?.page || "1");

  let movies = [];
  let totalPages = 1;

  try {
    const res = await axios.get(
      `https://yts.mx/api/v2/list_movies.json?query_term=${query}&page=${page}`
    );

    movies = res.data.data.movies || [];
    const movieCount = res.data.data.movie_count || 0;
    const limit = res.data.data.limit || 20;
    totalPages = Math.ceil(movieCount / limit);
  } catch (err) {
    console.error("Error fetching movies:", err);
  }

  return (
    <div className="p-6">
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
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
                    <FaStar className="ml-4" />
                    <h2>{movie.rating}/10</h2>
                    {movie.genres?.map((genre, index) => (
                      <p key={index}>{genre}</p>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-4">
            {page > 1 && (
              <Link
                href={`/?query=${query}&page=${page - 1}`}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Previous
              </Link>
            )}
            <span className="px-4 py-2 text-gray-700 font-semibold">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/?query=${query}&page=${page + 1}`}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Next
              </Link>
            )}
          </div>
        </>
      ) : (
        <p>No movies found for “{query}”.</p>
      )}
    </div>
  );
}
