
import "./hero.css";

// import { useEffect,useRef} from "react"
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ForwardIcon from '@mui/icons-material/Forward';

import Typed from 'react-typed';

export default function Hero(props){
    console.log("Rendering Hero component")




    return (
        <div className= {`hero ${props.darkMode ? "dark": ""}`}>
            {props.direction === "right" && 
            <img fetchpriority="high" src= {props.imgSrc} alt="Hero"></img>
            }
            <div className="text-area">
                {props.button ?
                    <div className="dynamic-title-wrap">
                    <Typography variant="h5" className="title">{props.title}</Typography>
                    <Typed className="dynamicText"
                            strings={[
                                'Online marketplace',
                                'Digital storefront',
                                'E-commerce',
                                'Web store',
                                'Online business',
                                'Digital commerce']}
                                typeSpeed={40}
                                backSpeed={50}
                                attr="placeholder"
                                loop >
                                <input disabled type="text"/>
                        </Typed>
                  </div>
                :
                <Typography variant="h4" className="title">{props.title}</Typography>
                }
            
                <Typography variant="body1"  className="text">{props.text}</Typography>
        
                {props.link &&
                <div className="hero-button">
                    <Button href={props.linkPath} style={{backgroundColor:"#59887bfc", color: "white"}} variant="contained" endIcon={<ForwardIcon />}>
                        {props.linkText}
                    </Button>
                </div>
                // <Link href={props.linkPath} className="link" underline="always">{props.linkText}</Link>
                }
                {props.button &&
                <div className="hero-button">
                    <Button href="mailto:martencarlos@gmail.com?subject=Webframe - contact" style={{backgroundColor:"#59887bfc", color: "white"}}  variant="contained" endIcon={<SendIcon />}>
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


