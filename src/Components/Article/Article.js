
import "./article.css";

import Typography from '@mui/material/Typography';

export default function Article(props){
    console.log("Rendering Article")
    
    console.log();
    return (
        props.item.published && 
            <div className="article">
                {/* <div  className="title">  {props.item.title}  </div> */}
                <Typography variant="h4" gutterBottom>{props.item.title} </Typography>
                <Typography variant="h5" gutterBottom className="published"> {props.item.published.substring(0,16)}</Typography> 
                <Typography variant="body1" gutterBottom className={`post ${props.darkMode ? "dark": ""}`} dangerouslySetInnerHTML={{__html: props.item.content.substring(0, props.item.content.length - 133)}} />
            </div>
    )
}



