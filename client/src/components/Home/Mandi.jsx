import React, { useEffect, useState, useContext } from "react";
import api from "../../../packages/api-management/common";
import { Noto_Sans_Bengali } from "next/font/google";
import { dictionary } from "../../../content";
import { getNearestMandi } from "../../../packages/api-management/getNearestMandi";
const ntb = Noto_Sans_Bengali({ subsets: ["latin"] });
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { AppContext } from "@/context/ContextProvider";
import Map from "@/components/Map/MapContainer";

export default function Mandi({ params }) {
  const { district } = useContext(AppContext);
  const [districts, setDistricts] = useState([]);
  const [valueDistricts, setValueDistricts] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState(district);
  const [selectedMandi, setSelectedMandi] = useState([]);
  const [selectedMandiFinal, setSelectedMandiFinal] = useState({
    name: "Select one",
  });

  useEffect(() => {
    getDistricts();
    fetchData(district);
  }, []);

  const fetchData = async (district) => {
    const data = await getNearestMandi(district, params);
    setSelectedMandi(data.data.bazars);
  };

  const getDistricts = async () => {
    try {
      if (params === "bn") {
        const response = await api.get("/en/bn/allDistricts");
        setValueDistricts(response.data);
        const DISTRICTS = Object.keys(response.data);
        setDistricts(DISTRICTS);
      } else {
        const response = await api.get("/bn/en/allDistricts");
        setValueDistricts(response.data);
        const DISTRICTS = Object.keys(response.data);
        setDistricts(DISTRICTS);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center p-2 pt-[10vh]">
      <div className="flex flex-col p-4 gap-6">
        <div>
          <h3 className="text-3xl font-bold">{dictionary[params]?.mandi}</h3>
          <span className="text-[18px]">
            {dictionary[params]?.searchDistrict}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="bg-white p-3 rounded-md border-border-light border w-[92vw] flex justify-between">
              {selectedDistrict}
              <ChevronDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[92vw] max-h-[40vh] overflow-scroll">
            <DropdownMenuLabel>
              {dictionary[params]?.searchDistrict}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {districts.map((ele, idx) => (
                <DropdownMenuItem
                  className={` ${ntb.className} bg-light-background m-1 my-2 rounded-md p-3`}
                  key={idx}
                  onClick={() => {
                    setSelectedDistrict(ele);
                    // console.log(valueDistricts[ele])
                    fetchData(valueDistricts[ele]);
                  }}
                >
                  {ele}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="bg-white p-3 items-center rounded-md border-border-light border w-[92vw] flex justify-between">
              {selectedMandiFinal.name}
              <ChevronDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[92vw] max-h-[50vh] overflow-scroll">
            <DropdownMenuLabel>{dictionary[params]?.mandi}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {selectedMandi.map((ele, idx) => (
                <DropdownMenuItem
                  className={
                    "bg-light-background font-sans mx-1 my-2 rounded-md"
                  }
                  onClick={() => {
                    setSelectedMandiFinal(ele);
                  }}
                  key={ele._id}
                >
                  <div className={`${ntb.className}`}>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{ele.name}</span>
                        <span className="font-semibold">{ele.address}</span>
                      </div>

                      <div className=" py-2 px-1 rounded-md ">
                        <span> {ele.functioning_status[0]}</span>
                        <span> {ele.functioning_status[1]}</span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="justify-center p-2 mt-4">
        <div>
          <Map
            address={`${
              selectedMandiFinal.name === "Select one"
                ? selectedDistrict
                : selectedMandiFinal.name
            }, ${selectedDistrict}`}
          />
        </div>
      </div>
    </div>
  );
}
