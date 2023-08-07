"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  getPlaylist,
  getUserProfile,
  checkUserSavedTracks,
  saveTrack,
  removeTrack,
} from "@/lib/api";
import style from "./style.module.css";
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

const Playlist = ({ params }) => {
  const { id } = params;

  const [data, setData] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [profile, setProfile] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getPlaylist(id);
      const profileRes = await getUserProfile();
      const ids = response.tracks.items.map((track) => track.track.id);
      const checkSavedTracks = await checkUserSavedTracks(ids);
      response.tracks.items.forEach((track, index) => {
        track.track.saved = checkSavedTracks[index];
      });
      setData(response);
      setTracks(response.tracks.items);
      setProfile(profileRes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrack = async (id) => {
    try {
      await saveTrack(id);
      const newTracks = tracks.map((track) => {
        if (track.track.id === id) {
          track.track.saved = true;
        }
        return track;
      });
      setTracks(newTracks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTrack = async (id) => {
    try {
      await removeTrack(id);
      const newTracks = tracks.map((track) => {
        if (track.track.id === id) {
          track.track.saved = false;
        }
        return track;
      });
      setTracks(newTracks);
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
              src={data?.images ? data?.images[0].url : "/images/playlist.webp"}
              alt={data?.name ? data?.name : "Playlist"}
              width={200}
              height={200}
              className="h-56 w-56"
            />
            <div>
              <p className="capitalize">{data?.type}</p>
              <h1 className="sticky mb-1 mt-2 line-clamp-2 text-5xl font-bold">
                {data?.name}
              </h1>
              {data?.description && (
                <p
                  className={style.description}
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                />
              )}
              <div className="mt-2 flex items-center justify-start gap-1">
                {profile?.display_name === data?.owner.display_name ? (
                  <img
                    src={profile?.images && profile?.images[0].url}
                    alt={profile?.display_name ? profile?.display_name : "User"}
                    height={24}
                    width={24}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <p className="text-sm font-semibold">By</p>
                )}
                <p className="text-sm font-semibold">
                  {data?.owner.display_name}
                </p>
                <p className="text-sm font-semibold">•</p>
                <p className="text-sm">{data?.tracks.total} songs</p>
              </div>
            </div>
          </div>

          <Table className="mt-10 px-4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead className="w-[360px]">Title</TableHead>
                <TableHead className="w-[300px]">Album</TableHead>
                <TableHead>Date added</TableHead>
                <TableHead></TableHead>
                <TableHead className="flex items-center justify-end">
                  <Clock4 className="h-5 w-5" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tracks.map((track, index) => (
                <TableRow key={track.track.id} className="group ">
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
                      <p className="line-clamp-1">{track.track.name}</p>
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
                          href={track.track.artists[0].external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="line-clamp-1 text-[#b3b3b3] hover:text-white  hover:underline"
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
                      className="line-clamp-1 text-[#b3b3b3] hover:text-white hover:underline"
                    >
                      {track.track.album.name}
                    </a>
                  </TableCell>
                  <TableCell className="text-[#b3b3b3]">
                    {dateToLocalString(track.added_at)}
                  </TableCell>
                  <TableCell className="text-end ">
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              track.track.saved === true
                                ? handleRemoveTrack(track.track.id)
                                : handleSaveTrack(track.track.id);
                            }}
                            className={`${
                              track.track.saved === true
                                ? "text-spotify-green hover:text-green-400"
                                : "text-[#b3b3b3] opacity-0 hover:text-white group-hover:opacity-100"
                            } hover:drop-shadow-md`}
                          >
                            <Heart className="h-5 w-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="mb-2">
                          <p>
                            {track.track.saved === true
                              ? "Remove from Your Library"
                              : "Add to Your Library"}
                          </p>
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

export default Playlist;
