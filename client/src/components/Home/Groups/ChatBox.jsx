import { ChevronRight } from "lucide-react";
import React from "react";

export default function ChatBox() {
  return (
    <div className=" p-4 fixed z-20 bottom-0 left-0 right-0 flex gap-4 ">
      <input
        type="text"
        className="w-[80vw] rounded-md shadow-md p-2 focus:outline-none "
        placeholder="Enter your message"
      />
      <button className="bg-theme-blue shadow-md  text-white rounded-full p-3">
        <ChevronRight />
      </button>
    </div>
  );
}
