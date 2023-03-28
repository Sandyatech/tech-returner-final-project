import React, { useContext } from "react";

interface interface_CurrentLocationContext {
    currentLocation: string;
    setCurrentLocation: React.Dispatch<React.SetStateAction<string>>;
}

const CurrentLocationContext = React.createContext<interface_CurrentLocationContext>({
    currentLocation: "London",
    setCurrentLocation: () => {},
});

export function useCurrentLocation() {
    return useContext(CurrentLocationContext);
}

export default CurrentLocationContext;
