'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from 'axios';
import { getHighQualityThumbnail } from '../utils/thumbnails';

export default function List({ playlist }) {
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setItems(playlist?.songs || []);
    setHistory(playlist?.history || []);
  }, [playlist]);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const playSong = async (songId) => {
    const adminPassword = prompt("Enter admin password to play this song:");
    
    if (!adminPassword) return;

    try {
      const response = await axios.post('http://localhost:3001/api/list/playSpecific', {
        code: playlist.code,
        songId,
        adminPassword,
        fromHistory: showHistory
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error playing specific song:", error);
      alert("Error playing song: " + error.message);
    }
  };

  const deleteSong = async (songId) => {
    const adminPassword = prompt("Enter admin password to delete the song:");
    
    if (!adminPassword) return;

    try {
      const response = await fetch('http://localhost:3001/api/list/deleteSong', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: playlist.code, songId, adminPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setItems(items.filter(item => item._id !== songId));
      alert("Song deleted successfully");
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('Error deleting song: ' + error.message);
    }
  };

  const displayItems = showHistory ? history : items;

  return (
    <div className='w-4/5 h-full rounded text-white '>

      <div className="flex justify-between items-center mb-2">
        <h2>{showHistory ? "Historial" : "Proximas Canciones"}</h2>
        <button 
          onClick={toggleHistory}
          className="bg-[#6d58a5] p-2 rounded-full hover:bg-[#5a4a8a] transition-colors"
          title={showHistory ? "Ver lista" : "Ver historial"}
        >
          {showHistory ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          )}
        </button>
      </div>

      {displayItems && displayItems.length > 0 ? 
        <ul className="h-full w-full overflow-y-scroll custom-scrollbar">
          {displayItems.map((item) => (

            <li key={item._id} className="bg-[#6d58a5] bg-opacity-[0.7] rounded my-2.5 p-2.5 flex flex-row items-center">           

              <div className="w-12 h-12 relative overflow-hidden rounded">
                <Image
                  src={item.thumbnail || "/thumbnail.jpg"}
                  alt={`${item.title} thumbnail`}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>

              <p className="basis-3/4 content-center mx-2.5">{item.title} - {item.artist}</p>

              <button className="rounded px-3 mx-1" onClick={() => playSong(item._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-[#f83a47] transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </button>

              {!showHistory && (
                <button className="rounded px-3 mx-1" onClick={() => deleteSong(item._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-[#f83a47] transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      :
        <p className="p-2 w-full text-center">No hay canciones</p>
      }
      
    </div>
  )
}