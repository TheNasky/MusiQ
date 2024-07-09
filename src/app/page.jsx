import Background from "@/components/Background.jsx";
import Image from "next/image";

export default function Home() {
   return (
      <main className="">
         <Background />
         <div className="absolute top-0 pt-[25vh] lg:pt-[15vh] h-full bg-[#121212] bg-opacity-[0.5] w-full">
            <div className="w-full h-full absolute top-0 bg-[#725EB3] bg-opacity-[0.15]">
               <h1 className="text-6xl flex justify-center items-center h-full w-full text-white">
                  Hello world
               </h1>
            </div>
         </div>
      </main>
   );
}
