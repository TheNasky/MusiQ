'use client';
import { useEffect, useState } from 'react';
import SearchList from './SearchList';
import { SearchIcon } from './icons';

export default function Search( { code } ) {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    fetch("https://668898dc0ea28ca88b859502.mockapi.io/music")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.log('Error: ', error))
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredSongs('');
    } else {
      setFilteredSongs(
        songs.filter((songs) => 
          songs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          songs.artist.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }, [searchTerm, songs]);

  return (
    <section className='w-full h-3/5 flex items-center flex-col'>
      <div className="relative w-4/5">

        <input
          className="input w-full bg-[#f2f9ff] bg-opacity-[0.7] rounded-t-lg px-8 py-2 border-2 border-transparent focus:outline-none placeholder-gray-700"
          placeholder="Buscar una canción"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="absolute right-2 -translate-y-1/2 top-1/2 p-1 text-[#6d58a5]">
          <SearchIcon />
        </button>  
      </div>

      <SearchList filteredSongs={ filteredSongs } code={ code }/>
    </section>
  )
}


