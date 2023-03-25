import React, { useState, useEffect } from "react";
import axios from "axios";
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

type WeatherData = {
    date: string;
    day: any;
    hour: Array<any>;
};

const MultiaxisHistoryWeathe: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>();
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
            const fetchData = async () => {
                const response = await axios.get<{ forecast: { forecastday: WeatherData[] } }>(
                    "https://weatherapi-com.p.rapidapi.com/history.json",
                    {
                        headers: {
                            "X-RapidAPI-Key": "3ef5c4e138msh91644e12beb4158p1e5cb6jsn1b6b43ab6590",
                            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
                        },
                        params: {
                            q: "London",
                            dt: date,
                            lang: "en",
                        },
                    }
                );
                createLabelArray();
                setWeatherData(response.data.forecast.forecastday[0]);
            };
            fetchData();
        }
    }, [date]);

    const createLabelArray = () => {
        if (dateSubtract === 0) {
            setLabelArray(createConsecutiveArray(moment().hour()));
        } else {
            setLabelArray(createConsecutiveArray(24));
        }
    };

    const createConsecutiveArray = (num: number) => {
        return Array.from({ length: num }, (_, i) => i);
    };

    const data = {
        labels: labelArray,
        datasets: [
            {
                label: "Temperature (C)",
                data: weatherData?.hour.map((data) => data.temp_c),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
            },
            {
                label: "Humidity (C)",
                data: weatherData?.hour.map((data) => data.humidity),
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
        },
    };

    const buttonsHandler = (input: -1 | 1) => {
        if (dateValidator(input)) {
            setDateSubtract(dateSubtract + input);
        } else {
            alert("Can only show pass 7 days weather data history!");
        }
    };

    const dateValidator = (input: -1 | 1) => {
        const max_dateSubtract = 7; // 7 days before
        const min_dateSubtract = 0; // today
        const adjusted_dateSubtract = dateSubtract + input;
        if (adjusted_dateSubtract >= min_dateSubtract && adjusted_dateSubtract <= max_dateSubtract) {
            return true;
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", maxHeight: "700px", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <button style={{ marginRight: "10%", width: "10rem" }} onClick={() => buttonsHandler(1)}>
                    Prev. Day
                </button>
                <h2 style={{ textAlign: "center" }}>History Weather on {date}</h2>
                <h2 style={{ textAlign: "center" }}>{dateSubtract}</h2>
                <button style={{ marginLeft: "10%", width: "10rem" }} onClick={() => buttonsHandler(-1)}>
                    Next Day
                </button>
            </div>
            <Line style={{ textAlign: "center" }} data={data} options={options} />
        </div>
    );
};

export default MultiaxisHistoryWeathe;
