import Background from "@/components/Background.jsx";
import FondoBlanco from "@/components/FondoBlanco.jsx";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="relative h-screen">
      <Background src={`/bgPrincipal.jpg`} />
      <div className="absolute top-0 left-0 w-full h-full">
        <FondoBlanco />

        <div className="absolute top-0 right-0 h-full w-[42%] flex items-center justify-center">
          <div className="text-center px-4 py-8">
            <Image
              src="/MusiQ.png"
              alt="Logo"
              width={200}
              height={100}
              className="mx-auto"
              priority
            />

            <h3 className="text-4xl lg:text-5xl text-[#6d58a5] text-opacity-80">
              <p className="font-bold">Conéctate</p>
              <p>a través </p>
              <p>
                de la <span className="font-bold text-[#f83a47]">música</span>
              </p>
            </h3>
            <h5 className=" text-lg text-[#2f2f2f] mt-4 text-left">
              <p> Crea y únete a las listas de música,</p>
              <p>comparte con tus amigos y disfruta de</p>
              <p>los buenos momentos</p>
            </h5>
            <div className="mt-6 text-left flex gap-14 justify-center">
              <Link
                href="#"
                className="bg-[#6d58a5] text-white px-4 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300"
              >
                Crear lista
              </Link>
              <Link
                href="#"
                className="bg-[#6d58a5] text-white px-4 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300"
              >
                Unirme a la lista
              </Link>
            </div>
            <div className="mt-6 text-left">
              <Link href="#" className="text-[#6d58a5] hover:underline">
                Tengo una lista creada
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
