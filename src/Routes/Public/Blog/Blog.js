
import "./blog.css";
import Summary from "../../../Components/ArticleSummary/ArticleSummary";
import Article from "../../../Components/Article/Article";

import { useState,useEffect, useRef} from "react"

import * as rssParser from 'react-native-parser-rss';

export default function Blog(props){
    console.log("Rendering Blog")
    
    const [posts, setPosts] = useState([])
    const [mainArticle, setMainArticle] = useState({})

    //Load articles from Medium
    useEffect(() => {
        console.log("Blog useEffect - load articles from medium")
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
                  setPosts(feed.items);
                  setMainArticle(feed.items[0])
                });
        }
        getData()
    }, [])

    useEffect(() => {
        if (posts.length !== 0){
            console.log(posts)
        }
    }, [posts])
    
    //open article by using event.currentTarget id
    function openArticle(e){
        console.log(posts.find(x => x.id === e.currentTarget.id))
        setMainArticle(posts.find(x => x.id === e.currentTarget.id))
    }

    return (
        <div className={`blog ${props.darkMode ? "dark": ""}`}>
            
            {mainArticle && 
            <div  className="blog-mainArticle">
                <Article
                        darkMode = {props.darkmode}
                        item = {mainArticle}
                    />
            </div>}
            
            <div  className="blog-posts" >
                <br></br>
                <div className="blog-posts-title"> Latest updates</div>
                <br></br>
                {posts.map((post, i) => (
                    <div>
                        <Summary
                        key = {i}
                        darkMode = {props.darkmode}
                        item = {post}
                        openArticle = {openArticle}
                        />
                        <div className="separator"></div>
                    </div>
                ))}

                
            </div>

        </div>
    )
}