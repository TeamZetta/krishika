import { ChevronLeft, MoveLeft } from "lucide-react";
import React from "react";
import ChatBox from "./ChatBox";

export default function GroupChart({ onChange }) {
  return (
    <>
      <div className="fixed flex-col  flex items-start  justify-start inset-0 p-2 py-4 bg-light-background z-20">
        <div className="w-full ">
          <div className="bg-theme-green py-4 text-white border flex items-center gap-4  rounded-md  m-2 my-0 p-2">
            <button
              onClick={() => {
                onChange();
              }}
            >
              <ChevronLeft />
            </button>
            <span>Group Name</span>
          </div>
        </div>
        <div className="p-[2vh]">sdnhfjasd</div>
      </div>

      <ChatBox />
    </>
  );
}
