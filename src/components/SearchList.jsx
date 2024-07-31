'use client';
import Image from 'next/image';
import { AddIcon } from './icons';
import { getHighQualityThumbnail } from '../utils/thumbnails';

export default function SearchList( { filteredSongs, code } ) {

  const addSong = async (song) => {
    console.log("Adding song with thumbnail:", song.thumbnail);
    try {
      const songData = {
        code,
        title: song.name,
        artist: song.artist,
        url: song.url,
        addedBy: 'user'
      };

      if (song.thumbnail) {
        songData.thumbnail = song.thumbnail;
      }

      const response = await fetch('http://localhost:3001/api/list/addSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await response.json();
    } catch (error) {
      console.error('Error adding song:', error);
    }
  }
    
  return (
    <div className='w-5/5 h-4/5 rounded-b-lg text-white'>
      {filteredSongs.length > 0 ? (
        <ul className="w-full h-full overflow-y-scroll custom-scrollbar">
          {filteredSongs.map((item) => (
            <li key={item.id} className="rounded-md p-2.5 flex flex-row justify-between">
              <div className="w-12 h-12 relative overflow-hidden rounded">
                <Image
                  src={item.thumbnail || "/thumbnail.jpg"}
                  alt="thumbnail"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>

              <p className="basis-3/4 content-center mx-2.5">{item.name}</p>

              <button className="rounded px-3 mx-1" onClick={() => addSong(item)}>
                <AddIcon />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-2 w-full text-center">No se encontraron canciones</p>
      )}
    </div>
  )
}