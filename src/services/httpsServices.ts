import axios from "axios";
import { RootCurrent, RootForecast, RootHistroy } from "../types/types_weather";
import { ResponseType } from "../types/types_weather";
import { headers, CURRENT_URL, FORECAST_URL, HISTORY_URL } from "./api";

// type ResponseType = "RootCurrent" | "RootForecast" | "RootHistroy";

interface FetchDataProps {
    responseType: ResponseType;
    params: any;
}
// urlPath: string;

export async function fetchData({ responseType, params }: FetchDataProps) {
    switch (responseType) {
        case "RootCurrent": {
            const response = await axios.get<RootCurrent>(CURRENT_URL, {
                headers: headers,
                params: params,
            });
            // TODO2: error handling
            return response.data as RootCurrent;
        }
        case "RootForecast": {
            const response = await axios.get<RootForecast>(FORECAST_URL, {
                headers: headers,
                params: params,
            });
            // TODO2: error handling
            return response.data as RootForecast;
        }
        case "RootHistroy": {
            const response = await axios.get<RootHistroy>(HISTORY_URL, {
                headers: headers,
                params: params,
            });
            // TODO2: error handling
            return response.data as RootHistroy;
        }

        default:
            throw new Error(`Unknown response type: ${responseType}`);
    }
}

// NOTE:
// NOTE: FAILED code below !!!
// NOTE:

// interface FetchDataProps<T extends ResponseType> {
//     responseType: T;
//     urlPath: string;
//     params: any;
// }

// export async function fetchData<T extends ResponseType>({ responseType, urlPath, params }: FetchDataProps<T>) {
//     const response = await axios.get<T>(urlPath, {
//         headers: headers,
//         params: params,
//     });
//     return response;
// }

// const aaa = async () => {
//     const result = await fetchData<RootHistroy>({
//         responseType: RootHistroy,
//         urlPath: "/api/data",
//         params: { id: 1 },
//     });
// };
