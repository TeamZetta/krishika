import React from "react";
import LanguageChooser from "@/components/Welcome-Components/LanguageChooser";

export default function Page({ params }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LanguageChooser lang={params.lang} />
    </div>
  );
}
