import { NextResponse } from "next/server";
import YoutubeMusicApi from "youtube-music-api";

const api = new YoutubeMusicApi();
let isInitialized = false;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!isInitialized) {
    try {
      await api.initalize();
      isInitialized = true;
    } catch (error) {
      console.error("Error initializing YouTube Music API:", error);
      return NextResponse.json(
        { error: "Failed to initialize YouTube Music API" },
        { status: 500 }
      );
    }
  }

  try {
    const results = await api.search(query, "song");
    const formattedResults = results.content.map((song) => {
      return {
        id: song.videoId,
        name: song.name,
        artist: song.artist ? song.artist.name : "Unknown Artist",
        thumbnail: song.thumbnails[0].url,
        url: `https://www.youtube.com/watch?v=${song.videoId}`,
      };
    });
    return NextResponse.json(formattedResults, { status: 200 });
  } catch (error) {
    console.error("Error searching songs:", error);
    return NextResponse.json({ error: "Failed to search songs" }, { status: 500 });
  }
}