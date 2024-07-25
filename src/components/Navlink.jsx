import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const NavLink = ({ href, title }) => {
   return (
      <div className="relative">
         <Link href={href}>
            <div className="hover:top-0 transition-all bg-[#6d58a5] lg:py-2.5 lg:px-9 px-4 py-2 text-center text-sm lg:text-[15px] hover:text-white rounded-md">
               {title}
            </div>
         </Link>
      </div>
   );
};

export default NavLink;