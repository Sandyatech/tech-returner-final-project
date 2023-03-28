import { render, screen } from '@testing-library/react';
import CurrentWeather from './CurrentWeather';

describe('CurrentWeather', () => {
    const locationName = 'New York';
    const localTime = '2022-03-23 12:00';
    const currentWeather = {
        last_updated: '2022-03-23 11:00',
        temp_c: 15,
        condition: {
            text: 'Sunny',
            icon: 'https://example.com/sunny.png'
        },
        wind_kph: 10,
        humidity: 50,
        feelslike_c: 16,
        uv: 5
    };

    it('renders location name and local time', () => {
        render(<CurrentWeather locationName={locationName} localTime={localTime} />);
        expect(screen.getByText(`Current weather in ${locationName}`)).toBeInTheDocument();
        expect(screen.getByText(`Local time: ${localTime}`)).toBeInTheDocument();
    });

    it('renders current weather data', () => {
        render(<CurrentWeather currentWeather={currentWeather} locationName={locationName} localTime={localTime} />);
        expect(screen.getByText(`Last updated: ${currentWeather.last_updated}`)).toBeInTheDocument();
        expect(screen.getByText(`Temperature: ${currentWeather.temp_c}°C`)).toBeInTheDocument();
        expect(screen.getByText(`Condition: ${currentWeather.condition.text}`)).toBeInTheDocument();
        expect(screen.getByAltText(currentWeather.condition.text)).toBeInTheDocument();
        expect(screen.getByText(`Wind speed: ${currentWeather.wind_kph} km/h`)).toBeInTheDocument();
        expect(screen.getByText(`Humidity: ${currentWeather.humidity}%`)).toBeInTheDocument();
        expect(screen.getByText(`Feels like: ${currentWeather.feelslike_c}°C`)).toBeInTheDocument();
        expect(screen.getByText(`UV index: ${currentWeather.uv}`)).toBeInTheDocument();
    });

    it('renders no current weather data message if no data is passed', () => {
        render(<CurrentWeather locationName={locationName} localTime={localTime} />);
        expect(screen.getByText('No current weather data available')).toBeInTheDocument();
    });
});
