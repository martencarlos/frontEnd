
import "./main.css";

import Hero from "../../../Components/Hero/Hero";
import Projects from "../../../Routes/Public/Projects";
import About from "../../../Routes/Public/About/About";

import {  landingHero } from "../../../data/main_data"

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

            <About
                darkMode = {props.darkMode}
            />
            
        </div>
    )
}