import React, { useContext, useRef } from "react";
import { dictionary } from "../../../content";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import userLoggedIn from "@/lib/functions/userLoggedIn";
import { verifyOTP } from "../../../packages/api-management/verifyOTP";
import { AppContext } from "@/context/ContextProvider";

export default function OTP({ onChange, params, ServerOTP }) {
  const { token, setUser, setDistrict } = useContext(AppContext);
  const router = useRouter();
  const clientOTPController = useRef(null);
  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <div>
        <h2 className="font-bold text-[32px]">{dictionary[params]?.OTP}</h2>
        <span>{dictionary[params]?.otpTop}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[18px]">{dictionary[params]?.otpHere}</span>
        <input
          className="px-4 py-3 rounded-md border"
          type="tel"
          ref={clientOTPController}
          placeholder={`${dictionary[params]?.OTP}`}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="bg-theme-blue text-white"
          onClick={async () => {
            const res = await verifyOTP(
              token,
              clientOTPController.current.value
            );

            setUser(res.data);
            setDistrict(res.data.district);
          }}
        >
          {dictionary[params]?.logIn}
        </Button>
        <button className="text-right w-fit text-theme-blue text-[14px] font-bold">
          {dictionary[params]?.resendOTP}
        </button>
      </div>
    </div>
  );
}
