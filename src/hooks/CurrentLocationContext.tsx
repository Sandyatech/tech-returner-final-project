import React, { useContext } from "react";

interface CurrentLocationContext {
    currentLocation: string;
    setCurrentLocation: React.Dispatch<React.SetStateAction<string>>;
}

const CurrentLocationContext = React.createContext<CurrentLocationContext>({
    currentLocation: "London",
    setCurrentLocation: () => {},
});

export function useCurrentLocation() {
    return useContext(CurrentLocationContext);
}

export default CurrentLocationContext;
