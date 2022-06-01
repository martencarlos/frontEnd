
import "../../css/about.css";

export default function About(props){
    console.log("Rendering About")
    return (
        <div style={{textAlign: "center"}} className={props.darkMode ? "dark" : ""}>
            
           About page
        </div>

        
    )
}