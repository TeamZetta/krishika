"use client";
import React, { useState } from "react";

import Login from "./Login";
import SignUp from "./SignUp";
import OTP from "./OTP";

export default function AuthWrapper({ type = "Login", params }) {
  const [phase, setPhase] = useState(type);
  const [otp, setOTP] = useState("");
  return (
    <div>
      <img
        src="/Assets/authImage.png"
        height={40}
        width={500}
        alt="Krishika Logo"
        className="w-screen h-auto object-cover"
      />
      {phase === "Login" && (
        <Login
          onOtp={(val) => {
            setOTP(val);
          }}
          params={params}
          onChange={(value) => {
            setPhase(value);
          }}
        />
      )}
      {phase === "SignUp" && (
        <SignUp
          onOtp={(val) => {
            setOTP(val);
          }}
          params={params}
          onChange={(val) => {
            setPhase(val);
          }}
        />
      )}
      {phase === "OTP" && (
        <OTP
          ServerOTP={otp}
          params={params}
          onChange={(val) => {
            setPhase(val);
          }}
        />
      )}
    </div>
  );
}
