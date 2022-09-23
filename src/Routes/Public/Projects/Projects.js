
import "./projects.css";

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Hero from "../../../Components/Hero/Hero";


import { sectionHeader, infinityCards, blogIntegration } from "../../../data/projects_data"

export default function Projects(props){
    console.log("Rendering Projects")
  
    return (

        <div className= {`projects ${props.darkMode ? "dark": ""}`}>
           <SectionHeader 
                darkMode = {props.darkMode}
                title = {sectionHeader.title}
                text = {sectionHeader.text}
            />

            <br></br>
            <br></br>
            
            <div className= "infinityCards">
                <Hero
                        darkMode = {props.darkMode}
                        direction= "right"
                        imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2FInfinity%20Cards%20-%20feature%20image.webp?alt=media&token=2d0fb718-e579-4961-af38-c439b6607d5d"
                        title = {infinityCards.title}
                        text = {infinityCards.text}
                        link={true}
                        linkPath = "/projects/infinitycards"
                        linkText = {infinityCards.linkText}
                    />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        
            <div className= "blogIntegration">
                <Hero
                    darkMode = {props.darkMode}
                    direction= "left"
                    imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2FBlog%20-%20feature%20image.webp?alt=media&token=03059140-e6a1-43d5-b7bb-9e4da7177aa2"
                    title = {blogIntegration.title}
                    text = {blogIntegration.text}
                    link={true}
                    linkPath = "/projects/blog"
                    linkText = {blogIntegration.linkText}
                />
            </div>
            <br></br>
            <br></br>

        </div>
    )
}