import React, { useEffect, useState } from "react";
import { getProfile } from "../../../packages/api-management/getProfile";

export default function Profile({ token, onchange, userId }) {
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
    <div className="fixed p-4 inset-0 bg-white z-10 pt-20 flex flex-col gap-3">
      <h3 className="text-2xl font-bold"> Profile</h3>
      <div>
        <span className="text-sm">Name</span>
        <h3 className="font-bold text-lg text-theme-blue">{data.fullName}</h3>
      </div>
      <div>
        <span className="text-sm">username</span>
        <h3 className="font-bold text-lg text-theme-blue">{data.userName}</h3>
      </div>
      <div>
        <span className="text-sm">Selected Language</span>
        <h3 className="font-bold text-lg text-theme-blue">{data.lang}</h3>
      </div>
      <div>
        <span className="text-sm">Given landsize</span>
        <h3 className="font-bold text-lg text-theme-blue">{data.landSize}</h3>
      </div>
      <div>
        <span className="text-sm">Address</span>
        <h3 className="font-bold text-lg text-theme-blue">{data.address}</h3>
      </div>
      <div>
        <span className="text-sm">District</span>
        <h3 className="font-bold text-lg text-theme-blue">{data.district}</h3>
      </div>
    </div>
  );
}
