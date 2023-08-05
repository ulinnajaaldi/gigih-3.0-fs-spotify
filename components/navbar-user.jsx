"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { expiredToken } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";

const NavbarUser = () => {
  const { userData, setUserData } = useContext(AuthContext);

  const handleLogout = () => {
    setUserData(null);
    expiredToken();
    window.location.href = "/";
  };

  return (
    <div className="fixed right-3 top-3 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative flex gap-1 rounded-full border border-black bg-black px-2 focus-visible:ring-0"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  userData?.images.length > 0
                    ? userData?.images[0].url || userData?.images[1].url
                    : `https://ui-avatars.com/api/?name=${userData?.display_name}`
                }
                alt="@shadcn"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userData ? userData.display_name : "Profile"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userData ? userData.email : "Email"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarUser;
