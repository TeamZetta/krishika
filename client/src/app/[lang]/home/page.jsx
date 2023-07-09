"use client";
import Mandi from "@/components/Home/Mandi";
import BottomNav from "@/components/Home/BottomNav";
import Dashboard from "@/components/Home/Dashboard";
import Feed from "@/components/Home/Feed";
import Forum from "@/components/Home/Forum";
import Navbar from "@/components/Home/Navbar";

import React, { useState } from "react";

export default function page({ params }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const components = [
    <Dashboard details={params.lang} />,
    <Feed />,
    <Forum params={params.lang} />,
    <Mandi params={params.lang} />,
  ];
  return (
    <div className="w-screen h-screen">
      <Navbar params={params.lang} />
      <div className="">{components[activeIndex]}</div>
      <BottomNav
        params={params.lang}
        index={activeIndex}
        onIndexChange={(val) => {
          setActiveIndex(val);
        }}
      />
    </div>
  );
}
