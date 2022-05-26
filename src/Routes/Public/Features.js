
import "../../css/features.css";

export default function Features(props){
    console.log("Rendering Features")
    return (
        <div className={props.darkMode ? "dark" : ""}>
            
           Features page
        </div>

        
    )
}