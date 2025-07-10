'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import Link from 'next/link';
import { FaCopy, FaArrowDown} from "react-icons/fa"

export interface Torrent {
  url: string;
  hash: string;
  quality: '720p' | '1080p' | '2160p' | '4K' | string;
  type: 'bluray' | 'web' | string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: number;
}

export default function MovieClient({ movie }) {
  const [showModal, setShowModal] = useState(false);
const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 2000); // Clear message after 2s
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          <h2 className="text-white font-bold mb-1 text-2xl ">Select Quality</h2>
          <ul className="space-y-3 flex items-center self-center align-middle justify-center ">
            {movie.torrents?.map((torrent: Torrent, index: number) => (
              <li key={index} className='p-10 m-5 first:border-r-2 border-blue-500 text-white '>
                <div className="">
                    <h1 className='uppercase text-2xl font-bold '>{torrent.type}</h1>
                    <p>{torrent.quality} </p>
                    <p className='mb-5'>{torrent.size}</p>
                    <Link
                  href={torrent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white p-4 hover:bg-blue-200 hover:text-gray-600 bg-blue-500 rounded-2xl  " 
                >
                    Download
                </Link>
                <p className='flex p-2 mt-5 justify-center align-middle self-center items-center hover:translate-y-2'>Copy link <FaArrowDown/></p>
                <button
                      onClick={() => handleCopy(torrent.url)}
                      className="  p-2 text-white text-xs rounded-full hover:bg-gray-700"
                    >
                      {copied === torrent.url ? 'Copied!' : <FaCopy/>}
                </button>
                </div>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  );
}
