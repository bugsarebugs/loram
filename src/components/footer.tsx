import { FaWhatsappSquare, FaInstagramSquare, FaDonate } from "react-icons/fa";
import Link from "next/link";

export default function Footer(){
    return (
        <div className=" flex flex-row justify-between text-white bg-blue-950 p-5 ">
        <h1>&copy; All Rights Reserved. By Laurah LLH</h1>
        <ul className="flex mx-5">
            <li className=""><Link href="https://wa.me/+255613204190"><FaWhatsappSquare className="size-8  outline-green-600 hover:size-9"/></Link></li>
            <li><Link href="https://www.instagram.com/_.c.h.a.r.m.s/"><FaInstagramSquare className="size-8 fill-pink-400 hover:size-9"  /></Link></li>
        </ul>
        <div className="flex mx-2">
            Donate <FaDonate className="size-8  outline-green-600 hover:size-9"/> +255679121032
        </div>
    </div>
    )
}