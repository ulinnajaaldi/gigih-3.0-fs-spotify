"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  checkUserSavedTracks,
  getUserProfile,
  getUserTracks,
  removeTrack,
} from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock4, Heart } from "lucide-react";
import { dateToLocalString, durationToMinutesSeconds } from "@/lib/utils";
import SkeletonPlaylist from "@/components/skeleton/skeleton-playlist";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CollectionTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [profile, setProfile] = useState({});
  const [totalSongs, setTotalSongs] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getUserTracks();
      const profileRes = await getUserProfile();
      const ids = response.items.map((track) => track.track.id).join(",");
      const savedTracks = await checkUserSavedTracks(ids);
      response.items.forEach((track, index) => {
        track.track.saved = savedTracks[index];
      });
      setTracks(response.items);
      setTotalSongs(response.total);
      setProfile(profileRes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTrack = async (id) => {
    try {
      await removeTrack(id);
      const newTracks = tracks.filter((track) => track.track.id !== id);
      setTracks(newTracks);
      setTotalSongs(totalSongs - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <SkeletonPlaylist />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-900 px-6 py-5">
          <div className="flex items-end justify-start gap-5 drop-shadow-md">
            <Image
              src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
              alt="Collection Track"
              width={200}
              height={200}
              className="h-56 w-56"
            />
            <div>
              <p className="capitalize">Playlist</p>
              <h1 className="sticky mb-5 mt-2 line-clamp-2 text-6xl font-bold">
                Liked Songs
              </h1>
              <div className="mt-2 flex items-center justify-start gap-1">
                <img
                  src={profile?.images && profile?.images[0].url}
                  alt={profile?.display_name ? profile?.display_name : "User"}
                  height={24}
                  width={24}
                  className="h-6 w-6 rounded-full"
                />
                <p className="text-sm font-semibold">{profile.display_name}</p>
                <p className="text-sm font-semibold">•</p>
                <p className="text-sm">{totalSongs} songs</p>
              </div>
            </div>
          </div>

          <Table className="mt-10">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Date added</TableHead>
                <TableHead></TableHead>
                <TableHead className="flex items-center justify-end">
                  <Clock4 className="h-5 w-5" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tracks.map((track, index) => (
                <TableRow key={track.track.id}>
                  <TableCell className="text-[#b3b3b3]">{index + 1}</TableCell>
                  <TableCell className="flex gap-3">
                    <Image
                      src={track.track.album.images[0].url}
                      alt={track.track.name}
                      width={50}
                      height={50}
                      className="h-10 w-10"
                    />
                    <div>
                      <p>{track.track.name}</p>
                      {track.track.artists.length > 1 ? (
                        track.track.artists.map((artist, index) => {
                          let isLastIndex =
                            index === track.track.artists.length - 1;
                          return (
                            <div key={index} className="inline-flex">
                              <a
                                key={index}
                                href={artist.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#b3b3b3] hover:text-white hover:underline"
                              >
                                {artist.name}
                              </a>
                              <p>{isLastIndex ? "" : ",  "}</p>
                            </div>
                          );
                        })
                      ) : (
                        <a
                          href={track.track.artists[0].external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#b3b3b3] hover:text-white hover:underline"
                        >
                          {track.track.artists[0].name}
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={track.track.album.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b3b3b3] hover:text-white hover:underline"
                    >
                      {track.track.album.name}
                    </a>
                  </TableCell>
                  <TableCell className="text-[#b3b3b3]">
                    {dateToLocalString(track.added_at)}
                  </TableCell>
                  <TableCell className="text-end">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTrack(track.track.id);
                            }}
                            className="text-spotify-green hover:text-green-400 hover:drop-shadow-md"
                          >
                            <Heart className="h-5 w-5 " />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Remove from Your Library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-end text-[#b3b3b3]">
                    {durationToMinutesSeconds(track.track.duration_ms)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CollectionTracks;
