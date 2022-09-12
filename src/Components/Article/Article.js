
import { useEffect } from "react";
import "./article.css";


export default function Article(props){
    console.log("Rendering Article")
    
    console.log();
    return (
        props.item.published && 
            <div className="article">
                <div  className="title">  {props.item.title}  </div>
                <div  className="published"> {props.item.published.substring(0,16)}</div> 
                <div className={`post ${props.darkMode ? "dark": ""}`} dangerouslySetInnerHTML={{__html: props.item.content.substring(0, props.item.content.length - 133)}} />
            </div>
    )
}
