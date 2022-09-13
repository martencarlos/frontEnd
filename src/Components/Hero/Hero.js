
import "./hero.css";


import Typography from '@mui/material/Typography';

export default function Hero(props){
    console.log("Rendering Hero component")
    return (
        <div className= {`hero ${props.darkMode ? "dark": ""}`}>
            {props.direction === "right" && <img src= {props.imgSrc} alt=""></img>
            }
            <div className="text-area">
                <Typography variant="h4" className="title">{props.title}</Typography>
                <Typography variant="body1" gutterBottom className="text">{props.text}</Typography>
                {props.link && <a href={props.linkPath} className="link">{props.linkText}</a>}
            </div>
            {props.direction === "left" && <img src= {props.imgSrc} alt=""></img>
            }
        </div>
    )
}

