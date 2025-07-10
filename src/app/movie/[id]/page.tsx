import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import MovieClient from './MovieClient';

type PageProps = {
  params: {id : string}
}

export default async function MovieDetail({ params, }: PageProps ) {
  const { id } = params;
  const res = await axios.get(
    `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
  );
  const movie = res.data.data.movie;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline block mb-4">
        ← Back to list
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{movie.title}</h1>

      <Image
        src={movie.large_cover_image}
        alt={movie.title}
        width={400}
        height={600}
        className="w-full max-w-md mb-4 rounded shadow"
      />

      <p className="text-gray-700 mb-2">
        <strong>Year:</strong> {movie.year}
      </p>

      <p className="text-gray-700 mb-4">{movie.description_full}</p>

      {/* Client side part — show modal, interactivity */}
      <MovieClient movie={movie} />
    </div>
  );
}
