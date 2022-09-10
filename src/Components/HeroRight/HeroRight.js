
import "./heroRight.css";

export default function HeroRight(props){
    console.log("Rendering Hero Right component")
    return (
        <div className= {`heroRight ${props.darkMode ? "dark": ""}`}>
            <img src= "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2FInfinity%20Cards%20-%20feature%20image.png?alt=media&token=6c9627ab-d9a7-4d9a-9332-f0e3667eb7e9" alt=""></img>
            <div className="text-area">
                <div className="title">{props.title}</div>
                <div className="text">{props.text}</div>
                {props.link && <div className="link">{props.linkText}</div>}
            </div>
        </div>
    )
}

