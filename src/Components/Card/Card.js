
import "./card.css";


import Typography from '@mui/material/Typography';

export default function Card(props){

    console.log("Rendering Card component")

    return (
        <div className= {`card ${props.darkMode ? "dark": ""}`}>
            {/* {props.direction === "right" && <img src= {props.imgSrc} alt=""></img>} */}
            {props.imgType === "icon" && <i className={'features-icon-color' && props.icon}></i>}
            {props.imgType === "image" && <img alt="" src={props.imgSrc}></img>}
            <div className="text-area">
                <Typography variant="h5" className="title">{props.title}</Typography>
                <Typography variant="body1" className="text">{props.text}</Typography>
            </div>
            
        </div>
    )
}


