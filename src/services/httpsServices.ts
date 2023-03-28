import axios, { AxiosResponse, AxiosError } from "axios";
import { RootCurrent, RootForecast, RootHistroy } from "../types/types_weather";
import { ResponseType } from "../types/types_weather";
import { headers, CURRENT_URL, FORECAST_URL, HISTORY_URL } from "./api";

interface FetchDataProps {
    responseType: ResponseType;
    params: any;
}

export async function fetchData({ responseType, params }: FetchDataProps) {
    try {
        switch (responseType) {
            case "RootCurrent": {
                const response: AxiosResponse = await axios.get<RootCurrent>(CURRENT_URL, {
                    headers: headers,
                    params: params,
                });
                return response.data as RootCurrent;
            }
            case "RootForecast": {
                const response = await axios.get<RootForecast>(FORECAST_URL, {
                    headers: headers,
                    params: params,
                });
                return response.data as RootForecast;
            }
            case "RootHistroy": {
                const response = await axios.get<RootHistroy>(HISTORY_URL, {
                    headers: headers,
                    params: params,
                });
                return response.data as RootHistroy;
            }
            default:
                console.log(`Unknown response type: ${responseType}`);
                alert(`Unknown response type: ${responseType}`);
                return undefined;
        }
    } catch (err) {
        const error = err as Error | AxiosError;
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    console.log("404 Not Found");
                    alert("Http ERROR! 404 Not Found");
                    return undefined;
                } else {
                    alert(`Http ERROR : ${error.response.data}`);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    return undefined;
                }
            } else if (error.request) {
                console.log(error.request);
                alert(`Http ERROR : ${String(error.request)}`);
                return undefined;
            } else {
                console.log("Error", error.message);
                alert(`Http ERROR : ${String(error.message)}`);
                return undefined;
            }
        }
        console.log("Native Error", error);
        alert(`Http Native ERROR : ${String(error.message)}`);
        return undefined;
    }
}
