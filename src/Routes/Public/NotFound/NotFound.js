
import "./notFound.css";

const image404Url="https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2F404.png?alt=media&token=460e14fb-594c-4a86-b3ad-b695bf126bac";
export default function NotFound(props){

    console.log("Rendering 404")

    return (

        <div className= {`notFound ${props.darkMode ? "dark": ""}`}>
            
            <img src= {image404Url} alt="not found"></img>
            
        </div>
    )
}