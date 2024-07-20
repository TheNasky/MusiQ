'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const CustomAudioPlayer = () => {

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playlist = [
    { src: 'https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3', title: 'Chords of Life' },
    { src: 'https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3', title: 'Late Night Drive' },
    { src: 'https://audioplayer.madza.dev/Madza-Persistence.mp3', title: 'Persistence' },
  ];

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (currentIndex < playlist.length - 1) {
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

  return (
    <div className='w-4/5 h-2/5 bg-[#c4b5fd] bg-opacity-[0.5] p-6 rounded flex flex-row space-x-6 justify-center'>
        <div className='w-1/5 bg-[#c4b5fd] rounded relative'>
            <h2>Playing Now</h2>
            <Image
            src={'/thumbnail.jpg'}
            alt="Image"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className='rounded'
            />
        </div>

        <div  className='w-2/3 rounded grid grid-rows-4 text-black'>
            <h3>{playlist[currentIndex].title}</h3>
            <p>Madza</p>

            <div className="w-full text-center my-2">
                <audio ref={audioRef} src={playlist[currentIndex].src} />

                <div
                    className="w-full h-2.5 bg-[#e0e0e0] rounded-md cursor-pointer relative"
                    ref={progressRef}
                    onClick={handleProgressClick}
                >
                    <div className="h-full bg-[#a41464] rounded-md" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                <div className='py-2.5 flex flex-row space-x-6 justify-center'>

                    <button onClick={playPrevious} disabled={currentIndex === 0}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                        </svg>
                    </button>

                    <button onClick={togglePlayPause}>
                        {!isPlaying ? 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                            </svg>
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        }
                    </button>

                    <button onClick={playNext} disabled={currentIndex === playlist.length - 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                        </svg>
                    </button>

                </div>
            </div>    
        </div>
    </div>
  );
};

export default CustomAudioPlayer;
