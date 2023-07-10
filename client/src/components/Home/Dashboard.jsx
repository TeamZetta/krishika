import React, { memo, useContext, useEffect, useState } from "react";
import { dictionary } from "../../../content";
import Image from "next/image";
import RenderNearest from "./HomeInner/RenderNearest";
import useSWR from "swr";
import { getNearestMandi } from "../../../packages/api-management/getNearestMandi";
import { ClipLoader } from "react-spinners";
import { AppContext } from "@/context/ContextProvider";
import PieChart from "../Charts/PieChart";
import VaultChart from "../Charts/VaultChart";
import { getVaultData } from "../../../packages/api-management/getVaultData";

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Dashboard = memo(({ details }) => {
  const { user, token, district } = useContext(AppContext);
  const [userData, setUserData] = useState();
  const [vaultData, setVaultData] = useState(0);
  const target = 20; // 20 qui

  const getData = async () => {
    const res = await getVaultData(token);

    const data = res.data[0];
    // console.log(data);

    let users = [],
      count = 0;
    for (let i = 0; i < data.users.length; i++) {
      count += data.users[i].crop;
      users.push({
        id: data.users[i].fullName,
        label: data.users[i].fullName,
        value: data.users[i].crop,
        color: `hsl(${rand(80, 150)}, 70%, 50%)`,
      });
    }
    // console.log(users);
    setUserData(users);

    const vaultData = [
      {
        id: "Required",
        value: target - count,
        color: "hsl(87, 70%, 50%)",
      },
      {
        id: "Completed",
        value: count,
        color: "hsl(173, 70%, 50%)",
      },
    ];

    setVaultData(vaultData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col pb-[15vh]">
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

      <div className="overflow-hidden p-4">
        <h3 className="text-[1.5rem] pl-4 text-center">Group Stats</h3>
        {userData ? (
          <PieChart data={userData} />
        ) : (
          <div className="w-screen h-[30vh] flex items-center justify-center">
            <ClipLoader />
          </div>
        )}
      </div>
      <div className="overflow-hidden p-4">
        <h3 className="text-[1.5rem] pl-4 text-center">Vault Stats</h3>
        {vaultData ? (
          <VaultChart
            data={vaultData}
            centerText={`${Math.round((vaultData[1].value / target) * 100)}%`}
          />
        ) : (
          <div className="w-screen h-[10vh] flex items-center justify-center">
            <ClipLoader />
          </div>
        )}
      </div>
    </div>
  );
});

export default Dashboard;
