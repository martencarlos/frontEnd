
import "./about.css";

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Card from "../../../Components/Card/Card";

import { aboutSection,teamMember1, teamMember2, teamMember3 } from "../../../data/about_data"

export default function About(props){

    console.log("Rendering About")

    return (

        <div className= {`about ${props.darkMode ? "dark": ""}`}>
            
           <SectionHeader 
                darkMode = {props.darkMode}
                title = {aboutSection.title}
                text = {aboutSection.text}
            />

            <div className="team-row">
                <Card 
                    darkMode = {props.darkMode}
                    imgType = "image"
                    imgSrc = {teamMember1.imgSrc}
                    title = {teamMember1.name}
                    text = {teamMember1.postion}
                />
                <Card 
                    darkMode = {props.darkMode}
                    imgType = "image"
                    imgSrc = {teamMember2.imgSrc}
                    title = {teamMember2.name}
                    text = {teamMember2.postion}
                />
                <Card 
                    darkMode = {props.darkMode}
                    imgType = "image"
                    imgSrc = {teamMember3.imgSrc}
                    title = {teamMember3.name}
                    text = {teamMember3.postion}
                />
            </div>
            
        </div>
    )
}