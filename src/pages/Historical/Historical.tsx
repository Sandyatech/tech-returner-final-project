import React, { useState, useEffect } from "react";
import moment from "moment";
import { RootHistroy, Forecastday } from "../../types/types_weather";
import { fetchData } from "../../services/httpsServices";
import { dateValidator } from "../../utils/validator";
import { createConsecutiveArray } from "../../utils/utils";
import { useCurrentLocation } from "../../hooks/CurrentLocationContext";
import MultiAxisLineChart from "./MultiAxisLineChart";
import AlertMui from "../../components/AlertMui";

const Historical: React.FC = () => {
    const [weatherData, setWeatherData] = useState<Forecastday>(); // note: named as Forecastday from API but actually history data
    const [date, setDate] = useState<String>("");
    const [dateSubtract, setDateSubtract] = useState<number>(1);
    const [labelArray, setLabelArray] = useState<number[]>([]);
    const [openAlert, setOpenAlert] = React.useState(false);

    const { currentLocation, setCurrentLocation } = useCurrentLocation();

    useEffect(() => {
        const dateBefore = moment().subtract(dateSubtract, "days").format("YYYY-MM-DD");
        setDate(dateBefore);
    }, [dateSubtract]);

    useEffect(() => {
        if (date) {
            const getData = async () => {
                const params = {
                    q: currentLocation,
                    dt: date,
                    lang: "en",
                };
                const response = (await fetchData({
                    responseType: "RootHistroy",
                    params,
                })) as RootHistroy;

                createLabelArray();
                setWeatherData(response?.forecast?.forecastday[0]);
            };
            getData();
        }
    }, [date, currentLocation]);

    const createLabelArray = () => {
        dateSubtract === 0
            ? setLabelArray(createConsecutiveArray(moment().hour()))
            : setLabelArray(createConsecutiveArray(24));
    };

    const buttonsHandler = (input: -1 | 1) => {
        if (dateValidator(input, dateSubtract)) {
            setDateSubtract(dateSubtract + input);
        } else {
            setOpenAlert(true);
        }
    };

    return (
        <div>
            <div className="historical">
                <button className="btn font" onClick={() => buttonsHandler(1)}>
                    Prev. Day
                </button>
                <div className="hist_font">
                    Historical weather for {currentLocation} on {date}
                </div>
                <button className="btn font" onClick={() => buttonsHandler(-1)}>
                    Next Day
                </button>
            </div>
            {weatherData && <MultiAxisLineChart labelArray={labelArray} weatherData={weatherData} />}
            {openAlert && (
                <AlertMui
                    openAlert={openAlert}
                    setOpenAlert={setOpenAlert}
                    message="Can only show pass 7 days weather data history!"
                />
            )}
        </div>
    );
};

export default Historical;
