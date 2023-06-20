
import "./landingPage.css";

import { useEffect} from "react"

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
                    imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframe-one.appspot.com/o/Webframe%20-%20feature%20image.webp?alt=media&token=ec682f5f-bf43-459e-8655-131882101a2c"
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
                <br></br>
                <br></br>
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
                <br></br>
            </div>

            <div className="link">
                <Link href="/features" underline="always">All features</Link>
            </div>

            <br></br>
            <br></br>
            <div className= "landingPage-about">
                <About 
                    darkMode = {props.darkMode}
                />
            </div>
            <br></br>
            <br></br>
            
        </div>
    )
}