// in TopNav.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState} from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function TopNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('query', value);
        params.set('page', '1');
        router.push(`/?${params.toString()}`);
      }, 500)
    );
  };

  return (
    <nav className="flex flex-row justify-center bg-white dark:bg-blue-950 items-center gap-4 p-4">
      <div>
        <Link href="/"><Image src="/LOGO.png" width={150} height={50}  className="hover:w-40 hover:h-20" alt="logo"/></Link>
      </div>
                
    <div className="relative">
        <input
        type="search"
        placeholder="Search Movie Here"
        onChange={handleSearchChange}
        value={query}
        className="text-black dark:text-white border-2 px-10 border-amber-400 rounded-2xl p-2 relative"
      />
      <span className="absolute left-5 top-3"><FaSearch /></span>
    </div>   
      
    </nav>
  );
}
