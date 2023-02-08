import React, { useState,useEffect } from "react";

import {BrowserRouter,Routes,Route,} from "react-router-dom";
import {getCookie, setCookie, delCookie} from "./Util/Cookie";
import axios from "axios";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Routes/Private/Home/Home";
import LandingPage from "./Routes/Public/LandingPage/LandingPage";
import Login from "./Routes/Public/Login/Login";
import Logout from "./Routes/Private/Logout";
import Register from "./Routes/Public/Register/Register";
import Projects from "./Routes/Public/Projects/Projects";
import InfinityCards from "./Routes/Public/InfinityCards/InfinityCards";
import Features from "./Routes/Public/Features/Features";
import WebScrap from "./Routes/Public/WebScrap/WebScrap";
import Blog from "./Routes/Public/Blog/Blog";
import About from "./Routes/Public/About/About";
import NotFound from "./Routes/Public/NotFound/NotFound";
import Footer from "./Components/Footer/Footer";

import { SnackbarProvider } from 'notistack';

import "./css/theme.css";
import {ThemeProvider, createTheme } from '@mui/material/styles';
import { dark } from "@mui/material/styles/createPalette";
import PriceTracker from "./Routes/Private/PriceTracker/PriceTracker";

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });


export default function App(){
    console.log("Rendering App")

    // Random profile picture color when logged out
    var root = document.querySelector(':root');
    root.style.setProperty('--deg', Math.floor(Math.random() * 360)+'deg')

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

    function updateUserData(newUserData) {
        delCookie("me")
        setCookie("me", JSON.stringify(newUserData), 90001)
        setUserData(newUserData)
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
        
    }, [login,userData.profilePic])

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
        ()=>localStorage.getItem("dark-mode") ? JSON.parse(localStorage.getItem("dark-mode")) : false)
        // ()=>getCookie("dark") ? JSON.parse(getCookie("dark")) : false)
    
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
        localStorage.setItem("dark-mode",!darkMode)
        // setCookie("dark",!darkMode, 1)
    }

    console.log("User data passed to children")
    console.log(userData)

    return (
        <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
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
                    <LandingPage 
                        title= "Landing Page"
                        darkMode = {darkMode}
                    />}>
                </Route>

                {/* <Route path="/blog">
                    <Route path="" element={<Blog title="Blog" darkMode = {darkMode}/>}/>
                    <Route path=":id" element={<Blog title="Blog" darkMode = {darkMode}/>}/>
                </Route>
                 */}
                <Route path="/home"> 
                    <Route path="" element={
                        <Home 
                            darkMode = {darkMode}
                            userData = {userData}
                            login = {login}
                            toggleLogin={toggleLogin}
                            title= "Home"
                        />}
                    />
                    <Route path="dashboard" element={
                        <Home 
                            darkMode = {darkMode}
                            userData = {userData}
                            login = {login}
                            toggleLogin={toggleLogin}
                            title= "Dashboard"
                        />}
                    />
                    <Route path="users" element={
                        <Home 
                            darkMode = {darkMode}
                            userData = {userData}
                            toggleLogin={toggleLogin}
                            login = {login}
                            title= "Users"
                        />}
                    />
                    <Route path="account" element={
                        <Home 
                            darkMode = {darkMode}
                            userData = {userData}
                            login = {login}
                            toggleLogin={toggleLogin}
                            title= "Account"
                            updateUserData= {updateUserData}
                        />}
                    />
                </Route>
                <Route path="/login" element={
                    
                    <Login 
                        darkMode = {darkMode}
                        toggleLogin={toggleLogin}
                        title= "Login"
                        />
                }>
                </Route>
                <Route path="/logout" element={
                    <Logout 
                        darkMode = {darkMode}
                        toggleLogin={toggleLogin}
                    />}>
                </Route>
                <Route path="/register" element={
                    <Register 
                        darkMode = {darkMode}
                        toggleLogin={toggleLogin}
                        title= "Register"
                    />}>  
                </Route>
                <Route path="projects" element={
                    <Projects darkMode = {darkMode}/>}>
                </Route>
                <Route path="projects/infinitycards" element={
                        <InfinityCards 
                            darkMode = {darkMode}
                            userData = {userData}
                            login = {login}
                            title= "Infinity Cards"
                        />
                    }>
                </Route>
                <Route path="projects/blog" element={
                    <Blog  darkMode = {darkMode}/>}>
                </Route>
                <Route path="projects/webScrap" element={
                    <WebScrap title="Webscrap" darkMode = {darkMode}/>}>
                </Route>
                <Route path="projects/priceTracker" element={
                    <PriceTracker 
                        title="Price tracker" 
                        darkMode = {darkMode}
                        login = {login}
                        toggleLogin={toggleLogin}
                        userData = {userData}
                    />
                }>
                </Route>
                <Route path="/features" element={
                    <Features title="Features" darkMode = {darkMode}/>}>
                </Route>
                <Route path="/blog">
                    <Route path="" element={<Blog title="Blog" darkMode = {darkMode}/>}/>
                    <Route path=":id" element={<Blog title="Blog" darkMode = {darkMode}/>}/>
                </Route>
                <Route path="/about" element={
                    <About title="About" darkMode = {darkMode}/>}>
                </Route>
                <Route path="/*" element={
                    <NotFound darkMode = {darkMode}/>}>
                </Route>
                
            </Routes>
            <Footer darkMode = {darkMode} />
            </div>
            </ThemeProvider>
            </SnackbarProvider>
        </BrowserRouter>
    )
}