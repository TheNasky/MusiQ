'use client';
import Background from '@/components/Background';
import Navbar from "@/components/Navbar.jsx";
import List from '@/components/List';
import MusicPlayer from '@/components/MusicPlayer';
import Search from '@/components/Search';
import InfoList from '@/components/InfoList';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ListPage() {

  const [playlist, setPlaylist] = useState(null);
  const pathname = usePathname();
  const codeList = extractFirstPart(pathname);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/list/find', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: codeList }),
        });
        const data = await response.json();
        if (response.ok) {
          setPlaylist(data);
        } else {
          console.error('Failed to fetch playlist:', data.message);
        }
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    if (codeList) {
      fetchPlaylist();
    }
  }, [codeList]);
  
  return (  
    <main>
      <Navbar />
      <Background src={ `/bgMylist.jpg` }/>
      <div className="absolute top-0 pt-[25vh] lg:pt-[15vh] h-full w-full">
        <div className="w-full h-4/5 flex items-center justify-center flex-row">
          {playlist ? (
            <>
              <div className="w-2/4 h-full flex items-center flex-col z-10">
              
                <InfoList />
                <MusicPlayer playlist={ playlist } />

                <h2 className='text-white my-2.5  w-3/4'>Agregar a la lista</h2>
                <Search code = { codeList }/>

              </div>

              <div className="w-2/4 h-full flex items-center z-10">
                
                <List playlist={ playlist } />
                
              </div>
            </>
          ) : (
            <div className="text-white">Cargando...</div>
          )}
        </div>
      </div>

      {/* <div className="block absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#252134] bg-[#252134] bg-opacity-20 -z-1" />
      <div className="bg-[#252134] bg-opacity-100 flex justify-center items-center"></div> */}
    </main>
  )
}

function extractFirstPart(url) {
  const parts = url.split('/').filter(part => part);
  return parts.length > 0 ? parts[0] : '';
}