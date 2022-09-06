
import "../../css/blog.css";

import { useState,useEffect} from "react"

import * as rssParser from 'react-native-parser-rss';
 


export default function Blog(props){
    console.log("Rendering Blog")

    const [posts, setPosts] = useState([])

    useEffect(() => {

        async function getData() {
            await fetch(process.env.REACT_APP_SERVER+'/medium',{
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
              })
              .then((response) => response.text())
              .then((responseData) => rssParser.parse(responseData))
              .then((feed) => {
                  setPosts(feed.items[0].content);
                  console.log(feed)
                });
        }
        getData()

    }, [])
    

    return (
        <div  className={props.darkMode ? "dark" : ""}>
            <div className="post" dangerouslySetInnerHTML={{__html: posts}} />
            
        </div>

        
    )
}