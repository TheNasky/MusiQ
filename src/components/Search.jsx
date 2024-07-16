import React from 'react'
import { SearchButton } from './Buttons'

export default function Search() {
  return (
    <div class="relative w-4/5">
  
      <input
        class="input w-full bg-[#c4b5fd] bg-opacity-[0.5] rounded-full px-8 py-3 border-2 border-transparent focus:outline-none placeholder-gray-400"
        placeholder="Buscar una canción"
        type="text"
      />

      <SearchButton />
    </div>

  )
}


