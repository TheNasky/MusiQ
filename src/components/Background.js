"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Background({ movie }) {
   const [imageLoaded, setImageLoaded] = useState(false);

   return (
      <div className="relative w-full h-[55vh] lg:h-[100vh] bg-[#121212] flex items-center justify-center z-48">
         <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: imageLoaded ? 1 : 0 }}
               transition={{ duration: 1 }}
               className="w-full h-full"
            >
               <Image
                  src={`/Bg1.png`}
                  alt="Background Image"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="object-[50%_28%] opacity-100 brightness-100 absolute"
                  priority
                  onLoadingComplete={() => setImageLoaded(true)}
               />
            </motion.div>
         </div>
      </div>
   );
}