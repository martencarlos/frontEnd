
import "../../css/projects.css";

import { useNavigate } from 'react-router-dom';

import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import Hero from "../../Components/Hero/Hero";

import { sectionHeader, infinityCards, blogIntegration } from "../../data/projects"

export default function Projects(props){
    console.log("Rendering Projects")
    const navigate = useNavigate();
    return (

        <div className={props.darkMode ? "dark" : ""}>
           <SectionHeader 
                darkMode = {props.darkMode}
                title = {sectionHeader.title}
                text = {sectionHeader.text}
            />

            <br></br>
            <br></br>

           <Hero
                darkMode = {props.darkMode}
                direction= "right"
                imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2FInfinity%20Cards%20-%20feature%20image.png?alt=media&token=6c9627ab-d9a7-4d9a-9332-f0e3667eb7e9"
                title = {infinityCards.title}
                text = {infinityCards.text}
                link={true}
                linkPath = "/projects/infinitycards"
                linkText = {infinityCards.linkText}
            />
            
            <br></br>
            <br></br>
        
            <Hero
                darkMode = {props.darkMode}
                direction= "left"
                imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2Fblog%20Integration%20-%20feature%20image.png?alt=media&token=f66b2a94-627b-4f21-bf9f-d3a529fc6ee3"
                title = {blogIntegration.title}
                text = {blogIntegration.text}
                link={true}
                linkText = {blogIntegration.linkText}
            />
        </div>

        
    )
}