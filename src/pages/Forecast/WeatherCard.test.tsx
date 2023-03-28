import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCard from "./WeatherCard";

describe("WeatherCard component", () => {
    test("renders a message when no weather data is available", () => {
        const day = {
            date: "2022-04-01",
            hour: [],
            date_epoch: 0,
            day: {
                maxtemp_c: 0,
                maxtemp_f: 0,
                mintemp_c: 0,
                mintemp_f: 0,
                avgtemp_c: 0,
                avgtemp_f: 0,
                maxwind_mph: 0,
                maxwind_kph: 0,
                totalprecip_mm: 0,
                totalprecip_in: 0,
                avgvis_km: 0,
                avgvis_miles: 0,
                avghumidity: 0,
                condition: {
                    text: "string",
                    icon: "string",
                    code: 0,
                },
                uv: 0,
            },
            astro: {
                sunrise: "string",
                sunset: "string",
                moonrise: "string",
                moonset: "string",
                moon_phase: "string",
                moon_illumination: "string",
            },
        };
        render(<WeatherCard day={day} />);
        expect(screen.getByText("No weather data available.")).toBeInTheDocument();
    });
});
