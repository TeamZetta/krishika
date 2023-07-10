import React, { useContext, useEffect, useState } from "react";
import { dictionary } from "../../../content";
import AddForumPost from "../Forum/AddForumPost";
import { getForum } from "../../../packages/api-management/getForum";
import { AppContext } from "@/context/ContextProvider";
import moment from "moment/moment";
import AddForumComment from "./ForumInner/AddForumComment";
import { MessageCircle, MoreVertical, Reply } from "lucide-react";

export default function Forum({ params }) {
  const [forums, setForums] = useState([]);
  const [comment, showComment] = useState(false);
  const [id, setId] = useState("");
  const { token } = useContext(AppContext);
  const getPosts = async () => {
    const response = await getForum(token);
    // console.log(response.data);
    setForums(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {comment && (
        <AddForumComment
          id={id}
          onChange={() => {
            showComment(false);
          }}
        />
      )}
      <div className="p-4  pt-[12vh]">
        <h1 className="text-3xl font-bold">{dictionary[params]?.forum}</h1>
        <AddForumPost
          onchange={() => {
            getPosts();
            
          }}
        />
        <h4 className="py-2 font-bold">Forum Posts</h4>
        <div className="flex flex-col gap-2 py-4 mb-20">
          {forums.length !== 0 ? (
            forums.map((ele) => {
              return (
                <div
                  key={ele._id}
                  className="bg-white flex flex-col p-4 rounded-md shadow-sm"
                >
                  <div className="flex gap-1 justify-between items-center ">
                    <div className="flex items-center">
                      <span className="font-bold text-[20px]">
                        {ele.author.fullName}
                      </span>
                      |<span className="text-xs">{ele.author.role}</span>
                    </div>
                    <span className="text-xs">
                      {moment(ele.createdAt).format("MMMM DD, YYYY")}
                    </span>
                  </div>
                  <span className="font-semibold text-[12px] text-theme-green">
                    @{ele.author.userName}
                  </span>
                  <span></span>
                  <span></span>
                  <div className="py-2 text-[15px] border-b border-border-light">
                    {ele.thread}
                  </div>
                  <div className="flex justify-between items-center">
                    <div
                      className="pt-2 text-[14px] flex gap-1 items-center"
                      onClick={() => {
                        setId(ele._id);
                        showComment(true);
                      }}
                    >
                      <MessageCircle size={15} /> ({ele.comments.length})
                    </div>
                    <button>
                      <MoreVertical size={15} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
    </>
  );
}
