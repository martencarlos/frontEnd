
import "./hero.css";


import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Hero(props){
    console.log("Rendering Hero component")
    return (
        <div className= {`hero ${props.darkMode ? "dark": ""}`}>
            {props.direction === "right" && 
            <img fetchpriority="high" src= {props.imgSrc} alt="Hero"></img>
            }
            <div className="text-area">
                <Typography variant="h4" className="title">{props.title}</Typography>
                <Typography variant="body1"  className="text">{props.text}</Typography>
                {props.link &&
                <Link href={props.linkPath} className="link" underline="always">{props.linkText}</Link>
                }
                {props.button &&
                <div className="hero-button">
                    <Button href="mailto:martencarlos@gmail.com?subject=Webframe - contact" style={{color: "white"}} color="secondary" variant="contained" endIcon={<SendIcon />}>
                        Get in touch
                    </Button>
                </div>
                }
            </div>
            {props.direction === "left" && <img src= {props.imgSrc} alt=""></img>
            }
        </div>
    )
}


