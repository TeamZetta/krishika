import React, { useContext, useRef, useState } from "react";
import { dictionary } from "../../../content";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { signup } from "../../../packages/api-management/signup";
import { toast } from "react-toastify";
import { AppContext } from "@/context/ContextProvider";

export default function SignUp({ onChange, params, onOtp }) {
  //controllers
  const phoneNumberController = useRef(null);
  const fullNameController = useRef(null);
  const districtController = useRef(null);
  const zipController = useRef(null);
  const emailController = useRef(null);
  const addrressController = useRef(null);
  const ladSizeController = useRef(null);
  const [iama, setIama] = useState();
  const [lang, setLang] = useState();
  const { setUser, setDistrict, setToken } = useContext(AppContext);

  const handleClick = async () => {
    if (
      phoneNumberController.current?.value &&
      fullNameController.current?.value &&
      districtController.current?.value &&
      districtController.current?.value &&
      zipController.current?.value &&
      emailController.current?.value &&
      addrressController.current?.value &&
      ladSizeController.current?.value &&
      iama &&
      lang
    ) {
      const res = await signup({
        address: addrressController.current?.value,
        district: districtController.current?.value,
        email: emailController.current?.value,
        fullName: fullNameController.current?.value,
        landSize: ladSizeController.current?.value,
        phoneNumber: phoneNumberController.current?.value,
        prefLang: lang,
        role: iama,
        zipCode: parseInt(zipController.current?.value),
      });
      console.log(zipController.current.valueAsNumber);
      console.log(res);
      if (res.status === 200) {
        setUser(res.data.user);
        setDistrict(res.data.user.district);
        setToken(res.data.accessToken);
        onOtp(res.data.otp);
        onChange("OTP");
      }
    } else {
      toast.error(`${dictionary[params]?.formNotFilled}`, {
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
  };

  return (
    <div className="px-4 py-8 flex flex-col gap-4">
      <div>
        <h2 className="font-bold text-[32px]">{dictionary[params]?.signUp}</h2>
        <span>{dictionary[params]?.signUpTop}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[18px]">{dictionary[params]?.mobileNumber}</span>
        <input
          className="px-4 py-3 rounded-md border"
          type="tel"
          ref={phoneNumberController}
          placeholder={`${dictionary[params]?.mobileNumber}`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[18px]">{dictionary[params]?.fullName}</span>
        <input
          className="px-4 py-3 rounded-md border"
          type="text"
          ref={fullNameController}
          placeholder={`${dictionary[params]?.fullName}`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[18px]">{dictionary[params]?.address}</span>
        <input
          className="px-4 py-3 rounded-md border"
          ref={addrressController}
          type="text"
          placeholder={`${dictionary[params]?.address}`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[18px]">{dictionary[params]?.zipCode}</span>
        <input
          className="px-4 py-3 rounded-md border"
          ref={zipController}
          type="text"
          placeholder={`${dictionary[params]?.zipCode}`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[18px]">{dictionary[params]?.district}</span>
        <input
          className="px-4 py-3 rounded-md border"
          type="text"
          ref={districtController}
          placeholder={`${dictionary[params]?.district}`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[18px]">{dictionary[params]?.iama}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-3 rounded-md   flex items-center bg-white justify-between border border-black">
              <span>{iama}</span>
              <ChevronDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[92vw] p-4 border rounded-sm bg-white">
            <DropdownMenuLabel className="border-b pb-2">
              Choose
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              className="flex flex-col pt-4 gap-2"
              value={iama}
              onValueChange={(value) => {
                if (value === "Farmer") {
                  setIama("Farmer");
                } else {
                  setIama("Expert");
                }
              }}
            >
              <DropdownMenuRadioItem value="Farmer">
                Farmer
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Expert">
                Expert
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[18px]">
          {dictionary[params]?.preferredLanguage}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-3 rounded-md   flex items-center bg-white justify-between border border-black">
              <span>{lang}</span>
              <ChevronDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[92vw] p-4 border rounded-sm bg-white">
            <DropdownMenuLabel className="border-b pb-2">
              Choose
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              className="flex flex-col pt-4 gap-2"
              value={lang}
              onValueChange={(value) => {
                if (value === "bn") {
                  setLang("bn");
                } else {
                  setLang("en");
                }
              }}
            >
              <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bn">Bangla</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[18px]">{dictionary[params]?.landSize}</span>
        <input
          className="px-4 py-3 rounded-md border"
          ref={ladSizeController}
          type="text"
          placeholder={`${dictionary[params]?.landSize}`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[18px]">{dictionary[params]?.email}</span>
        <input
          className="px-4 py-3 rounded-md border"
          type="text"
          ref={emailController}
          placeholder={`${dictionary[params]?.email}`}
        />
      </div>
      <Button className="bg-theme-blue text-white " onClick={handleClick}>
        {dictionary[params]?.continue}
      </Button>
      <p>{dictionary[params]?.loginContinue}</p>

      <span className="text-center">
        <span>{dictionary[params]?.alreadyRegistered}</span>
        <button
          onClick={() => {
            onChange("Login");
          }}
          className="font-bold underline"
        >
          {dictionary[params]?.logIn}
        </button>
      </span>
    </div>
  );
}
