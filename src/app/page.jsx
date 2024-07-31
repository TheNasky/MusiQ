"use client";

import Background from "@/components/Background.jsx";

import { useState } from "react"; // Importar useState desde React

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  // Estado para controlar qué formulario se debe mostrar
  const [visibleForm, setVisibleForm] = useState("menu"); // Puede ser 'menu', 'crear', 'unirse', 'existente'

  // Función para mostrar el formulario de creación de lista
  const showCreateForm = () => setVisibleForm("crear");

  // Función para mostrar el formulario de unirse a una lista
  const showJoinForm = () => setVisibleForm("unirse");

  // Función para mostrar el formulario de lista existente
  const showExistingListForm = () => setVisibleForm("existente");

  // Función para mostrar el menú principal
  const showMenu = () => setVisibleForm("menu");

  const router = useRouter();

  const createList = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const listData = {
      name: formData.get("nombre"),
      adminPassword: formData.get("contraseña"),
      isPrivate: formData.get("estado") === "privado",
    };
    try {
      const response = await axios.post("https://musiq-backend.vercel.app/api/list/create", listData);
      if (response.data.success) {
        const code = response.data.payload.code;
        alert(`List created successfully! Your code is: ${code}`);
        router.push(`/list/${code}`);
      }
    } catch (error) {
      alert("Error creating list: " + error.response?.data?.message || error.message);
    }
  };

  const joinList = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const joinData = {
      code: formData.get("codigo"),
      username: "Guest", // You might want to add a username field to the form
    };
    try {
      const response = await axios.post("https://musiq-backend.vercel.app/api/list/join", joinData);
      if (response.data.success) {
        router.push(`/list/${joinData.code}`);
      }
    } catch (error) {
      alert("Error joining list: " + error.response?.data?.message || error.message);
    }
  };

  const accessExistingList = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const listData = {
      name: formData.get("nombre"),
      adminPassword: formData.get("contraseña"),
    };
    try {
      const response = await axios.post("https://musiq-backend.vercel.app/api/list/access", listData);
      if (response.data.success) {
        router.push(`/list/${response.data.payload.code}`);
      }
    } catch (error) {
      alert("Error accessing list: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <main className="relative h-screen">
      <Background src="/bgPrincipal.jpg" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 h-full w-[42%] bg-white bg-opacity-80 flex flex-col items-center py-12">
          {/* Contenedor para centrar el logo */}
          <div className="mb-8">
            {" "}
            {/* Ajusta el margen inferior para el espacio entre el logo y el contenido */}
            <Image src="/MusiQ.png" alt="Logo" width={400} height={100} priority />
          </div>

          <div className="w-full flex flex-col items-center">
            {/*------------------------------inicio MEnu----------------------*/}
            {visibleForm === "menu" && (
              <>
                <h3 className="text-4xl lg:text-5xl text-[#6d58a5] text-opacity-80 text-center w-1/2">
                  <p className="">Conéctate</p>

                  <p>
                    a través de la <span className="font-bold text-[#f83a47]">música</span>
                  </p>
                </h3>
                <h5 className="text-lg text-[#2f2f2f] mt-4 text-left">
                  <p>Crea y únete a las listas de música,</p>
                  <p>comparte con tus amigos y disfruta de</p>
                  <p>los buenos momentos</p>
                </h5>
                <div className="mt-6 flex flex-row justify-between gap-2 items-center text-[1rem]">
                  <button
                    onClick={showCreateForm}
                    className="w-[10rem] bg-[#6d58a5] text-white px-2 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300"
                  >
                    Crear lista
                  </button>
                  <button
                    onClick={showJoinForm}
                    className="w-[10rem] bg-[#6d58a5] text-white px-2 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300"
                  >
                    Unirme a una lista
                  </button>
                </div>
                <div className="mt-6 text-left">
                  <Link
                    href="#"
                    className="text-[#6d58a5] hover:underline text-left"
                    onClick={(e) => {
                      e.preventDefault();
                      showExistingListForm();
                    }}
                  >
                    Tengo una lista creada
                  </Link>
                </div>
              </>
            )}
            {/*------------------------------Fin MEnu----------------------*/}
            {/*------------------------------inicio Formulario----------------------*/}
            {visibleForm === "crear" && (
              <form className="space-y-4 mt-8 w-full max-w-sm" onSubmit={createList}>
                <h3 className="text-4xl lg:text-3xl text-[#6d58a5] text-opacity-80 text-center">
                  Crear lista
                </h3>
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre de la lista
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contraseña"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={showMenu}
                    className="bg-[#6d58a5] text-white px-4 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300"
                  >
                    Volver al inicio
                  </button>
                  <button
                    type="submit"
                    className=" bg-[#6d58a5] text-white px-4 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300"
                  >
                    Crear lista
                  </button>
                </div>
              </form>
            )}
            {/*------------------------------Fin Formulario----------------------*/}
            {/*------------------------------inicio Formulario Unirse a Lista----------------------*/}
            {visibleForm === "unirse" && (
              <form className="space-y-4 mt-8 w-full max-w-sm" onSubmit={joinList}>
                <h3 className="text-4xl lg:text-3xl text-[#6d58a5] text-opacity-80 text-center">
                  Unirme a la lista
                </h3>
                <div>
                  <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
                    Ingresa el código
                  </label>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={showMenu}
                    className="bg-[#6d58a5] text-white px-4 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300"
                  >
                    Volver al inicio
                  </button>
                  <button
                    type="submit"
                    className="bg-[#6d58a5] text-white px-4 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300 mr-8"
                  >
                    Unirme
                  </button>
                </div>
              </form>
            )}
            {/*------------------------------Fin Formulario Unirse a Lista----------------------*/}
            {/*------------------------------inicio Formulario Lista Existente----------------------*/}
            {visibleForm === "existente" && (
              <form className="space-y-4 mt-8 w-full max-w-sm" onSubmit={accessExistingList}>
                <h3 className="text-4xl lg:text-3xl text-[#6d58a5] text-opacity-80 text-center">
                  Ingresar a la lista creada
                </h3>
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre de la lista
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contraseña"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={showMenu}
                    className="bg-[#6d58a5] text-white px-4 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300"
                  >
                    Volver al inicio
                  </button>
                  <button
                    type="submit"
                    className="bg-[#6d58a5] text-white px-4 py-2 rounded-md hover:bg-white hover:text-purple-500 border border-purple-500 transition duration-300 mr-8"
                  >
                    Ingresar
                  </button>
                </div>
              </form>
            )}
            {/*------------------------------Fin Formulario Lista Existente----------------------*/}
          </div>
        </div>
      </div>
    </main>
  );
}