'use client';
import Image from 'next/image';
import { AddIcon } from './icons';

export default function SearchList( { filteredSongs, code } ) {

  const addSong = async (song) => {
    try {
      const response = await fetch('http://localhost:3000/api/list/addSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          title: song.name,
          artist: song.artist,
          url: song.url,
          addedBy: 'user'
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Song added successfully');
      } else {
        console.error('Failed to add song:', data.message);
        alert('Failed to add song: ' + data.message);
      }
    } catch (error) {
      console.error('Error adding song:', error);
      alert('Error adding song: ' + error.message);
    }
  }
    
  return (
    <div className='w-4/5 h-4/5 rounded-b-lg bg-[#6d58a5] bg-opacity-[0.7] text-white'>
      {filteredSongs.length > 0 ? (
        
          <ul className="w-full h-full overflow-y-scroll custom-scrollbar">

            {filteredSongs.map((item) => (
              <li key={item.id} className="rounded-md p-2.5 flex flex-row">
                <Image
                src={item.thumbnail}
                alt="thumbnail"
                width={50}
                height={10}
                />

                <p className="basis-3/4 content-center mx-2.5">{item.name}</p>

                <button className="rounded px-3 mx-1" onClick={() => addSong(item)}>
                  <AddIcon />
                </button>
              </li>
            ))}

          </ul>

        ) : (
          <p className="p-2 w-full text-center">No se encontraron canciones</p>
        )
      }
        
    </div>
  )
}
