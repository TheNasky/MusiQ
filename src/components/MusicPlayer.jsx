import React from 'react'
import Image from 'next/image'
import { HeartButton } from './Buttons'

export default function MusicPlayer() {
  return (
    <div className='w-4/5 h-2/5 bg-[#c4b5fd] bg-opacity-[0.5] p-6 rounded flex flex-row space-x-6 justify-center'>
        <div className='w-1/5 h-24 bg-[#c4b5fd] rounded relative'>
            <Image
                src={`/Bg1.png`}
                alt="Image"
                layout="fill"
                objectFit="cover"
                objectPosition="top center"
                className='rounded'
            />
        </div>
    
        <div className='w-2/3 rounded grid grid-rows-4 text-white'>
          
          <HeartButton />

          <p>Lana del Rey</p>
          <p>Summertime Sadness</p>

        </div>    
    </div>
  )
}
