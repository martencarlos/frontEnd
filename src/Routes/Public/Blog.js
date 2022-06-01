
import "../../css/blog.css";

export default function Blog(props){
    console.log("Rendering Blog")
    return (
        <div style={{textAlign: "center"}} className={props.darkMode ? "dark" : ""}>
            
           Blog page
        </div>

        
    )
}