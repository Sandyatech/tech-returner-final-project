import React, { useState, useEffect } from "react";
import { addEntryToLocalStorage, getEntryFromLocalStorage, removeEntryFromLocalStorage } from "../../utils/storage"
import { timeout } from "../../utils/utils"
import { RootCurrent, Location, CurrentWeatherData } from "../../types/types_weather";
import { fetchData } from "../../services/httpsServices";
import ComponentCurrentWether from "../Current/weather_value"


const Favourites = () => {
    const [loc, setLoc] = useState<string>('');
    const [nameloc, setNameLoc] = useState<string>('');
    const [root, setRoot] = useState<RootCurrent>();
    const [favourites, setFavourites] = useState<Array<RootCurrent | undefined>>([]);
    const [fav, setFav] = useState<boolean>(false);



    useEffect(() => {
        const getStorageLocs = async () => {
            const total = Number(getEntryFromLocalStorage('totalFav'));
            for (let i = 0; i < total; i++) {
                let favLoc = await getEntryFromLocalStorage(`fav${i}`);
                let favLoc1 = favLoc ? getData(favLoc) : null;
                await timeout(100); 
            }
        }
        getStorageLocs();
    },[])


    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getData(loc);
        let found = false;
        const total = Number(getEntryFromLocalStorage('totalFav'));
        if (total > 0) {
            for (let i = 0; i < total; i++) {
                let favLoc = await getEntryFromLocalStorage(`fav${i}`);
                if (favLoc?.toUpperCase() == loc.toUpperCase()) {
                    found = true; break;
                }

            }
            if (found == false) {
                addEntryToLocalStorage(`fav${total}`, loc);
                addEntryToLocalStorage('totalFav', (total + 1));
            }

        }
        else {
            addEntryToLocalStorage('fav0', loc);
            addEntryToLocalStorage('totalFav', 1);
        }

    
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
        })) as RootCurrent | undefined;
        if (response){
            setRoot(response);
        }
    };

    const removeFavourite = async (name: any) => {
        const total = Number(getEntryFromLocalStorage('totalFav'));
        let deleted = false;
        for (let j = 0; j < total; j++) {
            let favLoc = await getEntryFromLocalStorage(`fav${j}`);
            console.log(favLoc);
        }
        for (let i = 0; i < total; i++) {
            let favLoc = await getEntryFromLocalStorage(`fav${i}`);
            console.log(favLoc);
            console.log(name);
            if (favLoc?.toUpperCase() === name.toUpperCase()) {
                removeEntryFromLocalStorage(favLoc);
                addEntryToLocalStorage('totalFav', (total - 1));
                const prods = favourites.filter(
                    item => item?.location.name != name);
                setFavourites(prods);
                deleted = true;

            }
            else {
                if (deleted == true) {
                    favLoc = await getEntryFromLocalStorage(`fav${i}`);
                    await addEntryToLocalStorage(`fav${i - 1}`, favLoc);
                }

            }
        }
    }

    const clearAll = () => {
        localStorage.clear();
        setFavourites([]);
    }

    return (
        <div>
            <div className="form-container Current favourites-width">
                <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    placeholder="Enter Favourite Location"
                    value={loc}
                    onChange={(event) => setLoc(event.target.value)}
                    /> 
                    <button type="submit">Get Favourite</button>
               
                </form>
                <button onClick={clearAll}>Clear All</button>
                
            </div>
            <div className="favourites_container">
                {(fav == true) && (favourites.map((favourite, index) => (<div className="favourites_img_container">
                    <img className="favourites_img favourites-img-margin" key={Math.random() * 10000} onClick={(event) => removeFavourite(favourite?.location.name)} src="./close.png" ></img>
                    <ComponentCurrentWether key={index} dataWeather={{ location: favourite?.location as Location, current: favourite?.current as CurrentWeatherData }} />
                </div>
                )))}
            </div>
        </div>
    );
};

export default Favourites;
