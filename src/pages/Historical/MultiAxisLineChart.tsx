import React, { useEffect, useState } from "react";
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
import { Forecastday } from "../../types/types_weather";

interface MultiAxisLineChartProps {
    labelArray: number[];
    weatherData: Forecastday;
}

const MultiAxisLineChart: React.FC<MultiAxisLineChartProps> = ({ labelArray, weatherData }) => {
    ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

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

    return (<div className="hist_chart">
        <Line data={data} options={options} />;
    </div>);
};

export default MultiAxisLineChart;
