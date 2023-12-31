"use client";
import Mandi from "@/components/Home/Mandi";
import BottomNav from "@/components/Home/BottomNav";
import Dashboard from "@/components/Home/Dashboard";
import Groups from "@/components/Home/Groups";
import Forum from "@/components/Home/Forum";
import Navbar from "@/components/Home/Navbar";

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/ContextProvider";
import { redirect } from "next/navigation";

export default function page({ params }) {
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (!user) {
      redirect(`/${params.lang}/auth`);
    }
  }, [user]);

  const [activeIndex, setActiveIndex] = useState(0);
  const components = [
    <Dashboard details={params.lang} />,
    <Groups params={params.lang} />,
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
