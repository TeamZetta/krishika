import React, { memo, useContext, useEffect, useState } from "react";
import { dictionary } from "../../../content";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { AppContext } from "@/context/ContextProvider";
import PieChart from "../Charts/PieChart";
import VaultChart from "../Charts/VaultChart";
import { getVaultData } from "../../../packages/api-management/getVaultData";
import { ChevronDown, ChevronUp } from "lucide-react";
import { changeQty } from "../../../packages/api-management/changeQty";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Dashboard = memo(({ details }) => {
  const { user, token, district } = useContext(AppContext);
  const [userData, setUserData] = useState();
  const [vaultData, setVaultData] = useState(0);

  const [qty, setQty] = useState(userData ? userData[0]?.value : 0);
  const target = 10; // 20 qui

  const changeCounter = async () => {
    await changeQty(token, qty);
    getData();
    toast.success("Updated quantity", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
    console.log(userData);
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
        <h3 className="text-xl font-semibold text-left">
          {dictionary[details]?.groupStats}
        </h3>
        <span className="text-sm ">{dictionary[details]?.gsText}</span>
        <div className="py-2">
          {userData ? (
            <div className="flex flex-col">
              <div className="font-bold">{dictionary[details]?.prod}</div>

              <div className="flex justify-between py-2 items-center">
                <button
                  className="bg-theme-green w-[30%] p-2 flex items-center justify-center text-white rounded-md"
                  onClick={() => {
                    if (qty !== 0) {
                      setQty((qty) => qty - 1);
                    } else {
                      console.log("0000");
                    }
                  }}
                >
                  <ChevronDown />
                </button>
                <span className="bg-white w-[30%] rounded-md p-2 flex items-center justify-center">
                  {qty}
                </span>
                <button
                  className="bg-theme-green w-[30%] flex justify-center items-center p-2 text-white rounded-md"
                  onClick={() => {
                    if (qty !== target) {
                      setQty((qty) => qty + 1);
                    } else {
                      console.log("111");
                    }
                  }}
                >
                  <ChevronUp />
                </button>
              </div>
              <Button
                className="bg-theme-blue text-white shadow-md"
                onClick={() => {
                  changeCounter();
                }}
              >
                {dictionary[details]?.update}
              </Button>
            </div>
          ) : (
            <ClipLoader />
          )}
        </div>
        {userData ? (
          <PieChart data={userData} />
        ) : (
          <div className="w-screen h-[30vh] flex items-center justify-center">
            <ClipLoader />
          </div>
        )}
      </div>
      <div className="overflow-hidden p-4">
        <h3 className=" text-lg font-bold text-left">
          {dictionary[details]?.vst}
        </h3>
        <span>{dictionary[details]?.vstd}</span>
        <br></br>
        <span>Vault<br/> {dictionary[details]?.tgt} : {target}</span>
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
