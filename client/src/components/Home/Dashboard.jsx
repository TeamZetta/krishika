import React, { memo, useContext } from "react";
import { dictionary } from "../../../content";
import Image from "next/image";
import RenderNearest from "./HomeInner/RenderNearest";
import useSWR from "swr";
import { getNearestMandi } from "../../../packages/api-management/getNearestMandi";
import { ClipLoader } from "react-spinners";
import { AppContext } from "@/context/ContextProvider";
import PieChart from "../Charts/PieChart";
import VaultChart from "../Charts/VaultChart";

const data = [
  {
    id: "Required",
    label: "sass",
    value: 99,
    color: "hsl(87, 70%, 50%)",
  },
  {
    id: "python",
    label: "python",
    value: 490,
    color: "hsl(173, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "erlang",
    value: 416,
    color: "hsl(320, 70%, 50%)",
  },
  {
    id: "elixir",
    label: "elixir",
    value: 56,
    color: "hsl(333, 70%, 50%)",
  },
  {
    id: "c",
    label: "c",
    value: 192,
    color: "hsl(91, 70%, 50%)",
  },
];

const vaultData = [
  {
    id: "Required",
    value: 99,
    color: "hsl(87, 70%, 50%)",
  },
  {
    id: "completed",
    value: 490,
    color: "hsl(173, 70%, 50%)",
  }
];


const Dashboard = memo(({ details }) => {
  const { user, district } = useContext(AppContext);

  return (
    <div className="flex flex-col">
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

      <div className="pr-2 mb-4">
        <h3 className="text-[1.5rem] pl-4 text-center">
          Group Stats
        </h3>
        <PieChart data={data} />
      </div>
      <div className="pr-2 mb-4">
        <h3 className="text-[1.5rem] pl-4 text-center">
          Vault Stats
        </h3>
        <VaultChart data={vaultData} centerText={`${vaultData[0].value}%`}/>
      </div>
    </div>
  );
});

export default Dashboard;
