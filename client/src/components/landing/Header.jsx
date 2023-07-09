import React from "react";
import { dictionary } from "../../../content";
import Image from "next/image";

export default function Header({ params }) {
  return (
    <>
      <div className="flex justify-between items-center px-4">
        <div>
          <span className="text-xl">{dictionary[params]?.welcome}</span>
          <Image
            src="/Assets/krishikaText.png"
            height={40}
            width={140}
            alt="Krishika Logo"
          />
        </div>
        <Image
          src="/Assets/log.svg"
          height={60}
          width={60}
          alt="Krishika Logo"
        />
      </div>

      <Image
        src="/Assets/cultivating.svg"
        height={40}
        width={500}
        alt="Krishika Logo"
        className="w-screen h-auto pt-5"
      />
    </>
  );
}
