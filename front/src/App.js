import React, {useEffect, useState} from 'react'
import {Router, Route, Link, BrowserRouter, Routes} from 'react-router-dom';
//import './Main.css';
import Main from "./pages/MainPage/Main";
import Start from "./pages/StartPage/Start";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/main" element={<Main/>}/>
                <Route path="/start" element={<Start id={"auth"}/>}/>
                <Route path="/register" element={<Start id={"register"}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
