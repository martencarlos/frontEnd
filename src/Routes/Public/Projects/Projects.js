
import "./projects.css";

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Hero from "../../../Components/Hero/Hero";


import { sectionHeader, infinityCards, blogIntegration, priceTracker, webScrap } from "../../../data/projects_data"

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
                        imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframe-one.appspot.com/o/infinity%20cards.png?alt=media&token=b9c851d4-dd51-40df-8fe6-ca5d809c00c1"
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
            <br></br>
            <br></br>
        
            <div className= "blogIntegration">
                <Hero
                    darkMode = {props.darkMode}
                    direction= "left"
                    imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframe-one.appspot.com/o/blog%20integration.png?alt=media&token=94b7a540-6f9a-4ec7-bfdb-ae51f2c458d5"
                    title = {blogIntegration.title}
                    text = {blogIntegration.text}
                    link={true}
                    linkPath = "/projects/blog"
                    linkText = {blogIntegration.linkText}
                />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        
            <div className= "blogIntegration">
                <Hero
                    darkMode = {props.darkMode}
                    direction= "right"
                    imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframe-one.appspot.com/o/webscrap.png?alt=media&token=55e09eab-6734-4503-af52-e675882a5a6d"
                    title = {webScrap.title}
                    text = {webScrap.text}
                    link={true}
                    linkPath = "/projects/webscrap"
                    linkText = {webScrap.linkText}
                />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        
            <div className= "blogIntegration">
                <Hero
                    darkMode = {props.darkMode}
                    direction= "left"
                    imgSrc= "https://firebasestorage.googleapis.com/v0/b/webframe-one.appspot.com/o/Price%20tracker.png?alt=media&token=286a855b-b982-4213-b57d-eaf07212eb38"
                    title = {priceTracker.title}
                    text = {priceTracker.text}
                    link={true}
                    linkPath = "/projects/pricetracker"
                    linkText = {priceTracker.linkText}
                />
            </div>
            <br></br>
            <br></br>
        
        </div>
    )
}