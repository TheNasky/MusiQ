import React from 'react'
import { ShareButton,  SearchButton } from './Buttons'

export default function Search() {
  return (
    <div className='w-4/5 h-auto bg-[#c4b5fd] bg-opacity-[0.5] rounded my-2.5 p-2.5 flex flex-row justify-center'>
      <input type="text" placeholder='Buscar una canción' className='w-3/6 rounded bg-[#333] text-[#fff] mx-2.5 px-2'/>

      <SearchButton />
      <ShareButton />

    </div>
  )
}
