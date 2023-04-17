

import "./timelinePost.css";

import Typography from '@mui/material/Typography';

export default function ArticleSummary(props){
    console.log("Rendering ArticleSummary")
    
    
    if(props.item.summary.length > 120){
        props.item.summary = props.item.summary.substring(0,120)+ " …";

    }

    return (
        <div className="timelinePost">
            {props.selected ? 
                <div id={props.item.id} className="container right right_selected" onClick={props.openArticle}>
                    <div class="content selected" >
                    
                        <Typography  className="published" variant="h6" > {props.item.published.substring(5,16)}</Typography> 
                        <Typography className="title" variant="body2" >  {props.item.title} </Typography>
                        {/* <img alt="img" src= {props.item.imageUrl} className="summaryImage"></img> */}
                        {/* <Typography className="summary" variant="body2" > {props.item.summary}</Typography> */}
                    </div>
                </div>
            :
                <div id={props.item.id} className="container right" onClick={props.openArticle}>
                    <div class="content">
                        <Typography  className="published" variant="h6" > {props.item.published.substring(5,16)}</Typography> 
                        <Typography className="title" variant="body2" >  {props.item.title} </Typography>
                        {/* <img alt="img" src= {props.item.imageUrl} className="summaryImage"></img> */}
                        {/* <Typography className="summary" variant="body2" > {props.item.summary}</Typography> */}
                    </div>
                </div>
            }
                {/* <img alt="img" src= {props.item.imageUrl} className="summaryImage"></img>
                
                <div className="textArea">
                    <Typography className="title" variant="body1" >  {props.item.title} </Typography>
                    <Typography className="summary" variant="body2" > {props.item.summary}</Typography>
                    <Typography  className="published" > {props.item.published.substring(0,16)}</Typography> 
                    
                </div> */}
            
        </div>
    )
}

