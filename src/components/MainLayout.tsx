import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import CurrentLocationContext from "../hooks/CurrentLocationContext";
import { getCurrentLocationFromLocalStorage } from "../utils/storage";

const MainLayout: React.FC = () => {
    const [currentLocation, setCurrentLocation] = useState<string>("");

    return (
        <>
            <main>
                <CurrentLocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
                    <Outlet />
                </CurrentLocationContext.Provider>
            </main>
        </>
    );
};

export default MainLayout;
