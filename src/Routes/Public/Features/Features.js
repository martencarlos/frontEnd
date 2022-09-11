
import "./features.css";

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Card from "../../../Components/Card/Card";

import { featuresSection, featureCard1, featureCard2, featureCard3 } from "../../../data/features_data"

export default function Features(props){
    console.log("Rendering Features")
    return (
        <div className= {`features ${props.darkMode ? "dark": ""}`}>
           
           <SectionHeader 
                darkMode = {props.darkMode}
                title = {featuresSection.title}
                text = {featuresSection.text}
            />

            <div className="features-row">
                <Card 
                    darkMode = {props.darkMode}
                    icon = {featureCard1.icon}
                    title = {featureCard1.title}
                    text = {featureCard1.text}
                />
                <Card 
                    darkMode = {props.darkMode}
                    icon = {featureCard2.icon}
                    title = {featureCard2.title}
                    text = {featureCard2.text}
                />
                <Card 
                    darkMode = {props.darkMode}
                    icon = {featureCard3.icon}
                    title = {featureCard3.title}
                    text = {featureCard3.text}
                />
            </div>

        </div>
    )
}
