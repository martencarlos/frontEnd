

import "./articleSummary.css";

import Typography from '@mui/material/Typography';

export default function ArticleSummary(props){
    console.log("Rendering ArticleSummary")
    
    
    if(props.item.summary.length > 120){
        props.item.summary = props.item.summary.substring(0,120)+ " …";

    }

    return (
        <div id={props.item.id}  className="summaryCard" onClick={props.openArticle}>
            
            <img alt="img" src= {props.item.imageUrl} className="summaryImage"></img>
            
            <div className="textArea">
                <Typography className="title" variant="body1" >  {props.item.title} </Typography>
                <Typography  className="published" > {props.item.published.substring(0,16)}</Typography> 
                <Typography className="summary" variant="body2" > {props.item.summary}</Typography>
            </div>
        </div>
    )
}

