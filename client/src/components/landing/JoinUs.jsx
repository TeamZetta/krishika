import React from "react";
import { dictionary } from "../../../content";
import Image from "next/image";
import Link from "next/link";

export default function JoinUs({ params }) {
  return (
    <>
      <div className="w-full mt-8 px-8 py-8 bg-theme-green bg-opacity-5 flex flex-col gap-4">
        <span className="text-[20px]">
          {dictionary[params]?.joinUs1}
          <span className="font-bold text-theme-blue">
            {dictionary[params]?.joinUs2}
          </span>
          {dictionary[params]?.jonUs3}
        </span>
        <Link
          href={`/${params}/auth`}
          className="bg-theme-blue text-white text-center py-2 rounded-md"
        >
          {dictionary[params]?.joinUs}
        </Link>
      </div>
      <Image
        src="/Assets/peasent.svg"
        height={40}
        width={5000}
        alt="Farmer resting"
        className="w-full h-auto mt-20"
      />
    </>
  );
}
