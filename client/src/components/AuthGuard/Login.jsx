import React, { useContext, useRef } from "react";
import { dictionary } from "../../../content";
import { Button } from "../ui/button";
import { login } from "../../../packages/api-management/login";
import { toast } from "react-toastify";

import { AppContext } from "@/context/ContextProvider";

export default function Login({ params, onChange, onOtp }) {
  //controllers
  const phoneNumberController = useRef(null);
  const { setUser, setDistrict, setToken } = useContext(AppContext);
  //login
  const handleClick = async () => {
    if (phoneNumberController.current?.value !== undefined) {
      if (phoneNumberController.current?.value === "") {
        toast.error(`${dictionary[params]?.mobInvalid}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const response = await login(phoneNumberController.current?.value);
      if (response.status === 200) {
        setToken(response.data);
        onChange("OTP");
      } else {
        toast.error(`${dictionary[params]?.otpSent}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <div>
        <h2 className="font-bold text-[32px]">{dictionary[params]?.logIn}</h2>
        <span>{dictionary[params]?.loginTop}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[18px]">{dictionary[params]?.mobileNumber}</span>
        <input
          ref={phoneNumberController}
          className="px-4 py-3 rounded-md border"
          type="tel"
          placeholder={`${dictionary[params]?.mobileNumber}`}
        />
      </div>
      <Button className="bg-theme-blue text-white" onClick={handleClick}>
        {dictionary[params]?.continue}
      </Button>
      <p>{dictionary[params]?.loginContinue}</p>

      <span className="text-center">
        <span>{dictionary[params]?.notRegistered}</span>
        <button
          onClick={() => {
            onChange("SignUp");
          }}
          className="font-bold underline"
        >
          {dictionary[params]?.signUp}
        </button>
      </span>
    </div>
  );
}
