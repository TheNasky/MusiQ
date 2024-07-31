"use client";
import { useParams } from "next/navigation";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar.jsx";
import List from "@/components/List";
import MusicPlayer from "@/components/MusicPlayer";
import Search from "@/components/Search";
import InfoList from "@/components/InfoList";
import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

let socket;

export default function ListPage() {
  const params = useParams();
  const code = params.listid;
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinRoom", code);
    });

    socket.on("playlistUpdated", (updatedPlaylist) => {
      console.log("Playlist updated:", updatedPlaylist);
      setPlaylist(updatedPlaylist);
    });

    return () => {
      socket.off("connect");
      socket.off("playlistUpdated");
      socket.disconnect();
    };
  }, [code]);

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/list/${code}`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: { username: "Pedro" },
      });
      if (response.status === 200) {
        setPlaylist(response.data.payload.list);
      } else {
        console.error("Failed to fetch playlist:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  };

  useEffect(() => {
    if (code) {
      fetchPlaylist();
    }
  }, [code]);

  const handleSongChange = (updatedPlaylist) => {
    setPlaylist(updatedPlaylist);
    socket.emit("updatePlaylist", { code, playlist: updatedPlaylist });
  };

  return (
    <main className="">
      <Navbar />
      <Background src={`/bgMylist.jpg`} />
      <div className="absolute top-0 pt-[25vh] lg:pt-[15vh] h-full w-full overflow-hidden bg-[#140933] bg-opacity-[0.25] backdrop-blur-[2px]">
        <div className="w-full h-4/5 flex items-center justify-center flex-row">
          {playlist ? (
            <>
              <div className="w-2/4 h-full flex items-center flex-col z-10">
                <InfoList listCode={code} listName={playlist.name} />
                <MusicPlayer playlist={playlist} onSongChange={handleSongChange} />

                <h2 className="text-white my-2.5  w-3/4">Agregar a la lista</h2>
                <Search code={code} />
              </div>

              <div className="w-2/4 h-full flex items-center z-10">
                <List playlist={playlist} />
              </div>
            </>
          ) : (
            <div className="text-white">Cargando...</div>
          )}
        </div>
      </div>
    </main>
  );
}