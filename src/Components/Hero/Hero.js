
import "./hero.css";


import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Hero(props){
    console.log("Rendering Hero component")
    return (
        <div className= {`hero ${props.darkMode ? "dark": ""}`}>
            {props.direction === "right" && 
            <img loading="lazy" src= {props.imgSrc} alt="Hero"></img>
            }
            <div className="text-area">
                <Typography variant="h4" className="title">{props.title}</Typography>
                <Typography variant="body1"  className="text">{props.text}</Typography>
                {props.link &&
                <Link href={props.linkPath} className="link" underline="always">{props.linkText}</Link>
                }
            </div>
            {props.direction === "left" && <img src= {props.imgSrc} alt=""></img>
            }
        </div>
    )
}


