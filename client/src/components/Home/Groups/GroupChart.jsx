import { ChevronLeft, MoveLeft } from "lucide-react";
import React, { useContext } from "react";
import { ChatContext } from "@/context/ChatProvider";
import ChatBody from "./ChatBody";

export default function GroupChart({ onChange }) {
  const { chats, setSelectedChat } = useContext(ChatContext)
  console.log(chats);

  return (
    <>
      <div className="fixed flex flex-col items-start justify-start inset-0 p-2 py-4 bg-light-background z-20">
        <div className="w-full ">
          <div className="bg-theme-green py-4 text-white border flex items-center gap-4  rounded-md  m-2 my-0 p-2">
            <button
              onClick={() => {
                onChange();
                setSelectedChat()
              }}
            >
              <ChevronLeft />
            </button>
            <span>{chats[0].chatName}</span>
          </div>
        </div>
        <div className="p-[2vh]"><ChatBody /></div>
      </div>
    </>
  );
}
