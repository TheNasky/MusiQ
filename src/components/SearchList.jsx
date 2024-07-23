'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SearchList() {
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
        <div className='w-3/4 h-4/5 rounded'>

            <ul className="w-full h-full overflow-y-scroll custom-scrollbar">

                {items.map((item) => (

                <li key={item.id} className="bg-[#f2f9ff] bg-opacity-[0.7] rounded my-2.5 p-2.5 flex flex-row">
                    <Image
                    src={item.thumbnail}
                    alt="thumbnail"
                    width={50}
                    height={10}
                    />

                    <p className="basis-3/4 content-center mx-2.5">{item.name}</p>

                    <button className="text-[#a41464] rounded px-3 mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </li>
                ))}
            
            </ul>

        </div>
    )
}
