
import "./main.css";

import Hero from "../../../Components/Hero/Hero";
import Projects from "../Projects/Projects";
import About from "../../../Routes/Public/About/About";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Card from "../../../Components/Card/Card";

import {  landingHero } from "../../../data/main_data"

import { featuresSection, featureCard1, featureCard2, featureCard3,} from "../../../data/features_data"

export default function Main(props){
    console.log("Rendering Main")
    return (
        <div className= {`main ${props.darkMode ? "dark": ""}`}>
            
            <div className="landingPage">
                <Hero
                    darkMode = {props.darkMode}
                    direction= "right"
                    imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2FWebframe%20-%20feature%20image.png?alt=media&token=b58eb17b-3052-4017-8f18-5f5cb3cab316"
                    title = {landingHero.title}
                    text = {landingHero.text}
                    link={false}
                />
            </div>

            <Projects
                darkMode = {props.darkMode}
            />

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

            <div className="link">
                <a href= "/features">All features</a>
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