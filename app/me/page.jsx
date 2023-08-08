"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getFeaturedPlaylists,
  getNewReleases,
  getUserTopItems,
} from "@/lib/api";
import SkeletonHome from "@/components/skeleton/skeleton-home";

const Home = () => {
  const [time, setTime] = useState(new Date().getHours());
  const [playlists, setPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topTrack, setTopTrack] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getHours());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { playlists } = await getFeaturedPlaylists();
      const { albums } = await getNewReleases();
      const topTracks = await getUserTopItems("tracks");
      const topArtists = await getUserTopItems("artists");

      setPlaylists(playlists.items);
      setNewReleases(albums.items);
      setTopTrack(topTracks.items.slice(0, 5));
      setTopArtists(topArtists.items.slice(0, 5));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-900 px-6 py-5">
      {loading ? (
        <SkeletonHome />
      ) : (
        <>
          <h1 className="text-2xl font-bold">
            {time < 12
              ? "Good Morning 🔆"
              : time < 18
              ? "Good Afternoon 🌤"
              : "Good Evening 🌒"}
          </h1>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                href={`/me/playlist/${playlist.id}`}
                className="flex h-20 items-center justify-start gap-5 rounded-[4px] bg-neutral-700/30 transition-all hover:bg-neutral-700"
              >
                <Image
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  height={100}
                  width={100}
                  className="h-full w-20 rounded-bl-[4px] rounded-tl-[4px] object-cover drop-shadow-xl"
                />
                <h1 className="text-lg font-semibold">{playlist.name}</h1>
              </Link>
            ))}
          </div>
          {newReleases.length > 0 && (
            <>
              <div className="mt-10">
                <h1 className="text-2xl font-bold text-neutral-100">
                  New Release 🔥
                </h1>
                <div className="mt-4 flex flex-wrap gap-5">
                  {newReleases?.map((item) => (
                    <div
                      key={item.id}
                      className="flex w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-800 p-4 transition-all hover:bg-neutral-700"
                    >
                      <Image
                        src={item.images[0].url}
                        alt={item?.name ? item?.name : "New Release"}
                        width={120}
                        height={120}
                        className="h-44 w-full rounded-[6px] object-cover"
                      />
                      <p className="mt-2 line-clamp-1 font-bold text-white">
                        {item.name}
                      </p>
                      <div className="flex flex-wrap text-sm">
                        {item.artists.length > 1 ? (
                          item.artists.map((artist, index) => {
                            let isLastIndex = index === item.artists.length - 1;
                            return (
                              <div key={index} className="inline-flex">
                                <a
                                  href={artist.external_urls.spotify}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="line-clamp-1 text-[#b3b3b3] hover:text-white hover:underline"
                                >
                                  {artist.name}
                                </a>
                                <p>{isLastIndex ? "" : ",  "}</p>
                              </div>
                            );
                          })
                        ) : (
                          <a
                            href={item.artists[0].external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="line-clamp-1 text-[#b3b3b3] hover:text-white  hover:underline"
                          >
                            {item.artists[0].name}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-bold text-neutral-100">
                  Your Top Track
                </h1>
                <div className="mt-4 flex flex-wrap gap-5">
                  {topTrack?.map((item) => (
                    <div
                      key={item.id}
                      className="flex w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-800 p-4 transition-all hover:bg-neutral-700"
                    >
                      <Image
                        src={item.album.images[0].url}
                        alt={item?.name ? item?.name : "Top Track"}
                        width={120}
                        height={120}
                        className="h-44 w-full rounded-[6px] object-cover"
                      />
                      <p className="mt-2 line-clamp-1 font-bold text-white">
                        {item.name}
                      </p>
                      {item.artists.length > 1 ? (
                        item.artists.map((artist, index) => {
                          let isLastIndex = index === item.artists.length - 1;
                          return (
                            <div key={index} className="inline-flex">
                              <a
                                href={artist.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="line-clamp-1 text-[#b3b3b3] hover:text-white hover:underline"
                              >
                                {artist.name}
                              </a>
                              <p>{isLastIndex ? "" : ",  "}</p>
                            </div>
                          );
                        })
                      ) : (
                        <a
                          href={item.artists[0].external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="line-clamp-1 text-[#b3b3b3] hover:text-white  hover:underline"
                        >
                          {item.artists[0].name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-bold text-neutral-100">
                  Your Top Artists
                </h1>
                <div className="mt-4 flex flex-wrap gap-5">
                  {topArtists?.map((artist) => (
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
                      <a
                        href={artist.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 line-clamp-1 font-bold text-white hover:underline"
                      >
                        {artist.name}
                      </a>
                      <p className="text-sm font-semibold capitalize text-[#b3b3b3]">
                        {artist.type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
