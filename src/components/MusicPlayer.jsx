import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const CustomAudioPlayer = ({ playlist, onSongChange }) => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(playlist.currentSong);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setCurrentSong(playlist.currentSong);
  }, [playlist]);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, isPlaying]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = async () => {
    if (playlist.songs.length > 0) {
      const adminPassword = prompt("Enter admin password to play next song:");
      
      if (!adminPassword) return;

      try {
        const response = await axios.post('http://localhost:3001/api/list/playNext', {
          code: playlist.code,
          songId: playlist.songs[0]._id,
          adminPassword
        });
        if (response.data.success) {
          onSongChange(response.data.payload.list);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error updating current song:", error);
        alert("Error playing next song: " + error.message);
      }
    }
  };

  const handleSongEnd = () => {
    playNext();
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setCurrentTime(current);
    setDuration(duration);
    setProgress((current / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const percentage = (clickPosition / progressBarWidth) * 100;
    const newTime = (percentage / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentSong) {
    return <div>No songs in the playlist</div>;
  }

  return (
    <div className="w-4/5 h-2/5 bg-[#6d58a5] bg-opacity-[0.7] p-4 rounded-md flex flex-row space-x-6 justify-center text-white">
      <div className="w-1/5 bg-[#c4b5fd] rounded relative">
        <Image
          src={"/thumbnail.jpg"}
          alt="Image"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="rounded"
        />
      </div>

      <div className="w-2/3 rounded grid grid-rows-5">
        <h3>{currentSong.title}</h3>
        <p>{currentSong.artist}</p>

        <div className="w-full text-center my-2">
          <audio
            ref={audioRef}
            onEnded={handleSongEnd}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          <div
            className="w-full h-2.5 bg-[#e0e0e0] rounded-md cursor-pointer relative"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-[#f83a47] rounded-md"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm">{formatTime(currentTime)}</span>
            <span className="text-sm">{formatTime(duration)}</span>
          </div>

          <div className="py-2.5 flex flex-row space-x-6 justify-center">
            <button onClick={togglePlayPause}>
              {!isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
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
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
            </button>

            <button onClick={playNext}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-7">
                <path d="M7 7v10l7-5zm9 10V7h-2v10z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;