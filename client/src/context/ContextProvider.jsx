import { redirect, usePathname } from "next/navigation";
import React, { Fragment, createContext, useEffect, useState } from "react";

export const AppContext = createContext({
  user: null,
  setUser: (user) => {},
  district: null,
  setDistrict: (district) => {},
  token: null,
  setToken: (token) => {},
});

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [district, setDistrict] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedDistrict = localStorage.getItem("district");
      const storedToken = localStorage.getItem("token");
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setDistrict(storedDistrict || null);
      setToken(storedToken || null);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("district", district || "");
      localStorage.setItem("token", token || "");
    }
  }, [user, district, token]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        district,
        setDistrict,
        token,
        setToken,
      }}
    >
      <MainApp>{children}</MainApp>
    </AppContext.Provider>
  );
}

const MainApp = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lang") || null;
    }
    return null;
  });

  const path = usePathname().split("/")[1];

  useEffect(() => {
    if (path === "") {
      if (lang === null || lang === "") {
        redirect("/bn/welcome");
      } else {
        redirect(`/${lang}`);
      }
    }
  }, [lang, path]);

  return <Fragment>{children}</Fragment>;
};
