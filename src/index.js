import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import EarthPlanet from "./EarthPlanet";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/earth" element={<EarthPlanet />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
