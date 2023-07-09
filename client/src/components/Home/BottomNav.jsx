"use client";
import React from "react";
import { HomeIcon, LucideFormInput, Newspaper, Store } from "lucide-react";
import { dictionary } from "../../../content";

export default function BottomNav({ index, onIndexChange, params }) {
  return (
    <div className="flex z-10 transition-colors justify-around items-center  fixed bottom-0 left-0 right-0 bg-white shadow-sm p-4 px-0">
      <button
        className="flex flex-col justify-center items-center"
        style={{
          color: index === 0 ? "#1D5E73" : "#585353",
        }}
        onClick={() => {
          onIndexChange(0);
        }}
      >
        <HomeIcon />
        <span>{dictionary[params]?.home}</span>
      </button>
      <button
        className="flex flex-col  justify-center items-center"
        style={{
          color: index === 1 ? "#1D5E73" : "#585353",
        }}
        onClick={() => {
          onIndexChange(1);
        }}
      >
        <Newspaper />
        <span>{dictionary[params]?.feed}</span>
      </button>
      <button
        className="flex flex-col justify-center items-center"
        style={{
          color: index === 2 ? "#1D5E73" : "#585353",
        }}
        onClick={() => {
          onIndexChange(2);
        }}
      >
        <LucideFormInput />
        <span>{dictionary[params]?.forum}</span>
      </button>

      <button
        className="flex flex-col justify-center items-center"
        style={{
          color: index === 3 ? "#1D5E73" : "#585353",
        }}
        onClick={() => {
          onIndexChange(3);
        }}
      >
        <Store />
        <span>{dictionary[params]?.mandi}</span>
      </button>
    </div>
  );
}
