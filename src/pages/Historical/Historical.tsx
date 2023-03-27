import React, { useState, useEffect } from "react";
import moment from "moment";
import { RootHistroy, Forecastday } from "../../types/types_weather";
import { fetchData } from "../../services/httpsServices";
import { dateValidator } from "../../utils/validator";
import { createConsecutiveArray } from "../../utils/utils";
import MultiAxisLineChart from "./MultiAxisLineChart";

const Historical: React.FC = () => {
    const [weatherData, setWeatherData] = useState<Forecastday>(); // note: named as Forecastday from API but actually history data
    const [date, setDate] = useState<String>("");
    const [dateSubtract, setDateSubtract] = useState<number>(1);
    const [labelArray, setLabelArray] = useState<number[]>([]);

    useEffect(() => {
        const dateBefore = moment().subtract(dateSubtract, "days").format("YYYY-MM-DD");
        setDate(dateBefore);
    }, [dateSubtract]);

    useEffect(() => {
        if (date) {
            const getData = async () => {
                const params = {
                    // TODO2: useContent
                    q: "London",
                    dt: date,
                    lang: "en",
                };
                const response = (await fetchData({
                    responseType: "RootHistroy",
                    params,
                })) as RootHistroy;

                // TODO2: error handling
                createLabelArray();
                setWeatherData(response?.forecast?.forecastday[0]);
            };
            getData();
        }
    }, [date]);

    const createLabelArray = () => {
        dateSubtract === 0
            ? setLabelArray(createConsecutiveArray(moment().hour()))
            : setLabelArray(createConsecutiveArray(24));
    };

    const buttonsHandler = (input: -1 | 1) => {
        if (dateValidator(input, dateSubtract)) {
            setDateSubtract(dateSubtract + input);
        } else {
            alert("Can only show pass 7 days weather data history!");
        }
    };

    return (
        <div>
            <div className="historical">
                <button className="btn font" onClick={() => buttonsHandler(1)}>
                    Prev. Day
                </button>
                <div className="hist_font">History Weather on {date}</div>
                <button className="btn font" onClick={() => buttonsHandler(-1)}>
                    Next Day
                </button>
            </div>

            {weatherData && <MultiAxisLineChart labelArray={labelArray} weatherData={weatherData} />}
        </div>
    );
};

export default Historical;
