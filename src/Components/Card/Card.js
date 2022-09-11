
import "./card.css";

export default function Card(props){

    console.log("Rendering Card component")

    return (
        <div className= {`card ${props.darkMode ? "dark": ""}`}>
            {/* {props.direction === "right" && <img src= {props.imgSrc} alt=""></img>} */}
            {props.imgType === "icon" && <i class={props.icon}></i>}
            {props.imgType === "image" && <img alt="" src={props.imgSrc}></img>}
            <div className="text-area">
                <div className="title">{props.title}</div>
                <div className="text">{props.text}</div>
            </div>
            
        </div>
    )
}

