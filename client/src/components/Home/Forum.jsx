import React from "react";
import { dictionary } from "../../../content";
import AddForumPost from "../Forum/AddForumPost";

export default function Forum({ params }) {
  return (
    <div className="p-4  pt-[12vh]">
      <h1 className="text-3xl font-bold">{dictionary[params]?.forum}</h1>
      <AddForumPost />
    </div>
  );
}
