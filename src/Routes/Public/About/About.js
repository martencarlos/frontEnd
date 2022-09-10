
import "./about.css";

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";

import { aboutSection } from "../../../data/about_data"

export default function About(props){
    console.log("Rendering About")
    return (
        <div className= {`about ${props.darkMode ? "dark": ""}`}>
           <SectionHeader 
                darkMode = {props.darkMode}
                title = {aboutSection.title}
                text = {aboutSection.text}
            />
        </div>

        
    )
}