import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import YouTube from "react-youtube";

const CustomAudioPlayer = ({ playlist, onSongChange }) => {
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(playlist.currentSong);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setCurrentSong(playlist.currentSong);
  }, [playlist]);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const playNext = async () => {
    if (playlist.songs.length > 0) {
      const adminPassword = prompt("Enter admin password to play next song:");

      if (!adminPassword) return;

      try {
        const response = await axios.post("https://musiq-backend.vercel.app/api/list/playNext", {
          code: playlist.code,
          adminPassword,
        });
        if (response.data.success) {
          onSongChange(response.data.payload.list);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error updating current song:", error);
      }
    }
  };

  const playPrevious = async () => {
    if (playlist.history.length > 0) {
      const adminPassword = prompt("Enter admin password to play previous song:");

      if (!adminPassword) return;

      try {
        const response = await axios.post("https://musiq-backend.vercel.app/api/list/playPrevious", {
          code: playlist.code,
          adminPassword,
        });
        if (response.data.success) {
          onSongChange(response.data.payload.list);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error playing previous song:", error);
      }
    }
  };

  const handleSongEnd = () => {
    playNext();
  };

  const handleStateChange = (event) => {
    // Update isPlaying based on YouTube player state
    setIsPlaying(event.data === YouTube.PlayerState.PLAYING);

    if (event.data === YouTube.PlayerState.PLAYING) {
      const updateProgress = () => {
        if (playerRef.current) {
          const current = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          setCurrentTime(current);
          setDuration(duration);
          setProgress((current / duration) * 100);
          requestAnimationFrame(updateProgress);
        }
      };
      updateProgress();
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const percentage = (clickPosition / progressBarWidth) * 100;
    const newTime = (percentage / 100) * duration;
    playerRef.current.seekTo(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const getHighQualityThumbnail = (url) => {
    const videoId = url.split("v=")[1];
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  };

  if (!currentSong) {
    return <div>No songs in the playlist</div>;
  }

  return (
    <div className="w-4/5 h-2/5 bg-[#6d58a5] bg-opacity-[0.7] p-4 rounded-md flex flex-row space-x-6 justify-center text-white mb-4 mt-1.5">
      <div className="w-2/5 bg-[#c4b5fd] rounded relative overflow-hidden">
        <div className="w-full h-0 pb-[80%] relative">
          <Image
            src={currentSong ? getHighQualityThumbnail(currentSong.url) : "/thumbnail.jpg"}
            alt={`${currentSong?.title} thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="rounded object-cover"
            style={{
              objectPosition: 'center 28%',
              transform: 'scale(1.4)',
            }}
          />
        </div>
      </div>

      <div className="w-2/3 rounded grid grid-rows-5">
      <div className="flex flex-col">
        <h3 className="lg:text-[1.2rem] xlg:text-[2.2rem]"><div className="line-clamp-2">{currentSong.title}</div></h3>
        <p className="text-[1rem] my-1 text-gray-300">{currentSong.artist}</p>
        <div className="w-full text-center my-2">
          <YouTube
            videoId={currentSong.url.split("v=")[1]}
            opts={{
              height: "0",
              width: "0",
              playerVars: {
                autoplay: 1,
              },
            }}
            onEnd={handleSongEnd}
            onStateChange={handleStateChange}
            onReady={(event) => {
              playerRef.current = event.target;
            }}
          />

          <div
            className="w-full h-2.5 bg-[#e0e0e0] rounded-md cursor-pointer relative overflow-hidden"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-[#f83a47]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm p-1">{formatTime(currentTime)}</span>
            <span className="text-sm p-1">{formatTime(duration)}</span>
          </div>

          <div className="-mt-3 flex flex-row space-x-6 justify-center">
          <button onClick={playPrevious} className="p-1 rounded-full hover:text-[#f83a47] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="m16 7-7 5 7 5zm-7 5V7H7v10h2z"></path>
              </svg>
            </button>

            <button onClick={togglePlayPause}>
              {!isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-10 hover:text-[#f83a47]">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10 hover:text-[#f83a47]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
            </button>

            <button onClick={playNext} className="p-1 rounded-full hover:text-[#f83a47] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M7 7v10l7-5zm9 10V7h-2v10z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

        
      </div>
    </div>
  );
};

export default CustomAudioPlayer;