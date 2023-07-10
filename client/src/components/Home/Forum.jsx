import React, { useContext, useEffect, useState } from "react";
import { dictionary } from "../../../content";
import AddForumPost from "../Forum/AddForumPost";
import { getForum } from "../../../packages/api-management/getForum";
import { AppContext } from "@/context/ContextProvider";
import moment from "moment/moment";
import AddForumComment from "./ForumInner/AddForumComment";
import { Forward, MessageCircle, MoreVertical, Trash } from "lucide-react";
import OthersProfile from "../Profile/OthersProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { deleteThread } from "../../../packages/api-management/deleteThread";
import { toast } from "react-toastify";

export default function Forum({ params }) {
  const [forums, setForums] = useState([]);
  const [comment, showComment] = useState(false);
  const [id, setId] = useState("");
  const { token } = useContext(AppContext);
  const [otherToken, setOthersToken] = useState("");
  const [othersPro, setShowOthersPro] = useState(false);
  const getPosts = async () => {
    const response = await getForum(token);
    setForums(response.data);
  };

  const deletePost = async (threadId) => {
    const res = await deleteThread(token, threadId);
    if (res.data.deletedCount === 0) {
      toast.error(`${dictionary[params]?.postDeleted}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    getPosts();
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {comment && (
        <AddForumComment
          onProfile={(val) => {
            setOthersToken(val);
            setShowOthersPro(true);
          }}
          id={id}
          onChange={() => {
            showComment(false);
          }}
        />
      )}
      <div className="p-4  pt-[12vh]">
        <h1 className="text-3xl font-bold">{dictionary[params]?.forum}</h1>
        <AddForumPost
          params={params}
          onchange={() => {
            getPosts();
          }}
        />
        <h4 className="py-2 font-bold">{dictionary[params]?.forumPosts}</h4>
        <div className="flex flex-col gap-2 py-4 mb-20">
          {forums.length !== 0 ? (
            forums.map((ele) => {
              return (
                <div
                  key={ele._id}
                  className="bg-white flex flex-col p-4 rounded-md shadow-sm"
                >
                  <div className="flex gap-1 justify-between items-center ">
                    <div
                      className="flex items-center"
                      onClick={() => {
                        setOthersToken(ele.author._id);
                        setShowOthersPro(true);
                      }}
                    >
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
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <button className="">
                          <MoreVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[40vw] mr-4  overflow-scroll">
                        <DropdownMenuGroup>
                          <DropdownMenuItem className=" flex gap-2 items-center">
                            <Forward size={15} /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red flex gap-2 items-center"
                            onClick={() => {
                              deletePost(ele._id);
                            }}
                          >
                            <Trash size={15} /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
      {othersPro && (
        <OthersProfile
          token={token}
          userId={otherToken}
          onchange={() => {
            setShowOthersPro(false);
          }}
        />
      )}
    </>
  );
}
