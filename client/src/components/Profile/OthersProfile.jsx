import React, { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { AppContext } from "@/context/ContextProvider";
import { getProfile } from "../../../packages/api-management/getProfile";
import { Button } from "../ui/button";

export default function OthersProfile({ token, onchange, userId }) {
  const { user } = useContext(AppContext);
  const [data, setData] = useState({});
  const getP = async () => {
    const res = await getProfile(token, userId);
    setData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getP();
  }, []);
  return (
    <div className="fixed p-4 inset-0 bg-black-light  z-20 pt-20 flex  items-center justify-center ">
      <div className="bg-white flex-col flex gap-3 w-[95vw] p-4 rounded-md ">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold"> Profile</h3>
          <button
            onClick={() => {
              onchange();
            }}
          >
            <X />
          </button>
        </div>
        <div>
          <span className="text-sm">Name</span>
          <h3 className="font-bold text-lg text-theme-blue">{data.fullName}</h3>
        </div>
        <div>
          <span className="text-sm">username</span>
          <h3 className="font-bold text-lg text-theme-blue">{data.userName}</h3>
        </div>

        <div>
          <span className="text-sm">Address</span>
          <h3 className="font-bold text-lg text-theme-blue">{data.address}</h3>
        </div>
        <div>
          <span className="text-sm">District</span>
          <h3 className="font-bold text-lg text-theme-blue">{data.district}</h3>
        </div>
        {user._id !== userId && (
          <Button className="bg-theme-blue text-white shadow-md">
            Add to group
          </Button>
        )}
      </div>
    </div>
  );
}
