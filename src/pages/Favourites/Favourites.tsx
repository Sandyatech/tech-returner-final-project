import React, { useState, useEffect } from "react";

import { RootCurrent, Location, CurrentWeatherData } from "../../types/types_weather";
import { fetchData } from "../../services/httpsServices";
import ComponentCurrentWether from "../Current/weather_value"


const Favourites = () => {
    const [loc, setLoc] = useState<string>('');
    const [root, setRoot] = useState<RootCurrent>();
    const [favourites, setFavourites] = useState<Array<RootCurrent | undefined>>([]);
    const [fav, setFav] = useState<boolean>(false);

    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        getData(loc);
    
    };
    useEffect(() => {
        if (favourites) {
            const boxes = getClassList(); 
            boxes.map(box => {
                box.classList.remove('current-width');
                box.classList.add('favourites');
            });

        }
    }, [favourites])
    const getClassList = () => {
        return(Array.from(document.getElementsByClassName('current-width')));
    }
    useEffect(() => {
        if (root) {
            const prods = [...favourites,root].filter(
                (value, index, array) =>
                    index == array.findIndex(item => item?.location.name == value?.location.name));
            setFavourites(prods);                  
            setFav(true);
        }

    },[root]);


    const getData = async (location:string) => {
        const params = {
            q: location
        };
        const response = (await fetchData({
            responseType: "RootCurrent",
            params,
        })) as RootCurrent;
        console.log(response);
        setRoot(response);
    };


    return (
        <div>
            <div className="form-container Current favourites-width">
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    placeholder="Enter location"
                    value={loc}
                    onChange={(event) => setLoc(event.target.value)}
                />
                <button type="submit">Get Favourite Location</button>
                </form>
            </div>
            <div className="favourites_container">
            {(fav==true) && (favourites.map((favourite, index) =>
                <ComponentCurrentWether key={index} dataWeather={{ location: favourite?.location as Location, current: favourite?.current as CurrentWeatherData }} />
                ))}
            </div>
        </div>
    );
};

export default Favourites;
