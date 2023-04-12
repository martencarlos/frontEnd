
import "./landingPage.css";

import { useEffect,useRef} from "react"

import Hero from "../../../Components/Hero/Hero";
import Projects from "../Projects/Projects";
import About from "../About/About";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Card from "../../../Components/Card/Card";

import Link from '@mui/material/Link';


import {  landingHero } from "../../../data/main_data"
import { featuresSection, featureCard1, featureCard2, featureCard3,} from "../../../data/features_data"


export default function Main(props){
    console.log("Rendering Main")

    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])

    

    return (
        <div className= {`main ${props.darkMode ? "dark": ""}`}>
            
            <div className="landingPage">
                <Hero
                    darkMode = {props.darkMode}
                    direction= "right"
                    imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2FWebframe%20-%20feature%20image.webp?alt=media&token=6fcf2363-875f-4fb6-8915-fa352a2c11c5"
                    title = {landingHero.title}
                    text = {landingHero.text}
                    link={false}
                    button={true}
                />
                
                {/* <div className="background"></div> */}
            </div>

            <Projects className= "projects"
                darkMode = {props.darkMode}
            />

            <div className= "main-features">

                <SectionHeader 
                    darkMode = {props.darkMode}
                    title = "Features"
                    text = {featuresSection.text}
                />

                <div className="features-row">
                    <Card 
                        darkMode = {props.darkMode}
                        imgType="icon"
                        icon = {featureCard1.icon}
                        title = {featureCard1.title}
                        text = {featureCard1.text}
                    />
                    <Card 
                        darkMode = {props.darkMode}
                        imgType="icon"
                        icon = {featureCard2.icon}
                        title = {featureCard2.title}
                        text = {featureCard2.text}
                    />
                    <Card 
                        darkMode = {props.darkMode}
                        imgType="icon"
                        icon = {featureCard3.icon}
                        title = {featureCard3.title}
                        text = {featureCard3.text}
                    />
                </div>
            </div>

            <div className="link">
                <Link href="/features" underline="always">All features</Link>
            </div>

            <br></br>
            <br></br>

            <About
                darkMode = {props.darkMode}
            />

            <br></br>
            <br></br>
            
        </div>
    )
}