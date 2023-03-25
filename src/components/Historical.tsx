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

// TODO:
// more chart
// change day

type WeatherData = {
    date: string;
    day: any;
    hour: Array<any>;
};

const MultiaxisHistoryWeathe: React.FC = () => {
    // const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [date, setDate] = useState<String>("");

    ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

    useEffect(() => {
        const dateOfYesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
        // const today = moment().format("YYYY-MM-DD");
        // console.log(`dateOfYesterday: ${dateOfYesterday}`);
        setDate(dateOfYesterday);
    }, []);

    useEffect(() => {
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
                        // end_dt: '1daysago',
                    },
                }
            );
            console.log(response.data.forecast.forecastday[0]);

            setWeatherData(response.data.forecast.forecastday[0]);
        };

        fetchData();
    }, [date]);

    // useEffect(() => {
    //   const listOfKeys = Object.keys(weatherData.)
    // }, [weatherData]);

    const data = {
        // labels: weatherData.map((data) => data.hour),
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        datasets: [
            {
                label: "Temperature (C)",
                data: weatherData?.hour.map((data) => data.temp_c),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
                // borderWidth: 1,
                // fill: false,
            },
            {
                label: "Humidity (C)",
                data: weatherData?.hour.map((data) => data.humidity),
                // borderColor: 'rgba(75, 192, 192, 1)',
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                yAxisID: "y1",
                // borderWidth: 1,
                // fill: false,
            },
        ],
    };

    // const options = {
    //   responsive: true,
    //   plugins: {
    //     legend: {
    //       position: 'top' as const,
    //     },
    //     title: {
    //       display: true,
    //       text: 'Chart.js Line Chart',
    //     },
    //   },
    // };

    const options = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        stacked: false,
        // plugins: {
        //     title: {
        //         display: true,
        //         text: "Chart.js Line Chart - Multi Axis",
        //     },
        // },
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

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>History Weather on {date}</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default MultiaxisHistoryWeathe;

/*
last 7 day
<      (Mar 23)       >
- No today history 
VS
- display 00:00 - 11:00 today 
1 more chart ?
*/
