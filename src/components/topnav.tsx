"use client";
import Image from "next/image"
import Link from "next/link";
import { FaSearch} from "react-icons/fa";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const navz= [
    {
        label: "4K", href: "/4k",
    },
    {
        label: "Trending", href: "/trending",
    },
    {
        label: "Browse Movies", href: "/browse",
    },
    {
        label: "Login", href: "/login",
    },
    {
        label: "Register", href: "/register",
        
    }
]
export default function TopNav(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('query', value);
        newParams.set('page', '1');
        router.replace(`/?${newParams.toString()}`);
      }, 1000)
    );
  };
    return(
        <nav className="flex flex-row justify-between bg-white dark:bg-blue-950 align-middle self-center items-center">
            <div>
                <Link href="/"><Image src="/LOGO.png" width={150} height={50} className="" alt="logo"/></Link>
            </div>
            <div className="relative">
                <input type="search" name="" id="" placeholder="Search Movie Here"  onChange={handleSearchChange} className="text-black border-2 px-10 border-amber-400 rounded-2xl p-2 relative" />
                <span className="absolute top-3 left-5"><FaSearch className=""/></span>
            </div>
            <div>
                <ul className="flex text-black"> 
                    {navz.map((item) => (
                     <li className="p-5" key={item.href}>
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-gray-800 dark:text-white text-black pb-4 hover:border-b-violet-50 hover:text-blue-500 hover:border-b-4 font-medium hover:transform-border hover:transition-all hover:ease-linear"
                        >
                            {item.label}
                        </Link>
                     </li>
                 ))}
                </ul>
            </div>
        </nav>
    )
}