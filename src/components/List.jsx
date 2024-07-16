'use client';
import { useEffect, useState } from "react";
import Image from "next/image"
import { DeleteButton, PlayButton } from "./Buttons";

export default function List() {

  const [items, setItems] = useState([]);

  const songListReq = async() => {
    const res = await fetch("https://668898dc0ea28ca88b859502.mockapi.io/music");
    const songList = await res.json();
    setItems(songList);
  }

  useEffect(() => {
    songListReq();
  }, [])

  return (
    <div className='w-4/5 h-full rounded'>
      <h2 className="text-white my-2.5">Lista de reproducción</h2>

      <ul className="h-full w-full overflow-y-scroll custom-scrollbar">

        {items.map((item) => (

          <li key={item.id} className="bg-[#c4b5fd] bg-opacity-[0.5] rounded my-2.5 p-2.5 flex flex-row">
            <Image
              src={item.thumbnail}
              alt="thumbnail"
              width={50}
              height={10}
            />

            <p className="basis-3/4 content-center mx-2.5">{item.name}</p>

            <PlayButton />
            <DeleteButton />

          </li>
        ))}        
      </ul>
    </div>
  )
}