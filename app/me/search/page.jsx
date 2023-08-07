"use client";

import React, { useState } from "react";
import Image from "next/image";
import { fetchWithToken, durationToMinutesSeconds } from "@/lib/utils";
import { checkUserSavedTracks, removeTrack, saveTrack } from "@/lib/api";
import { Heart, Search, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const searchTrack = async (query) => {
  const response = await fetchWithToken(
    `https://api.spotify.com/v1/search?q=${query}&type=album,artist,playlist,track&limit=5`,
  );

  const result = await response.json();
  return result;
};

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(null);

  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await searchTrack(input);
      setAlbums(response.albums.items);
      setArtists(response.artists.items);
      setPlaylists(response.playlists.items);
      const ids = response.tracks?.items.map((track) => track.id).join(",");
      const checkSavedTracks = await checkUserSavedTracks(ids);
      response.tracks.items.forEach((track, index) => {
        track.saved = checkSavedTracks[index];
      });
      setTracks(response.tracks.items.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveTrack = async (id) => {
    try {
      await saveTrack(id);
      setTracks((prev) =>
        prev.map((track) => {
          if (track.id === id) {
            track.saved = true;
          }
          return track;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTrack = async (id) => {
    try {
      await removeTrack(id);
      setTracks((prev) =>
        prev.map((track) => {
          if (track.id === id) {
            track.saved = false;
          }
          return track;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-0 w-full bg-neutral-800 px-6 py-5 drop-shadow-lg">
        <div className="relative w-5/12">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (timer) {
                clearTimeout(timer);
              }
              setTimer(setTimeout(fetchData, 500));
            }}
            placeholder="What do you want to listen to?"
            className="focus:ring-primary-500 w-full rounded-full bg-neutral-700 px-10 py-3 text-sm text-neutral-100 ring-neutral-100 focus:border-transparent focus:outline-none focus:ring-2"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
          {input && (
            <button
              onClick={() => {
                setInput("");
                setAlbums([]);
                setArtists([]);
                setPlaylists([]);
                setTracks([]);
              }}
              className="absolute right-1 top-1 p-2 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-900 px-6 py-5">
        {input === "" && (
          <div className="mt-5">
            <h1 className="text-2xl font-bold text-neutral-100">Browse all</h1>
            <h3 className="mt-4 text-3xl font-bold text-white">
              Search for songs, artists, albums, podcasts, playlists, and more.
            </h3>
          </div>
        )}
        <div className="mt-5">
          {artists?.[0] && (
            <div className="flex gap-5">
              <div>
                <h1 className="text-2xl font-bold text-neutral-100">
                  Top result
                </h1>
                <div className="mt-4 flex w-[372px] flex-col gap-4 rounded-[6px] bg-neutral-800 p-5 transition-all hover:bg-neutral-700">
                  <Image
                    src={artists[0].images[0].url}
                    alt={artists[0]?.name ? artists[0]?.name : "Artist"}
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-full border border-neutral-900  shadow-sm"
                  />
                  <p className="text-3xl font-bold text-white">
                    {artists[0].name}
                  </p>
                  <p className="text-sm font-bold capitalize">
                    <span className="rounded-full bg-neutral-900 px-4 py-2">
                      {artists[0].type}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full pr-5">
                <h1 className="text-2xl font-bold text-neutral-100">Songs</h1>
                <div className="mt-4 flex flex-col">
                  {tracks?.map((track) => (
                    <div
                      key={track.id}
                      className="group flex items-center justify-between gap-4 rounded-[6px] px-2 py-1 transition-all hover:bg-neutral-700"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={track.album.images[0].url}
                          alt={track?.name ? track?.name : "Track"}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-md"
                        />
                        <div className="flex flex-col">
                          <p className="font-semibold text-neutral-100">
                            {track.name}
                          </p>
                          <p className="text-neutral-400">
                            {track.artists[0].name}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-7">
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  track.saved === true
                                    ? handleRemoveTrack(track.id)
                                    : handleSaveTrack(track.id);
                                }}
                                className={`${
                                  track.saved === true
                                    ? "text-spotify-green hover:text-green-400"
                                    : "text-[#b3b3b3] opacity-0 hover:text-white group-hover:opacity-100"
                                } hover:drop-shadow-md`}
                              >
                                <Heart className="h-5 w-5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="mb-2">
                              <p>
                                {track.saved === true
                                  ? "Remove from Your Library"
                                  : "Add to Your Library"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <p className="text-neutral-400">
                          {durationToMinutesSeconds(track.duration_ms)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {artists?.[0] && (
          <div className="mt-10">
            <h1 className="text-2xl font-bold text-neutral-100">Artists</h1>
            <div className="mt-4 flex flex-wrap gap-5">
              {artists?.map((artist) => (
                <div
                  key={artist.id}
                  className="flex w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-800 p-4 transition-all hover:bg-neutral-700"
                >
                  <Image
                    src={artist.images[0].url}
                    alt={artist?.name ? artist?.name : "Artist"}
                    width={120}
                    height={120}
                    className="h-44 w-full rounded-full border border-neutral-900 object-cover shadow-2xl"
                  />
                  <p className="mt-2 line-clamp-1 font-bold text-white">
                    {artist.name}
                  </p>
                  <p className="text-sm font-semibold capitalize text-[#b3b3b3]">
                    {artist.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {albums?.[0] && (
          <div className="mt-10">
            <h1 className="text-2xl font-bold text-neutral-100">Albums</h1>
            <div className="mt-4 flex flex-wrap gap-5">
              {albums?.map((album) => (
                <div
                  key={album.id}
                  className="flex w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-800 p-4 transition-all hover:bg-neutral-700"
                >
                  <Image
                    src={album.images[0].url}
                    alt={album?.name ? album?.name : "Album"}
                    width={120}
                    height={120}
                    className="h-44 w-full rounded-[6px] object-cover"
                  />
                  <p className="mt-2 line-clamp-1 font-bold text-white">
                    {album.name}
                  </p>
                  <p className="text-sm font-semibold capitalize text-[#b3b3b3]">
                    <span>{album.release_date.slice(0, 4)} • </span>
                    {album.artists.map((artist, index) => (
                      <a
                        key={index}
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#b3b3b3] hover:text-white hover:underline"
                      >
                        {artist.name}
                      </a>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {playlists?.[0] && (
          <div className="mt-10">
            <h1 className="text-2xl font-bold text-neutral-100">Playlists</h1>
            <div className="mt-4 flex flex-wrap gap-5">
              {playlists?.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-800 p-4 transition-all hover:bg-neutral-700"
                >
                  <Image
                    src={playlist.images[0].url}
                    alt={playlist?.name ? playlist?.name : "playlist"}
                    width={120}
                    height={120}
                    className="h-44 w-full rounded-[6px] object-cover"
                  />
                  <p className="mt-2 line-clamp-1 font-bold text-white">
                    {playlist.name}
                  </p>
                  <p className="text-sm font-semibold capitalize text-[#b3b3b3]">
                    By {playlist.owner.display_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
