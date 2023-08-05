"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getUserPlaylists } from "@/lib/api";
import { Home, Library, Search } from "lucide-react";
import { Separator } from "./ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Sidebar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const { items } = await getUserPlaylists();
      console.log(items);
      setPlaylists(items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sticky flex h-screen  max-w-[320px] flex-col items-start justify-start gap-2 bg-black p-2 text-[#B2B2B2]">
      <div className="w-full rounded-[8px] bg-neutral-900 px-3 py-2">
        <div className="px-3 py-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/me"
                  className="group flex h-10 w-full items-center justify-start gap-5 rounded-md  font-bold transition-all hover:text-white"
                >
                  <Home className="h-6 w-6" />
                  {isSmallScreen && "Home"}
                </Link>
              </TooltipTrigger>
              {!isSmallScreen && (
                <TooltipContent side="right">
                  <p>Home</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="px-3 py-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/me"
                  className="group flex h-10 w-full items-center justify-start gap-5 rounded-md  font-bold transition-all hover:text-white"
                >
                  <Search className="h-6 w-6" />
                  {isSmallScreen && "Search"}
                </Link>
              </TooltipTrigger>
              {!isSmallScreen && (
                <TooltipContent side="right">
                  <p>Search</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        className={`flex h-full w-full flex-col gap-4 rounded-[8px] bg-neutral-900 ${
          isSmallScreen ? "px-3" : "px-1"
        }  py-2`}
      >
        <div className={`py-1 ${isSmallScreen ? "px-3" : "px-4"}`}>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsSmallScreen(!isSmallScreen)}
                  className={`group flex h-10 w-full items-center ${
                    isSmallScreen ? "justify-start" : "justify-center"
                  } gap-5 font-bold transition-all hover:text-white`}
                >
                  <Library className="h-7 w-7" />

                  {isSmallScreen && "Your Library"}
                </button>
              </TooltipTrigger>
              <TooltipContent side={isSmallScreen ? "top" : "right"}>
                <p>
                  {isSmallScreen
                    ? "Minimize your collection"
                    : "Expand your collection"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {isSmallScreen && <Separator />}
        <div className="flex flex-col">
          {playlists.map((playlist) => (
            <HoverCard openDelay={20} closeDelay={0}>
              <HoverCardTrigger asChild>
                <Link
                  href={`/playlist/${playlist.id}`}
                  key={playlist.id}
                  className="flex w-full items-center justify-start gap-4 rounded-[6px] bg-neutral-900 p-2 font-semibold transition-all hover:bg-neutral-800/60"
                >
                  <Image
                    src={playlist.images[0].url}
                    width={44}
                    height={44}
                    alt="Playlist Image"
                    className="rounded-[4px]"
                  />
                  {isSmallScreen && (
                    <div className="flex flex-col gap-[6px] text-[#B2B2B2]">
                      <p className="text-sm text-white">{playlist.name}</p>
                      <div className="flex gap-1">
                        <p className="text-xs ">
                          {playlist.type === "playlist" ? "Playlist" : "Album"}
                        </p>
                        <p className="text-xs">•</p>
                        <p className="text-xs">{playlist.owner.display_name}</p>
                      </div>
                    </div>
                  )}
                </Link>
              </HoverCardTrigger>
              {!isSmallScreen && (
                <HoverCardContent
                  className="ml-1 rounded-[6px] border-none bg-neutral-800 drop-shadow-md"
                  side="right"
                >
                  <div className="flex justify-between space-x-4">
                    <div className="flex flex-col gap-[6px] text-[#B2B2B2]">
                      <p className="text-sm text-white">{playlist.name}</p>
                      <div className="flex gap-1">
                        <p className="text-xs ">
                          {playlist.type === "playlist" ? "Playlist" : "Album"}
                        </p>
                        <p className="text-xs">•</p>
                        <p className="text-xs">{playlist.owner.display_name}</p>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              )}
            </HoverCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
