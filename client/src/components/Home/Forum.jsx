import React, { useContext, useEffect, useState } from "react";
import { dictionary } from "../../../content";
import AddForumPost from "../Forum/AddForumPost";
import { getForum } from "../../../packages/api-management/getForum";
import { AppContext } from "@/context/ContextProvider";

export default function Forum({ params }) {
  const [forums, setForums] = useState([]);
  const { token } = useContext(AppContext);
  const getPosts = async () => {
    const response = await getForum(token);
    console.log(response.data);
    setForums(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="p-4  pt-[12vh]">
      <h1 className="text-3xl font-bold">{dictionary[params]?.forum}</h1>
      <AddForumPost />

      <h4 className="py-2 font-bold">Forum Posts</h4>
      <div className="flex flex-col gap-2 py-4">
        {forums.length !== 0 ? (
          forums.map((ele) => {
            return (
              <div
                key={ele._id}
                className="bg-white flex flex-col p-4 rounded-md shadow-sm"
              >
                <div className="flex flex-col ">
                  <span className="font-bold">{ele.author.fullName}</span>
                  <span className="text-xs">{ele.author.role}</span>
                </div>
                <div className="py-2 border-b border-border-light">
                  {ele.thread}
                </div>

                <div className="pt-2">replies ({ele.comments.length})</div>
              </div>
            );
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
}
