import React, { useEffect, useState } from "react";
import ComponentCurrentWether from "./weather_value"
import {Root} from "./interface_weather" ;


function CurrentWeather() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3ef5c4e138msh91644e12beb4158p1e5cb6jsn1b6b43ab6590',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    const [rootValue, setRoot] = useState<any>([]);
    const [errormessageApp, seterrormessageApp] = useState<string | undefined>();
    const fetchWeather = async () => {

        try {

            const apiResponse = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=london`, options);
            if (apiResponse.status === 200) {

                const dataapiResponse = await apiResponse.json() as { data: Root[] }
                setRoot(dataapiResponse);

            } else if (apiResponse.status === 500) {

                seterrormessageApp("Oops... something went wrong, try again 🤕");

            } else if (apiResponse.status === 418) {

                seterrormessageApp("418 I'm a tea pot 🫖 , silly");

            };

        } catch (error) {
            console.log(" this error occured : ->->-> " + error + " <-<-<- : this error occured ");

        };
    };

    useEffect(() => { fetchWeather() }, []);
    return (

        <>
            {rootValue && <ComponentCurrentWether dataWeather={rootValue} />}

            {errormessageApp && <h2> {` ERROR :  ${errormessageApp}`} </h2>}
        </>

    );
}
export default CurrentWeather;