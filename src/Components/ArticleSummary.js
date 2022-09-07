

import "../css/articleSummary.css";


export default function ArticleSummary(props){
    console.log("Rendering ArticleSummary")
    
    
    if(props.item.summary.length > 120){
        props.item.summary = props.item.summary.substring(0,120)+ " …";

    }
        
    

    return (
        <div>
            <div id={props.item.id}  className="summaryCard" onClick={props.openArticle}>
                <img alt="img" src= {props.item.imageUrl} className="summaryImage"></img>
                <div className="textArea">
                    <div  className="title">  {props.item.title}  </div>
                    <div  className="published"> {props.item.published.substring(0,16)}</div> 
                    <div  className="summary"> {props.item.summary}</div>
                </div>
                <div className="separator"></div>
            </div>
        </div>
    )
}