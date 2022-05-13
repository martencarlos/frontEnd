import React from "react";

import Navbar from "./Components/Navbar";
import FeatureCards from "./Components/FeatureCards";

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
        <div className= {`website ${darkMode ? "dark": ""}`}>
           <Navbar 
                siteTitle= "WebFrame"
                darkMode = {darkMode} 
                toggleDarkMode={toggleDarkMode}
           />
           <FeatureCards darkMode = {darkMode}/>
           <Footer darkMode = {darkMode} />
        </div>
    )
}