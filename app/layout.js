"use client";

import { Raleway } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import HeaderNavBar from "@/components/HeaderNavBar";
import { useEffect, useState } from "react";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";

const raleway = Raleway({ subsets: ['latin'] });

export default function RootLayout({ children }) {

  const [userLocation,setUserLocation]=useState([]);
  const [selectedBusiness,setSelectedBusiness]=useState([]);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos)
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
    });
  };

  return (
    <html lang="en">
      <body className={raleway.className}>
        <Provider>
          <SelectedBusinessContext.Provider value={{selectedBusiness,setSelectedBusiness}}>
          <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
          <HeaderNavBar />
          {children}
          </UserLocationContext.Provider>
          </SelectedBusinessContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
