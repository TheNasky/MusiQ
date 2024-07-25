import React from 'react'
import SearchList from './SearchList'

export default function Search() {
  return (
    <section className='w-full h-3/5 flex items-center flex-col'>
      <div class="relative w-4/5">

        <input
          class="input w-full bg-[#f2f9ff] bg-opacity-[0.7] rounded-t-lg px-8 py-2 border-2 border-transparent focus:outline-none placeholder-gray-700"
          placeholder="Buscar una canción"
          type="text"
        />

        <button className="absolute right-2 -translate-y-1/2 top-1/2 p-1 text-[#6d58a5]">
          <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search" className="w-5 h-5">
            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>  
      </div>

      <SearchList />
    </section>
    

  )
}


