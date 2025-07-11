import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import MovieClient from './MovieClient';


export default async function MovieDetail({ params }) {
  const {id} = await params;
  const res = await axios.get(
    `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
  );
  const movie = res.data.data.movie;
  const imageUrl = movie.large_cover_image || movie.background_image_original || movie.background_image || movie.medium_cover_image || movie.small_cover_image || "/default.jpeg";
  const alttext = movie.title || movie.description_full || "a movie";

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline block mb-4">
        ← Back to list
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{movie.title}</h1>

      <Image
        src={imageUrl}
        alt={alttext}
        width={400}
        height={600}
        className="w-full max-w-md mb-4 rounded shadow"
      />

      <p className="text-gray-700 mb-2">
        <strong>Year:</strong> {movie.year}
      </p>
      {/* Client side part — show modal, interactivity */}

      <p className="text-gray-700 mb-4">{movie.description_full}</p>
      {movie.title ? (
        <MovieClient movie={movie} />
    ) : (
      <p className="text-red-500 font-semibold mb-4">
          Oops! The link to download is not yet available, sorry.
      </p>
      )}    
    </div>
  );
}
