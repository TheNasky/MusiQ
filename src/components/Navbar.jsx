"use client";
import Link from "next/link";
import NavLink from "./Navlink.jsx";
import Image from "next/image.js";
import { useState } from "react";

const navLinks = [
   {
      title: "Principal",
      path: "/",
      dropdownItems: [
         { title: "Dropdown?", path: "/listas/ruta" },
      ],
   },
   {
      title: "Mi lista",
      path: "/mylist",
      dropdownItems: [
         { title: "Dropdown?", path: "/listas/ruta" },
      ],
   },
   {
      title: "Mi perfil",
      path: "/listas",
      dropdownItems: [
      { title: "otro Dropdown?", path: "/listas/ruta" },   
      ], 
   },
];

{/* <nav className="lg:fixed w-full bg-[#725EB3] bg-opacity-100 z-50 lg:bg-opacity-10 lg:backdrop-blur-sm lg:mb-4">
         <div className="flex flex-wrap items-center justify-between pl-4 mx-auto p-4 lg:px-24 pt-0 pb-0 sm:pb-0 lg:bg-[#121212] lg:bg-opacity-[0.35]">
            <Link href="/" className="max-h-20 flex-shrink-0">
               <Image src="/MusiQ.png" alt="Logo" width={240} height={100} priority />
            </Link>
            <div className="hidden lg:block lg:flex-grow">
               <ul className="flex p-4 md:p-0 md:flex-row md:space-x-9 mt-0"></ul> */}

export default function Navbar() {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
      <nav className="lg:fixed w-full bg-[#725EB3] bg-opacity-100 z-50 lg:bg-opacity-10 lg:backdrop-blur-sm lg:mb-4">
         <div className="flex flex-wrap items-center justify-between pl-4 mx-auto p-4 lg:px-24 pt-0 pb-0 sm:pb-0 lg:bg-[#121212] lg:bg-opacity-[0.35]">
            {/* <div className="flex gap-14 items-center"> */}
               <Link href="/" className="max-h-20 flex-shrink-0">
                  <Image src="/MusiQ.png" alt="Logo" width={240} height={100} priority />
               </Link>
               
               <button
                  className="lg:hidden text-white"
                  onClick={() => setMenuOpen(!menuOpen)}
               >
                  {menuOpen ? 
                     'Cerrar' 
                     : 
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                     </svg>

                  }
               </button>
               
               <div className={`${menuOpen ? 'block' : 'hidden'} lg:block pt-2 z-50 px-6" id="navbar`}>
                  <ul className="flex flex-col lg:flex-row p-4 md:p-0 md:flex-row md:space-x-9 mt-0 bg-black lg:bg-transparent">
                     {navLinks.map((link, index) => (
                        <li className="" key={index}>
                           <NavLink
                              href={link.path}
                              title={link.title}
                              dropdownItems={link.dropdownItems}
                           />
                        </li>
                     ))}
                  </ul>
               </div>
            {/* </div> */}
         </div>
      </nav>
   );
}