import React, { useState,useEffect } from "react";

import {BrowserRouter,Routes,Route,} from "react-router-dom";
import {getCookie, setCookie} from "./Util/Cookie";
import axios from "axios";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Routes/Private/Home/Home";
import Main from "./Routes/Public/Main/Main";
import Login from "./Routes/Public/Login/Login";
import Logout from "./Routes/Private/Logout";
import Register from "./Routes/Public/Register/Register";
import Projects from "./Routes/Public/Projects/Projects";
import InfinityCards from "./Routes/Public/InfinityCards/InfinityCards";
import Features from "./Routes/Public/Features/Features";
import Blog from "./Routes/Public/Blog/Blog";
import About from "./Routes/Public/About/About";
import Footer from "./Components/Footer/Footer";

import "./css/theme.css";
import {ThemeProvider, createTheme } from '@mui/material/styles';

export default function App(){
    console.log("Rendering App")

    var style = getComputedStyle(document.body)

    // COLOR THEME PALETTE
    const theme = createTheme({
        palette: {
            
            primary: {
                light: style.getPropertyValue('--primary-light').trim() ,
                main: style.getPropertyValue('--primary-color').trim(),
                dark: style.getPropertyValue('--primary-dark').trim() ,
                contrastText: '#fff',
            },
            secondary: {
                light: style.getPropertyValue('--secondary-light').trim() ,
                main: style.getPropertyValue('--secondary-color').trim() ,
                dark: style.getPropertyValue('--secondary-dark').trim() ,
                contrastText: '#000',
            },
            text: {
                primary: style.getPropertyValue('--primary-text').trim(),
                secondary: style.getPropertyValue('--secondary-text').trim(),
            }
        },
    });

     // LOGIN
    var [login, setLogin] = React.useState(
        ()=>getCookie("me") ? true : false
    )
    
    function toggleLogin() {
        setLogin(prevMode => !prevMode)
    }

    // User information (including profile picture url link)
    const [userData, setUserData] = useState({})

    //Set user data after login
    useEffect(() => {
        console.log("App useEffect - login")

        //after logout clear userData
        if(userData.profilePic){
            setUserData({})
        }

        if(getCookie("me")){
            var cookieUser = JSON.parse(getCookie("me"))
            
            setUserData(cookieUser)
            if(!localStorage.getItem("profilePic")){
                getProfileImageIntoLocalStorage()
            }else{
                setUserData(prevFormData => ({
                    ...prevFormData,
                    profilePic: localStorage.profilePic
                }))
            }
        }
        
    }, [login])

    function getProfileImageIntoLocalStorage(){
        console.log("retrieving pic and setting into localstorage")
        const config = {
            url: process.env.REACT_APP_SERVER+'/getProfileImage',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: getCookie("me"),
            withCredentials: true, // Now this is was the missing piece in the client side 
        };
        axios(config).then(function (response) {
            
            console.log("Actually setting local storage")
            if(response.data){
                localStorage.setItem("profilePic", response.data)
            }else{
                const defaultProfilePic = "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/profiles%2Fdefault.jpeg?alt=media&token=a220a7a4-ab49-4b95-ac02-d024b1ccb5db"
                localStorage.setItem("profilePic", defaultProfilePic)
            }
            setUserData(prevFormData => ({
                ...prevFormData,
                profilePic: localStorage.profilePic
            }))
        })
        .catch(function (error) {
            console.log("error retrieving image")
        });
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

    console.log("local storage info:")
    console.log(localStorage.getItem("profilePic"))
    console.log("User data passed to children")
    console.log(userData)
    return (
        <BrowserRouter>
        <ThemeProvider theme={theme}>
            <div id="website" className= {`website ${darkMode ? "dark": ""}`}>
            <Navbar 
                    siteTitle= "WebFrame"
                    userData = {userData}
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
                        userData = {userData}
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
            </ThemeProvider>
        </BrowserRouter>
    )
}