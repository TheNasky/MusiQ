"use client";
import Link from "next/link";
import NavLink from "./Navlink.jsx";
import Image from "next/image.js";

const navLinks = [
   {
      title: "Principal",
      path: "/",
   },
   {
      title: "Mi lista",
      path: "/",
   },
];

export default function Navbar() {

   return (
      <nav className="lg:fixed w-full bg-[#725EB3] bg-opacity-50 z-50 lg:bg-opacity-10 lg:backdrop-blur-sm lg:mb-4">
         <div className="flex flex-wrap items-center justify-between pl-4 mx-auto p-4 lg:px-24 pt-0 pb-0 sm:pb-0 lg:bg-[#121212] lg:bg-opacity-[0.35]">
            
               <Link href="/" className="max-h-20 flex-shrink-0">
                  <Image src="/MusiQ.png" alt="Logo" width={240} height={100} priority />
               </Link>
               
               <div className=" lg:block pt-2 z-50 px-6">
                  <ul className="flex flex-col lg:flex-row p-4 md:p-0 md:flex-row md:space-x-9 mt-0 lg:bg-transparent">
                     {navLinks.map((link, index) => (
                        <li className="" key={index}>
                           <NavLink
                              href={link.path}
                              title={link.title}
                           />
                        </li>
                     ))}
                  </ul>
               </div>
         </div>
      </nav>
   );
}