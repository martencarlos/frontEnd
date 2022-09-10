
import "../../css/projects.css";

import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import HeroRight from "../../Components/HeroRight/HeroRight";

import { sectionHeader, InfinityCards } from "../../data/projects"

export default function Projects(props){
    console.log("Rendering Projects")
        
    return (

        <div className={props.darkMode ? "dark" : ""}>
           <SectionHeader 
                darkMode = {props.darkMode}
                title = {sectionHeader.title}
                text = {sectionHeader.text}
            />
           <HeroRight 
                darkMode = {props.darkMode}
                title = {InfinityCards.title}
                text = {InfinityCards.text}
                link={true}
                linkText = {InfinityCards.linkText}
            />
        </div>

        
    )
}