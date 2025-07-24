import { FaWhatsappSquare, FaInstagramSquare, FaDonate } from "react-icons/fa";
import Link from "next/link";

export default function Footer(){
    return (
        <div className=" flex flex-row justify-center text-white bg-blue-950 p-5 ">
        <h1>&copy; All Rights Reserved. Made with Love By Laurah LLH</h1>
        <ul className="flex mx-5">
            <li><Link href="https://www.instagram.com/_.c.h.a.r.m.s/"><FaInstagramSquare className="size-8 fill-pink-400 hover:size-9"  /></Link></li>
        </ul>
    </div>
    )
}