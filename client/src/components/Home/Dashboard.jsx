import React, { memo, useContext } from "react";
import { dictionary } from "../../../content";
import Image from "next/image";
import RenderNearest from "./HomeInner/RenderNearest";
import useSWR from "swr";
import { getNearestMandi } from "../../../packages/api-management/getNearestMandi";
import { ClipLoader } from "react-spinners";
import { AppContext } from "@/context/ContextProvider";

const Dashboard = memo(({ details }) => {
  const { user, district } = useContext(AppContext);

  return (
    <div className="pt-[7vh]">
      <Image
        src="/Assets/dash.jpg"
        height={300}
        width={500}
        alt="Dashboard"
        className="w-auto h-[50vh] object-cover"
      />
      <div className="p-4 ">
        <h1 className="text-3xl font-bold py-6">
          {dictionary[details]?.dashboard}
        </h1>

        <h3 className="text-lg">{dictionary[details]?.welcome}</h3>
        <span className="text-2xl text-theme-blue font-bold">
          {user?.fullName}
        </span>
      </div>
    </div>
  );
});

export default Dashboard;
