import { ChevronLeft, MoveLeft } from "lucide-react";
import React, { useContext } from "react";
import { ChatContext } from "@/context/ChatProvider";
import ChatBody from "./ChatBody";

export default function GroupChat({ onChange }) {
  const { selectedChat, setSelectedChat } = useContext(ChatContext)
  // console.log(selectedChat);

  return (
    <>

      <div className="fixed flex flex-col items-start justify-start inset-0 p-2 py-3 bg-light-background z-20">
        <div className="w-full">
          <div className="bg-theme-green py-4 text-white border flex align-center gap-4  rounded-md  m-2 my-0 p-2">
            <button
              onClick={() => {
                onChange()
                setSelectedChat()
              }}
            >
              <ChevronLeft />
            </button>
            <span className="mt-1">{selectedChat.chatName}</span>
          </div>
        </div>

        <div className="p-[2vh]"><ChatBody /></div>
      </div>
    </>
  );
}
