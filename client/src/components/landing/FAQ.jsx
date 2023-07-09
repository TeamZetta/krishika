import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { dictionary } from "../../../content";
import Link from "next/link";

export default function FAQ({ params }) {
  return (
    <div className="w-full px-4 py-8 bg-theme-blue text-white flex flex-col">
      <h3 className="text-[24px] font-bold">{dictionary[params]?.FAQ}</h3>
      <Accordion type="single" collapsible className="w-full py-8">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[20px]">
            {dictionary[params]?.MSP}
          </AccordionTrigger>
          <AccordionContent className="text-[18px]">
            {dictionary[params]?.MSPANSWER}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Link
        href=""
        className="bg-white w-full text-theme-blue text-center py-2 rounded-md"
      >
        {dictionary[params]?.readMore}
      </Link>
    </div>
  );
}
