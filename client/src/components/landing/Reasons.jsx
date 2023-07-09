import React from "react";
import { dictionary } from "../../../content";

export default function Reasons({ params }) {
  return (
    <div className="px-4 py-4">
      <h2 className="font-bold text-[24px]">
        {dictionary[params]?.whyKrishika}
      </h2>

      <div className="flex gap-8 pt-8 px-4">
        <span className=" border-dashed border-2 " />
        <div className="flex flex-col gap-8 py-10 text-[18px]">
          <span className="border-b pb-2 border-dashed">
            ✔️{dictionary[params]?.why1}
          </span>
          <span className="border-b pb-2 border-dashed">
            ✨{dictionary[params]?.why2}
          </span>
          <span className="border-b pb-2 border-dashed">
            😀{dictionary[params]?.why3}
          </span>
          <span className="border-b pb-2 border-dashed">
            ☺️{dictionary[params]?.why4}
          </span>
          <span className="border-b pb-2 border-dashed">
            💰{dictionary[params]?.why5}
          </span>
        </div>
      </div>
    </div>
  );
}
