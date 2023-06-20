import React, { useState,useEffect } from "react";

import {BrowserRouter,Routes,Route,} from "react-router-dom";
import {getCookie} from "./Util/Cookie"; //, setCookie, delCookie
import axios from "axios";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Routes/Private/Home/Home";
import LandingPage from "./Routes/Public/LandingPage/LandingPage";
import Login from "./Routes/Public/Login/Login";
import Logout from "./Routes/Private/Logout";
import Register from "./Routes/Public/Register/Register";
import Projects from "./Routes/Public/Projects/Projects";
import InfinityCards from "./Routes/Public/InfinityCards/InfinityCards";
import Features from "./Routes/Public/Features/Features";
import PrivacyPolicy from "./Routes/Public/PrivacyPolicy/PrivacyPolicy"
import WebScrap from "./Routes/Public/WebScrap/WebScrap";
import Blog from "./Routes/Public/Blog/Blog";
import About from "./Routes/Public/About/About";
import NotFound from "./Routes/Public/NotFound/NotFound";
import Footer from "./Components/Footer/Footer";



import { SnackbarProvider } from 'notistack';

import "./css/theme.css";
import {ThemeProvider, createTheme } from '@mui/material/styles';
// import { dark } from "@mui/material/styles/createPalette";
import PriceTracker from "./Routes/Private/PriceTracker/PriceTracker";
import OpenAi from "./Routes/Private/OpenAi/OpenAi";

import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

i18next.init({
    interpolation: { escapeValue: false },         // React already does escaping
    lng: localStorage.getItem("language") || "en", // language to use
    resources: {
        en: {
            global: global_en                      // 'common' is our custom namespace
        },
        es: {
            global: global_es
        }
    }
});

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
        ()=>getCookie("uid") ? true : false
    )
    
    function toggleLogin() {
        setLogin(prevMode => !prevMode)
    }

    function updateUserData(newUserData) {
        localStorage.setItem("user",JSON.stringify(newUserData))
        setUserData(newUserData)
    }

    // User information (including profile picture url link)
    const [userData, setUserData] = useState({})

    //Set user data after login
    useEffect(() => {
        // console.log("App useEffect - login")
        // console.log("*******************************")
        // console.log("USERDATA:")
        // console.log(userData)
        //after logout clear userData
        if(userData.profilePic){
            setUserData({})
        }

        if(localStorage.getItem("user")){
            var userInfo = JSON.parse(localStorage.getItem("user"))
            setUserData(userInfo)
            // console.log("LOCAL STORAGE PIC:")
            // console.log(localStorage.getItem("profilePic"))
            if(!localStorage.getItem("profilePic")){
                getProfileImageIntoLocalStorage()
            }else{
                setUserData(prevFormData => ({
                    ...prevFormData,
                    profilePic: localStorage.profilePic
                }))
            }
        }
        // console.log("*******************************")
        
    }, [login,userData.profilePic])

    function getProfileImageIntoLocalStorage(){
        console.log("retrieving pic and setting into localstorage")
        const config = {
            url: process.env.REACT_APP_SERVER+'/getProfileImage',
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.SERVER,
            },
            data: JSON.parse(localStorage.getItem("user")),
            withCredentials: true, // Now this is was the missing piece in the client side 
        };
        axios(config).then(function (response) {
            
            // console.log("Actually setting local storage")
            // console.log("##################################")
            // console.log(response.data)
            // console.log("##################################")
            if(response.data){
                localStorage.setItem("profilePic", response.data)
            }else{
                const defaultProfilePic = "https://firebasestorage.googleapis.com/v0/b/webframe-one.appspot.com/o/default.webp?alt=media&token=37f5860c-8e8a-49be-8383-2bb8b7c7d9bf"
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
    const [darkMode, setDarkMode] = useState(
        ()=>{
            //prioritize setting set by the user
            let darkmode = localStorage.getItem("dark-mode") ? JSON.parse(localStorage.getItem("dark-mode")) : false;
            
            //if user has not setup darkmode, check system preferences
            if (!localStorage.getItem("dark-mode") && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                darkmode = true
            }
            return darkmode
        }
    )

    // darkmode event listener
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if(!localStorage.getItem("dark-mode"))
                setDarkMode(event.matches ? true : false)
        });

        return () => {
            if(window.matchMedia('(prefers-color-scheme: dark)').change)
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change');
        }
    },[])
    
    
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
        <I18nextProvider i18n={i18next}>
        <SnackbarProvider maxSnack={3}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        {/* <React.StrictMode> renders the components twice in dev mode!!!!!!! */}
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
                        login = {login}
                        toggleLogin={toggleLogin}
                        title= "Login"
                        />
                }>
                </Route>
                <Route path="/logout" element={
                    <Logout 
                        darkMode = {darkMode}
                        toggleLogin={toggleLogin}
                        updateUserData= {updateUserData}
                    />}>
                </Route>
                <Route path="/register" element={
                    <Register 
                        darkMode = {darkMode}
                        login = {login}
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
                        updateUserData= {updateUserData}
                        userData = {userData}
                    />}>
                </Route>
                <Route path="projects/openai" element={
                    <OpenAi 
                        title="Open Ai" 
                        darkMode = {darkMode}
                        login = {login}
                        userData = {userData}
                    />}>
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
                <Route path="/PrivacyPolicy" element={
                    <PrivacyPolicy title="Privacy Policy" darkMode = {darkMode}/>}>
                </Route>
                <Route path="/*" element={
                    <NotFound darkMode = {darkMode}/>}>
                </Route>
                
            </Routes>
            <Footer darkMode = {darkMode} />
            </div>
            </ThemeProvider>
            {/* </React.StrictMode> */}
            </GoogleOAuthProvider>
            </SnackbarProvider>
            </I18nextProvider>
        </BrowserRouter>
    )
}