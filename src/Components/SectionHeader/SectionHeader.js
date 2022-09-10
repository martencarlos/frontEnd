
import "./sectionHeader.css";

export default function HeroRight(props){
    console.log("Rendering section Header component")
    return (
        <div className= {`sectionHeader ${props.darkMode ? "dark": ""}`}>
           <div className="title">{props.title}</div>
           <div className="text">{props.text}</div>
        </div>
    )
}
