
import "./card.css";

export default function Card(props){

    console.log("Rendering Card component")

    return (
        <div className= {`card ${props.darkMode ? "dark": ""}`}>
            {/* {props.direction === "right" && <img src= {props.imgSrc} alt=""></img>} */}
            <i class={props.icon}></i>
            <div className="text-area">
                <div className="title">{props.title}</div>
                <div className="text">{props.text}</div>
            </div>
            
        </div>
    )
}

