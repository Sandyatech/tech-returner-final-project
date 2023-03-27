import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Home from "../pages/Home/Home";
import Favourites from "../pages/Favourites/Favourites";
import CurrentWeather from "../pages/Current/Current";
import Forecast from "../pages/Forscast/Forecast";
import Historical from "../pages/Historical/Historical";
import Health from "../pages/Health/Health";
import Error404 from "../components/Error404";

const Router: React.FC = () => (
    <>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<CurrentWeather />}></Route>                
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
