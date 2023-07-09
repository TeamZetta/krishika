"use client";
import React, { useContext } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { LogOut, Menu, User } from "lucide-react";
import { dictionary } from "../../../content";
import { AppContext } from "@/context/ContextProvider";

export default function Navbar({ params }) {
  const { setUser, setToken, setDistrict } = useContext(AppContext);
  return (
    <nav className="flex justify-between bg-white p-4 fixed top-0 left-0 right-0">
      <Image
        src="/Assets/krishikaText.png"
        height={40}
        width={120}
        alt="Krishika Logo"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="">
            <Menu />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-screen transition-transform rounded-sm bg-white shadow-sm p-4">
          <DropdownMenuLabel className="border-b border-opacity-5 px-2 text-end">
            {dictionary[params]?.actions}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex flex-col gap-2 pt-4">
            <DropdownMenuItem
              onClick={() => {}}
              className="flex items-center justify-end p-2 px-4 gap-2 border rounded-md border-opacity-10 border-theme-blue"
            >
              <User className="mr-2 h-4 w-4" />
              <span>{dictionary[params]?.profile}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDistrict(null);
                setUser(null);
                setToken(null);
              }}
              className="flex items-center justify-end p-2 px-4 gap-2 border rounded-md border-opacity-10 border-theme-blue"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{dictionary[params]?.logout}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
