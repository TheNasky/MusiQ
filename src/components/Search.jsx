'use client';
import { useEffect, useState } from 'react';
import SearchList from './SearchList';
import { SearchIcon } from './icons';
import axios from 'axios';

export default function Search({ code }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchSongs = async () => {
      if (searchTerm.length > 2) {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/search?query=${encodeURIComponent(searchTerm)}`);
          setFilteredSongs(response.data);
        } catch (error) {
          console.error('Error searching songs:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFilteredSongs([]);
      }
    };

    const debounceTimer = setTimeout(searchSongs, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

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
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <SearchList filteredSongs={filteredSongs} code={code} />
      )}
    </section>
  )
}