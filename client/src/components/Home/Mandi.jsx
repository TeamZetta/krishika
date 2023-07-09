import React, { useEffect, useState, useContext } from "react";
import api from "../../../packages/api-management/common";
import { dictionary } from "../../../content";
import { Button } from "../ui/button";
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

export default function Mandi({ params }) {
  const { district } = useContext(AppContext);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(district);
  const [selectedMandi, setSelectedMandi] = useState([]);

  useEffect(() => {
    getDistricts();
  }, []);

  const fetchData = async () => {
    const data = await getNearestMandi(selectedDistrict || "");
    setSelectedMandi(data)
  };

  const getDistricts = async () => {
    try {
      const response = await api.get("/allDistricts");
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex justify-center   p-2 pt-[10vh]">
      <div className="flex flex-col p-4 gap-6">
        <div>
          <h3 className="text-3xl font-bold">{dictionary[params]?.mandi}</h3>
          <span className="text-[18px]">
            {dictionary[params]?.searchDistrict}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-white p-4 border-border-light border w-[92vw] flex justify-between">
              {selectedDistrict}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[92vw] max-h-[30vh] overflow-scroll">
            <DropdownMenuLabel>
              {" "}
              {dictionary[params]?.searchDistrict}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {districts.map((ele, idx) => {
                return (
                  <DropdownMenuItem
                    className="bg-light-background m-1 rounded-md p-2"
                    onClick={() => {
                      setSelectedDistrict(ele);
                    }}
                    key={idx}
                  >
                    {ele}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-white p-4 border-border-light border w-[92vw] flex justify-between">
              {selectedMandi}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[92vw] max-h-[30vh] overflow-scroll">
            <DropdownMenuLabel>
              {" "}
              {dictionary[params]?.searchDistrict}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {districts.map((ele, idx) => {
                return (
                  <DropdownMenuItem
                    className="bg-light-background m-1 rounded-md p-2"
                    onClick={() => {
                      setSelectedDistrict(ele);
                    }}
                    key={idx}
                  >
                    {ele}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
