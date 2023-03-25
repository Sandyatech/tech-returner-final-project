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
                    <li ><Link to='/' className="menu">Home</Link></li>
                    <li ><Link to='/Current' className="menu">Current</Link></li>
                    <li ><Link to='/Favourites' className="menu">Favourites</Link></li>
                    <li ><Link to='/Forecast' className="menu">Forecast</Link></li>
                    <li ><Link to='/Historical' className="menu">Historical</Link></li>
                    <li ><Link to='/Health' className="menu">Health</Link></li>
                </ul>
                <hr />
                <Router />
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
