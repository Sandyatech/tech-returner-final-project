import { Outlet } from "react-router-dom";
import { useState } from "react";
import CurrentLocationContext from "./CurrentLocationContext";

const MainLayout: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string>("London");
  return (
    <>
      <main>
        <CurrentLocationContext.Provider
          value={{ currentLocation, setCurrentLocation }}
        >
          <Outlet />
        </CurrentLocationContext.Provider>
      </main>
    </>
  );
};

export default MainLayout;
