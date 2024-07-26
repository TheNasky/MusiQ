import Background from '@/components/Background';
import List from '@/components/List';
import MusicPlayer from '@/components/MusicPlayer';
import Search from '@/components/Search';
import React from 'react';
import { Playlist } from '@/data/ApiData';
import InfoList from '@/components/InfoList';

export default function ListPage() {

  const playlist = Playlist();

  return (  
    <main>
      <Background src={ `/bgMylist.jpg` }/>
      <div className="absolute top-0 pt-[25vh] lg:pt-[15vh] h-full w-full">
        <div className="w-full h-4/5 flex items-center justify-center flex-row">
          <div className="w-2/4 h-full flex items-center flex-col z-10">
          
            <InfoList />
            <MusicPlayer playlist={ playlist } />

            <h2 className='text-white my-2.5  w-3/4'>Agregar a la lista</h2>
            <Search />
          </div>

          <div className="w-2/4 h-full flex items-center z-10">
            <List playlist={ playlist } />
          </div>
        </div>
      </div>

      {/* <div className="block absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#252134] bg-[#252134] bg-opacity-20 -z-1" />
      <div className="bg-[#252134] bg-opacity-100 flex justify-center items-center"></div> */}
    </main>
  )
}
