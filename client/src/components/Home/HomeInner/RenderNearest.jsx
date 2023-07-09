
import { CheckIcon, MapIcon, MapPin, ShoppingCartIcon } from "lucide-react";
import React from "react";
import { dictionary } from "../../../../content";


export default function RenderNearest({ data }) {
  return (
    <div className="flex gap-4 flex-col py-4 ">
      <span className="flex justify-between">
        Krishak Mandis
        <MapIcon />
      </span>

      {data.map((ele, idx) => {
        return (
          <div
            key={idx}
            className="bg-white p-4 rounded-md shadow-sm flex flex-col gap-2"
          >
            <span className="text-xl font-bold">{ele.name}</span>
            <div className="flex items-start justify-start gap-2">
              <MapPin size={15} /> {ele.address}
            </div>
            <div className="flex items-start justify-start gap-2">
              <ShoppingCartIcon size={15} />
              {ele.functioning_status[0]}
            </div>
            <div className="flex items-start justify-start gap-2">
              <CheckIcon size={15} />
              {ele.functioning_status[1]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
