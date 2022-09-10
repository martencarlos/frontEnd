
import "./hero.css";

export default function Hero(props){
    console.log("Rendering Hero component")
    return (
        <div className= {`hero ${props.darkMode ? "dark": ""}`}>
            {props.direction === "right" && <img src= {props.imgSrc} alt=""></img>
            }
            <div className="text-area">
                <div className="title">{props.title}</div>
                <div className="text">{props.text}</div>
                {props.link && <a href={props.linkPath} className="link">{props.linkText}</a>}
            </div>
            {props.direction === "left" && <img src= {props.imgSrc} alt=""></img>
            }
        </div>
    )
}

