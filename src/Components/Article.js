
import "../css/article.css";


export default function Article(props){
    console.log("Rendering Article")
    
    return (
        props.item.published && <div className="article">
            <div  className="title">  {props.item.title}  </div>
            <div  className="published"> {props.item.published.substring(0,16)}</div> 
            <div className={`post ${props.darkMode ? "dark": ""}`} dangerouslySetInnerHTML={{__html: props.item.content}} />
        </div>
    )
}