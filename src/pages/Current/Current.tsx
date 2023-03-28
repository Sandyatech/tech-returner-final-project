import React, { useEffect, useState } from "react";
import ComponentCurrentWether from "./weather_value";
import { RootCurrent } from "../../types/types_weather";
import { fetchData } from "../../services/httpsServices";
import LocationForm from "./CurrentForm"
import { useCurrentLocation } from "../../hooks/CurrentLocationContext";

function CurrentWeather() {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "3ef5c4e138msh91644e12beb4158p1e5cb6jsn1b6b43ab6590",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
    };
    const [rootValue, setRoot] = useState<RootCurrent>();
    const {currentLocation, setCurrentLocation} = useCurrentLocation();

    const [errormessageApp, seterrormessageApp] = useState<string | undefined>();
    

    const getData = async (location: string) => {
        const params = {
            // TODO2: useContent
            q: location
        };
        const response = (await fetchData({
            responseType: "RootCurrent",
            params,
        })) as RootCurrent;

        // TODO2: error handling
        setRoot(response);
    };

    // }, []);

    return (
        <>
            <LocationForm handleSubmit={getData} />
            {rootValue && <ComponentCurrentWether dataWeather={rootValue} />}

            {errormessageApp && <h2> {` ERROR :  ${errormessageApp}`} </h2>}
        </>
    );
}
export default CurrentWeather;
