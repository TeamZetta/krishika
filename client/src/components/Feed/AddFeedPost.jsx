import { AppContext } from "@/context/ContextProvider";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { createForumThread } from "../../../packages/api-management/createThread";

export default function AddFeedPost({ onchange }) {
  const { user, token } = useContext(AppContext);
  const [postContent, setPostContent] = useState("");
  const isPostDisabled = postContent.trim() === "";

  const handlePostClick = async () => {
    await createForumThread(token, postContent);
    onchange();
    setPostContent("");
  };

  return (
    <div className="bg-white rounded-md border p-3 border-border-light mt-[2vh]  w-full">
      <h3 className="font-semibold  text-md px-2">Share your thoughts</h3>
      <div className="p-2 flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="font-bold text-lg">{user?.fullName}</span>
          <span className="text-xs text-opacity-80 font-semibold  text-theme-green">
            @{user?.userName}
          </span>
        </div>
        <textarea
          placeholder="Add your thoughts"
          rows={4}
          className="border rounded-md border-border-light p-2 focus:outline-theme-blue focus:shadow-sm resize-none"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <Button
          className="bg-theme-blue text-white z-0"
          disabled={isPostDisabled}
          onClick={handlePostClick}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
