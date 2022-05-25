
import "../css/blog.css";

export default function Blog(props){
    console.log("Rendering Blog")
    return (
        <div className={props.darkMode ? "dark" : ""}>
            
           Blog page
        </div>

        
    )
}