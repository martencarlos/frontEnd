
import "../../css/blog.css";

import { useEffect} from "react"

import * as rssParser from 'react-native-parser-rss';
 


export default function Blog(props){
    console.log("Rendering Blog")

    useEffect(() => {

        async function getData() {
            await fetch('https://medium.com/@martencarlos/feed',{
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
              })
              .then((response) => response.text())
              .then((responseData) => rssParser.parse(responseData))
              .then((rss) => {
                  console.log(rss.title);
                  console.log(rss.items.length);
                });
        }
        getData()


        
    }, [])
    

    return (
        <div style={{textAlign: "center"}} className={props.darkMode ? "dark" : ""}>
            
           Blog page
        </div>

        
    )
}