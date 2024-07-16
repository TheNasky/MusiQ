import Background from '@/components/Background'
import List from '@/components/List'
import MusicPlayer from '@/components/MusicPlayer'
import Search from '@/components/Search'
import React from 'react'

export default function ListPage() {
  return (
    <main className='h-full flex items-center justify-center bg-[#c4b5fd]'>
      <Background />

      <div className='absolute w-full h-4/5 flex items-center justify-center flex-row mt-20'>

        <div className='w-2/4 h-full flex items-center flex-col'>
          <MusicPlayer />
          <Search />
        </div>
        
        <div className='w-2/4 h-full flex items-center'>
          <List />
        </div>
        
      </div>
    </main>
  )
}


{/* <div className='absolute top-0 pt-[25vh] lg:pt-[15vh] h-full bg-[#121212] bg-opacity-[0.5] w-full'>
  <div className="w-full absolute top-60 bg-[#725EB3] bg-opacity-[0.15] h-[100vh]">
    <div className='w-full h-full flex items-center justify-center flex-col'>
    
      <MusicPlayer />
      
      <Search />
      
      <List />
      
    </div>
  </div>
</div> */}

{/* <div className="block absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#252134] bg-[#252134] bg-opacity-20" />
<div className="h-[100vh] bg-[#252134] bg-opacity-100 flex justify-center items-center"></div> */}