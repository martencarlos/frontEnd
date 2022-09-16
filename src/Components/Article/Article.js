
import "./article.css";

import { useState} from "react"

import Typography from '@mui/material/Typography';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import LinearProgress from '@mui/material/LinearProgress';

export default function Article(props){
    console.log("Rendering Article")
    
    const [progress, setProgress] = useState(0);

    //Set percentage scroll progress bar
    document.onscroll = function(){ 
        var pos = getVerticalScrollPercentage(document.body)
        setProgress(Math.round(pos))
    }
    
    function getVerticalScrollPercentage( elm ){
        var p = elm.parentNode
        return (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
    }

    console.log();
    return (
        props.item.published && 
            
            <div className="article">
                
                <Typography className="article-title" variant="h4" gutterBottom>{props.item.title} </Typography>
                <Typography className="published" variant="h5" gutterBottom > {props.item.published.substring(0,16)}</Typography> 
                <Typography variant="body1" gutterBottom className={`post ${props.darkMode ? "dark": ""}`} dangerouslySetInnerHTML={{__html: props.item.content.substring(0, props.item.content.length - 133)}} />
                {progress>=15 && 
                    <Fab onClick={props.scrollToTop}
                        color="secondary" className="up-floating-icon"
                        aria-label="add">
                        <UpIcon />
                    </Fab>
                } 
            
                {progress>=2 && 
                <LinearProgress color='secondary' className="reading-progress" variant="determinate" value={progress}/>
                }
            </div>
    )
}




