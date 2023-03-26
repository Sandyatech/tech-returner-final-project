import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";
import moment from "moment";
import { RootHistroy, Forecastday } from "./interface_weather";
import { fetchData } from "../services/httpsServices";
import { dateValidator } from "../utils/validator";
import { createConsecutiveArray } from "../utils/utils";

const MultiaxisHistoryWeathe: React.FC = () => {
    const [weatherData, setWeatherData] = useState<Forecastday>(); // note: named as Forecastday from API but actually history data
    const [date, setDate] = useState<String>("");
    const [dateSubtract, setDateSubtract] = useState<number>(1);
    const [labelArray, setLabelArray] = useState<number[]>([]);

    ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

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
        if (dateSubtract === 0) {
            setLabelArray(createConsecutiveArray(moment().hour()));
        } else {
            setLabelArray(createConsecutiveArray(24));
        }
    };

    const buttonsHandler = (input: -1 | 1) => {
        if (dateValidator(input, dateSubtract)) {
            setDateSubtract(dateSubtract + input);
        } else {
            alert("Can only show pass 7 days weather data history!");
        }
    };

    const data = {
        labels: labelArray,
        datasets: [
            {
                label: "Temperature (C)",
                data: weatherData?.hour?.map((data) => data.temp_c),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
            },
            {
                label: "Humidity (%)",
                data: weatherData?.hour?.map((data) => data.humidity),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                yAxisID: "y1",
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        stacked: false,
        scales: {
            y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
            },
            y1: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                grid: {
                    drawOnChartArea: false,
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Hour",
                },
            },
        },
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
            <Line style={{ textAlign: "center" }} data={data} options={options} />
        </div>
    );
};

export default MultiaxisHistoryWeathe;
