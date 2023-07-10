import React from "react";
import AddFeedPost from "../Feed/AddFeedPost";
import { getFeed } from "../../../packages/api-management/getFeed";

export default function Feed() {


  const getPosts = async () => {
    const response = await getFeed(token);
    setForums(response.data);
  };
  return (
    <div className="p-4  pt-[10vh]">
      <h3 className="text-3xl font-bold">Feed</h3>
      <AddFeedPost />
    </div>
  );
}
