import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Favourites from "./Favourites";
import CurrentWeather from "./Current";
import Forecast from "./Forecast";
import Historical from "../pages/Historical/Historical";
import Health from "./Health";
import Error404 from "./Error404";

const Router: React.FC = () => (
    <>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />}></Route>
                <Route path="/current" element={<CurrentWeather />}></Route>
                <Route path="/favourites" element={<Favourites />}></Route>
                <Route path="/forecast" element={<Forecast />}></Route>
                <Route path="/historical" element={<Historical />}></Route>
                <Route path="/health" element={<Health />}></Route>
                <Route path="*" element={<Error404 />}></Route>
            </Route>
        </Routes>
    </>
);

export default Router;
