import React from "react";

import {BrowserRouter,Routes,Route,} from "react-router-dom";
import {getCookie} from "./Util/Cookie";

import Navbar from "./Components/Navbar";
import Home from "./Routes/Private/Home";
import FeatureCards from "./Routes/Public/FeatureCards";
import Login from "./Routes/Public/Login";
import Logout from "./Routes/Private/Logout";
import Register from "./Routes/Public/Register";
import Features from "./Routes/Public/Features";
import Blog from "./Routes/Public/Blog";
import About from "./Routes/Public/About";
import Footer from "./Components/Footer";

import "./css/theme.css";

export default function App(){
    console.log("Rendering App")
    const [darkMode, setDarkMode] = React.useState(false)

    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }

    if(darkMode){
        document.getElementById("body").classList.add("dark");
    }else{
        document.getElementById("body").classList.remove("dark")
    }

    var [login, setLogin] = React.useState(
        ()=>getCookie("me") ? true : false
    )
    
    function toggleLogin() {
        setLogin(prevMode => !prevMode)
    }

    
    
    
    return (
        <BrowserRouter>
            <div className= {`website ${darkMode ? "dark": ""}`}>
            <Navbar 
                    siteTitle= "WebFrame"
                    login = {login}
                    darkMode = {darkMode} 
                    toggleDarkMode={toggleDarkMode}
                    toggleLogin={toggleLogin}
            />
            <Routes>
                <Route path="/" element={
                    <FeatureCards darkMode = {darkMode}/>}>
                </Route>
                <Route path="/home" element={
                    <Home 
                        darkMode = {darkMode}
                        login = {login}
                    />}>
                </Route>
                <Route path="/login" element={
                    <Login 
                        darkMode = {darkMode}
                        toggleLogin={toggleLogin}
                        />}>
                </Route>
                <Route path="/logout" element={
                    <Logout 
                        darkMode = {darkMode}
                        toggleLogin={toggleLogin}
                    />}>
                </Route>
                <Route path="/register" element={
                    <Register darkMode = {darkMode}/>}>
                </Route>
                <Route path="/features" element={
                    <Features darkMode = {darkMode}/>}>
                </Route>
                <Route path="/blog" element={
                    <Blog darkMode = {darkMode}/>}>
                </Route>
                <Route path="/about" element={
                    <About darkMode = {darkMode}/>}>
                </Route>
            </Routes>
            <Footer darkMode = {darkMode} />
            </div>
        </BrowserRouter>
    )
}