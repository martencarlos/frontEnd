
import "./sectionHeader.css";

import Typography from '@mui/material/Typography';

export default function HeroRight(props){
    console.log("Rendering section Header component")
    return (
        <div className= {`sectionHeader ${props.darkMode ? "dark": ""}`}>
           <Typography variant="h3" className="title">{props.title}</Typography>
           <Typography variant="body1" className="text">{props.text}</Typography>
        </div>
    )
}
