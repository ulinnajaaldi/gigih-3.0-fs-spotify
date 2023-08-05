"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { getCookies, expiredToken } from "@/lib/utils";
import { getUserProfile } from "@/lib/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log("triggred context router.pathname");
    if (router.pathname === "/me") {
      getProfile();
    }
  }, [router.pathname]);

  useEffect(() => {
    console.log("triggred context userData");
    getProfile();
  }, [userData]);

  const getProfile = async () => {
    try {
      const token = getCookies("access_token");

      if (!token) {
        setUserData(null);
        expiredToken();
        return;
      }

      const response = await getUserProfile();
      if (response !== 401) {
        if (JSON.stringify(userData) !== JSON.stringify(response)) {
          setUserData(response);
        }
      } else {
        setUserData(null);
        expiredToken();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
