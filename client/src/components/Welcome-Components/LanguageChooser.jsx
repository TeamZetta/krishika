import React, { useState } from "react";
import Image from "next/image";
import { dictionary } from "../../../content";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function LanguageChooser({ lang = "bn" }) {
  const [lan, setLan] = useState(lang);
  const [language, setLanguage] = useState(dictionary[lan]?.choose);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Image src="/Assets/log.svg" height={60} width={60} alt="Krishika Logo" />
      <span className="text-xl">{dictionary[lan]?.welcome}</span>
      <Image
        src="/Assets/krishikaText.png"
        height={50}
        width={150}
        alt="Krishika Logo"
      />
      <span>{dictionary[lan]?.language}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 w-[60vw] rounded-sm pl-6  flex items-center bg-white justify-between border border-black">
            <span>{language}</span>
            <ChevronDown />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[60vw] rounded-sm bg-white">
          <DropdownMenuLabel className="border-b">Choose</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={language}
            onValueChange={(value) => {
              setLanguage(value);
              if (value === "English") {
                localStorage.setItem("lang", "en");
                setLan("en");
              } else if (value === "বাংলা") {
                localStorage.setItem("lang", "bn");
                setLan("bn");
              }
            }}
          >
            <DropdownMenuRadioItem value="English">
              English
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="বাংলা">বাংলা</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link
        href={`/${lan}/`}
        className="p-2 rounded-sm text-center w-[60vw] bg-theme-blue text-white"
      >
        Login
      </Link>
    </div>
  );
}
