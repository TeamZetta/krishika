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

  const fetchData = async () => {
    const data = await getNearestMandi(district || "");
    return data.data;
  };

  const { data } = useSWR("nearestMandi", fetchData, {
    revalidateOnFocus: false,
  });

  if (!data) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ClipLoader />
      </div>
    );
  }

  return (
    <div className="pt-[7vh]">
      <Image
        src="/Assets/dash1.jpg"
        height={300}
        width={500}
        alt="Dashboard"
        className="w-screen h-[30vh] object-cover"
      />
      <div className="p-4 ">
        <h1 className="text-3xl font-bold py-6">
          {dictionary[details]?.dashboard}
        </h1>

        <h3 className="text-lg">{dictionary[details]?.welcome}</h3>
        <span className="text-2xl text-theme-blue font-bold">
          {user?.fullName}
        </span>

        <RenderNearest data={data.bazars} />
      </div>
    </div>
  );
});

export default Dashboard;
