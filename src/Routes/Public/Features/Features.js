
import "./features.css";

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";

import { featuresSection } from "../../../data/features_data"

export default function Features(props){
    console.log("Rendering Features")
    return (
        <div className= {`features ${props.darkMode ? "dark": ""}`}>
           <SectionHeader 
                darkMode = {props.darkMode}
                title = {featuresSection.title}
                text = {featuresSection.text}
            />
        </div>
    )
}