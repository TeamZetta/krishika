"use client";
import AuthWrapper from "@/components/AuthGuard/AuthWrapper";
import { AppContext } from "@/context/ContextProvider";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

export default function page({ params }) {
  if (typeof window === "undefined") {
    return (
      <div>
        <Loader2 />
      </div>
    );
  } else {
    const { user } = useContext(AppContext);
    console.log(typeof user);
    if (user) {
      redirect(`/${params.lang}/home`);
    }
    return <AuthWrapper type="Login" params={params.lang} />;
  }
}
