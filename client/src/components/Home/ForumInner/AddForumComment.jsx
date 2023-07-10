import { X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { getForumThread } from "../../../../packages/api-management/getForumThread";
import { AppContext } from "@/context/ContextProvider";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { forumComment } from "../../../../packages/api-management/formComment";

export default function AddForumComment({ id, onChange, onProfile }) {
  const { token } = useContext(AppContext);
  const [data, setData] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const getPostDetails = async () => {
    try {
      const response = await getForumThread(token, id);
      setData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const isCommentDisabled = commentText === "";

  return (
    <div className="fixed inset-0 bg-black-light flex items-center justify-center  z-20">
      <div className="bg-white p-4 rounded-md w-[90vw] max-h-[70vh] ">
        <div className="flex justify-between items-center">
          <h2 className="py-2">Post Details</h2>
          <button onClick={onChange}>
            <X />
          </button>
        </div>
        {isLoading ? (
          <p>
            <ClipLoader />
          </p>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-xl">{data.author.fullName}</h2>
                <div className="flex gap-2 items-center">
                  <span className="text-[15px] font-semibold">
                    @{data.author.userName}
                  </span>
                  | <span className="text-xs">{data.author.role}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-theme-blue">
                {moment(data.createdAt).format("MMMM DD, YYYY")}
              </span>
            </div>
            <div className="py-3 text-sm border-b border-border-light">
              {data.thread}
            </div>
            {data.comments.length > 0 ? (
              <div className="py-2">
                <span className=" text-sm">
                  comments ({data.comments.length})
                </span>
                <div className="flex flex-col gap-2 py-2 max-h-[25vh] overflow-scroll">
                  {data.comments.map((ele, idx) => {
                    return (
                      <div
                        className="flex flex-col p-2 rounded-md border border-border-light"
                        key={idx}
                      >
                        <div
                          className="flex items-center"
                          onClick={() => {
                            onProfile(ele.user._id);
                          }}
                        >
                          <h3 className="text-sm font-bold">
                            {ele.user.fullName}
                          </h3>
                          |<span className="text-xs">@{ele.user.userName}</span>
                        </div>
                        <span className="text-xs">
                          {" "}
                          {moment(ele.createdAt).format("MMMM DD, YYYY")}
                        </span>
                        <p>{ele.content}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <span className="py-2 text-sm text-black-light font-semibold">
                no comments yet, be the first to start the conversation!
              </span>
            )}
            <textarea
              rows="2"
              placeholder="enter your comment"
              className="p-2 bg-light-background my-1 rounded-md resize-none focus:outline-none focus:shadow-md"
              value={commentText}
              onChange={handleCommentChange}
            />
            <Button
              disabled={isCommentDisabled}
              className="bg-theme-blue text-white"
              onClick={async () => {
                await forumComment(token, commentText, id);
                getPostDetails();
                setCommentText("");
              }}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
