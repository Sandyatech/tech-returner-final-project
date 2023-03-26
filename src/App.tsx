import "./App.css";
import { BrowserRouter,Link } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import Router from "./components/Router";


function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <BrowserRouter>
                <ul className="App-header">
                    <li ><Link to='/' className="menu menu_font">Home</Link></li>
                    <li ><Link to='/Current' className="menu menu_font">Current</Link></li>
                    <li ><Link to='/Favourites' className="menu menu_font">Favourites</Link></li>
                    <li ><Link to='/Forecast' className="menu menu_font">Forecast</Link></li>
                    <li ><Link to='/Historical' className="menu menu_font">Historical</Link></li>
                    <li ><Link to='/Health' className="menu menu_font">Health</Link></li>
                </ul>
                <hr />
                <div className="main_content">
                    <Router />
                </div>
                
            </BrowserRouter>
            <div className="App-footer footer_font">&#169; 2023 ReactTsGroup All Rights Reserved</div>
        </ErrorBoundary>
    );
}

export default App;
