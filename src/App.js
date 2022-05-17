import React from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Navbar from "./Components/Navbar";
import FeatureCards from "./Components/FeatureCards";
import Login from "./Components/Login";
import About from "./Components/About";
import Footer from "./Components/Footer";

import "./css/theme.css";

export default function App(){
    
    const [darkMode, setDarkMode] = React.useState(false)

    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }
    if(darkMode){
        document.getElementById("body").classList.add("dark");
    }else{
        document.getElementById("body").classList.remove("dark")
    }
    
    return (
        <Router>
            <div className= {`website ${darkMode ? "dark": ""}`}>
            <Navbar 
                    siteTitle= "WebFrame"
                    darkMode = {darkMode} 
                    toggleDarkMode={toggleDarkMode}
            />
            <Switch>
            <Route exact path="/">
                    <FeatureCards darkMode = {darkMode}/>
                </Route>
                <Route path="/login">
                    <Login darkMode = {darkMode}/>
                </Route>
                <Route path="/about">
                    <About darkMode = {darkMode}/>
                </Route>
            </Switch>
            <Footer darkMode = {darkMode} />
            </div>
        </Router>
    )
}