"use client";
import Link from "next/link";
import NavLink from "./Navlink.js";
import Image from "next/image.js";

const navLinks = [
   {
      title: "Crear Lista",
      path: "/movies",
      dropdownItems: [
         { title: "Dropdown?", path: "/listas/ruta" },
      ],
   },
   {
      title: "Unirse a una lista",
      path: "/genres",
      dropdownItems: [
         { title: "Dropdown?", path: "/listas/ruta" },
      ],
   },
   {
      title: "Mi Lista",
      path: "/shows",
      dropdownItems: [
         { title: "otro Dropdown?", path: "/listas/ruta" },
      ], 
   },
];

export default function Navbar() {
   return (
      <nav className="lg:fixed w-full lg:bg-[#725EB3] bg-[#725EB3] bg-opacity-100 z-50 lg:bg-opacity-10 lg:backdrop-blur-sm lg:mb-4">
         <div className="flex flex-wrap lg:justify-between justify-center pl-22 mx-auto p-4 lg:px-24 pt-0 pb-0 sm:pb-0 lg:bg-[#121212] lg:bg-opacity-[0.1]">
            <div className="flex gap-14 items-center">
               <Link href="/" className="max-h-20">
                  <Image src="/MusiQ.png" alt="Logo" width={240} height={100} priority />
               </Link>
               <div className="menu md:w-auto pt-2 z-50 hidden lg:block" id="navbar">
                  <ul className="flex p-4 md:p-0 md:flex-row md:space-x-6 mt-0">
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
            </div>
         </div>
      </nav>
   );
}