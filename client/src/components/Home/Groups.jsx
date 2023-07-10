import React, { useContext, useEffect, useState } from "react";
import { dictionary } from "../../../content";
import { getAllChats } from "../../../packages/api-management/getAllChats";
import { AppContext } from "@/context/ContextProvider";
import moment from "moment";
import GroupChart from "./Groups/GroupChart";
import GroupAdd from "./Groups/GroupAdd";

export default function Groups({ params }) {
  const [chats, setChats] = useState([]);
  const { token } = useContext(AppContext);
  const [isChatopen, setIsChatOpen] = useState(false);
  const getAllChat = async () => {
    const res = await getAllChats(token);
    setChats(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getAllChat();
  }, []);
  return (
    <>
      {isChatopen && (
        <GroupChart
          onChange={() => {
            setIsChatOpen(false);
          }}
        />
      )}
      <div className="p-4  pt-[10vh]">
        <h3 className="text-3xl font-bold pt-4">
          {dictionary[params]?.chatGroups}
        </h3>
        {chats.length > 0 ? (
          <div className="py-4">
            {chats.map((ele) => {
              return (
                <div
                  key={ele._id}
                  className="bg-white p-3 rounded-md flex flex-col shadow-sm"
                  onClick={() => {
                    setIsChatOpen(true);
                  }}
                >
                  <span className="text-lg font-bold text-theme-blue">
                    {ele.chatName}
                  </span>
                  <span className="text-sm ">
                    <span> {ele.groupAdmin.fullName} </span>|
                    <span className="text-theme-green font-semibold">
                      {ele.groupAdmin.district}
                    </span>
                  </span>
                  <span className="font-bold text-xs py-2 pb-3 border-b border-border-light">
                    <span>{moment(ele.createdAt).format("MMMM DD, YYYY")}</span>
                    |
                    <span>
                      {moment(ele.latestMessage.updatedAt).format("HH : MM a")}
                    </span>
                  </span>
                  <span className="flex text-sm pt-2 font-bold justify-between items-center">
                    <span>{ele.latestMessage.content}</span>
                    <span className="text-xs">
                      {moment(ele.latestMessage.updatedAt).format("HH : MM a")}
                    </span>
                  </span>
                </div>
              );
            }, [])}
          </div>
        ) : (
          <div>No chats</div>
        )}
      </div>
      <GroupAdd />
    </>
  );
}
