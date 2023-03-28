import React, { useEffect, useState } from "react";
import ComponentCurrentWether from "./weather_value";
import { RootCurrent } from "../../types/types_weather";
import { fetchData } from "../../services/httpsServices";
import LocationForm from "./CurrentForm"
import { useCurrentLocation } from "../../hooks/CurrentLocationContext";
import { addCurrentLocationToLocalStorage, getCurrentLocationFromLocalStorage } from "../../utils/storage";


function CurrentWeather() {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "3ef5c4e138msh91644e12beb4158p1e5cb6jsn1b6b43ab6590",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
    };
    const [rootValue, setRoot] = useState<RootCurrent>();
    const { currentLocation, setCurrentLocation } = useCurrentLocation();
    const [locationData, setLocationData] = useState<Location>();

    const [errormessageApp, seterrormessageApp] = useState<string | undefined>();

    const handleSubmit = async (location: string) => {
        console.log("input location: ", location);
        setCurrentLocation(location);
        addCurrentLocationToLocalStorage(location);


    };

    useEffect(() => {
        const localStorage_currentLocation = getCurrentLocationFromLocalStorage();
        if (localStorage_currentLocation) {
            setCurrentLocation(localStorage_currentLocation);
        }
    }, []);

    useEffect(() => {
        if (currentLocation) {
            const getData = async () => {
                const params = {
                    q: currentLocation
                };
                const response = (await fetchData({
                    responseType: "RootCurrent",
                    params,
                })) as RootCurrent | undefined;
                if (response) {
                    setRoot(response);

                }
            };
            getData();
        }
    }, [currentLocation]);


    return (
        <>
            <LocationForm handleSubmit={handleSubmit} />
            {rootValue && <ComponentCurrentWether dataWeather={rootValue} />}

            {errormessageApp && <h2> {` ERROR :  ${errormessageApp}`} </h2>}
        </>
    );
}
export default CurrentWeather;
