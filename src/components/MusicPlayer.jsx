'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const CustomAudioPlayer = ( { playlist } ) => {

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1);

  const songlist = playlist.songs;

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (currentIndex < songlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);
      setCurrentTime(currentTime);
      setDuration(duration);
    };

    const handleEnded = () => {
        playNext();
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', updateProgress);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('timeupdate', updateProgress);
      audioElement.removeEventListener('loadedmetadata', updateProgress);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Error attempting to play audio:", error);
            setIsPlaying(false); // Stop the playing state if auto-play fails
          });
        }
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleProgressClick = (e) => {
    const progressElement = progressRef.current;
    const rect = progressElement.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!playlist.songs || playlist.songs.length === 0) {
    return <div className="text-white">No hay canciones cargadas.</div>;
  }

  return (
    <div className='w-4/5 h-2/5 bg-[#6d58a5] bg-opacity-[0.7] p-4 rounded-md flex flex-row space-x-6 justify-center text-white'>
      
      <div className='w-1/5 bg-[#c4b5fd] rounded relative'>
          <Image
          src={'/thumbnail.jpg'}
          alt="Image"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className='rounded'
          />
      </div>

      <div  className='w-2/3 rounded grid grid-rows-5'>
        <h3>{songlist[currentIndex].title}</h3>
        <p>{songlist[currentIndex].artist}</p>

        <div className="w-full text-center my-2">

          <audio ref={audioRef} src={songlist[currentIndex].url} />

          <div
            className="w-full h-2.5 bg-[#e0e0e0] rounded-md cursor-pointer relative"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div className="h-full bg-[#f83a47] rounded-md" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="flex justify-between">
            <span className='text-sm'>{formatTime(currentTime)}</span>

            <div className='py-2.5 flex flex-row space-x-6 justify-center'>

              <button onClick={playPrevious} disabled={currentIndex === 0}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-7">
                <path d="m16 7-7 5 7 5zm-7 5V7H7v10h2z"></path>
                </svg>
              </button>

              <button onClick={togglePlayPause}>
                  {!isPlaying ? 
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                    </svg>                          
                    : 
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                  }
              </button>

              <button onClick={playNext} disabled={currentIndex === songlist.length - 1}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-7">
                <path d="M7 7v10l7-5zm9 10V7h-2v10z"></path>                
                </svg>
              </button>

            </div>

            <span className='text-sm'>{formatTime(duration)}</span>
          </div>
{/* 
          <div className='bg-black'>
            <label>Volume:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="bg-[#f83a47]"
            />
          </div> */}

        </div>
        
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
