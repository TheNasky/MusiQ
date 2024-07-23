import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const NavLink = ({ href, title, dropdownItems }) => {
   const [isDropdownHovered, setIsDropdownHovered] = useState(false); // Track dropdown hover state
   const timeoutRef = useRef(null);

   const handleMouseEnter = () => {
      clearTimeout(timeoutRef.current);
      setIsDropdownHovered(true);
   };

   const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
         setIsDropdownHovered(false);
      }, 50); // Adjust delay as needed for usability
   };

   useEffect(() => {
      return () => {
         clearTimeout(timeoutRef.current);
      };
   }, []);

   // Determine number of columns dynamically
   const numColumns = dropdownItems && dropdownItems.length >= 6;

   return (
      <div className="relative">
         <Link href={href}>
            {/* <div
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
               className="fixed top-4 pt-10 p-8 pr-20 pb-6"
            ></div> */}
            <div
               className="hover:top-0 transition-all bg-[#a41464] lg:py-3 lg:px-5 px-4 py-2 text-center text-sm lg:text-[15px] uppercase hover:text-white rounded-md"
               // onMouseEnter={handleMouseEnter}
               // onMouseLeave={handleMouseLeave}
            >
               {title}
            </div>
         </Link>
         {/* {dropdownItems && (
            <div
               className={`dropdown-container w-[280px] absolute top-full left-30 transform bg-[#181818] text-[#ADB7BE] rounded-lg shadow-lg p-2 mt-2 ${
                  isDropdownHovered ? "scale-100 transition-transform duration-200 origin-top-left ease-in-out opacity-100" : "scale-0 opacity-0 transform-gpu"
               }`}
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
            >
               <div className="relative">
                  <div className="arrow-up"></div>
                  <ul
                     className={`grid ${
                        numColumns ? "grid-cols-2" : "grid-cols-1"
                     } gap-1`}
                  >
                     {dropdownItems.map((item, index) => (
                        <li
                           key={index}
                           className="dropdown-item py-2 px-4 hover:bg-[#121212] hover:text-[#725EB3] rounded-lg"
                        >
                           <Link href={item.path} className="text-[15px] pr-8">
                              {item.title}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         )} */}
      </div>
   );
};

export default NavLink;