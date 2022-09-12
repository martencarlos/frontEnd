import React, { useEffect } from "react";

import {BrowserRouter,Routes,Route,} from "react-router-dom";
import {getCookie, setCookie} from "./Util/Cookie";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Routes/Private/Home/Home";
import Main from "./Routes/Public/Main/Main";
import Login from "./Routes/Public/Login/Login";
import Logout from "./Routes/Private/Logout";
import Register from "./Routes/Public/Register/Register";
import Projects from "./Routes/Public/Projects/Projects";
import InfinityCards from "./Routes/Public/FeatureCards";
import Features from "./Routes/Public/Features/Features";
import Blog from "./Routes/Public/Blog/Blog";
import About from "./Routes/Public/About/About";
import Footer from "./Components/Footer/Footer";

import "./css/theme.css";

export default function App(){
    console.log("Rendering App")

    // ***** USE STATES & USE EFFECTS *****
    
    // LOGIN
    var [login, setLogin] = React.useState(
        ()=>getCookie("me") ? true : false
    )
    
    function toggleLogin() {
        setLogin(prevMode => !prevMode)
    }

    // DARK MODE
    const [darkMode, setDarkMode] = React.useState(
        ()=>getCookie("dark") ? JSON.parse(getCookie("dark")) : false)
    
    // check if darkmode and update Body
    useEffect(() => {
        if(darkMode){
            document.getElementById("body").classList.add("dark");
        }else{
            document.getElementById("body").classList.remove("dark")
        }
      }, [darkMode])

    // Toggle darkmode function
    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
        setCookie("dark",!darkMode, 1)
    }
    
    return (
        <BrowserRouter>
            <div id="website" className= {`website ${darkMode ? "dark": ""}`}>
            <Navbar 
                    siteTitle= "WebFrame"
                    login = {login}
                    darkMode = {darkMode} 
                    toggleDarkMode={toggleDarkMode}
                    toggleLogin={toggleLogin}
            />
            <Routes>
             
                <Route path="/" element={
                    <Main 
                        darkMode = {darkMode}
                    />}>
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
                <Route path="projects" element={
                    <Projects darkMode = {darkMode}/>}>
                </Route>
                <Route path="projects/infinitycards" element={
                    <InfinityCards 
                        darkMode = {darkMode} 
                        login = {login}
                    />}>
                </Route>
                <Route path="projects/blog" element={
                    <Blog darkMode = {darkMode}/>}>
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