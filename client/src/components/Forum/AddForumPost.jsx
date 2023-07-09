import { AppContext } from "@/context/ContextProvider";
import React, { useContext } from "react";
import { Button } from "../ui/button";

export default function AddForumPost() {
  const { user } = useContext(AppContext);
  return (
    <div className="bg-white rounded-md border p-3 border-border-light mt-[2vh]  w-full">
      <h3 className="font-semibold  text-md">Add your qeuery</h3>
      <div className="p-2 flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="font-bold text-lg">{user?.fullName}</span>
          <span className=" text-xs text-opacity-80 font-semibold  text-theme-green">
            @{user?.userName}
          </span>
        </div>
        <textarea
          placeholder="Add your thoughts"
          rows={4}
          className="border rounded-md border-border-light p-2 focus:outline-theme-blue focus:shadow-sm resize-none"
        ></textarea>
        <Button className="bg-theme-blue text-white">Post</Button>
      </div>
    </div>
  );
}
