
import "./blog.css";
import Summary from "../../../Components/ArticleSummary/ArticleSummary";
import Article from "../../../Components/Article/Article";
import LinearProgress from '@mui/material/LinearProgress';


import { useState,useEffect, useRef} from "react"


import * as rssParser from 'react-native-parser-rss';

import Typography from '@mui/material/Typography';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';

export default function Blog(props){
    console.log("Rendering Blog")
    
    const [posts, setPosts] = useState([])
    const [mainArticle, setMainArticle] = useState({})
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
        scrollToTop()
        
        setMainArticle(posts.find(x => x.id === e.currentTarget.id))
    }

    function scrollToTop(){
        // window.scrollTo(0, 0);
        window.scrollTo({top: 0, behavior: 'smooth'});
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
                <Typography variant="h6" gutterBottom className="blog-posts-title"> Latest updates</Typography>
                <br></br>
                {posts.map((post, i) => (
                    <div key = {i}>
                        
                        <Summary
                            darkMode = {props.darkmode}
                            item = {post}
                            openArticle = {openArticle}
                            />
                        
                        <div className="separator"></div>

                    </div>
                ))}

            </div>
            
            {progress>=50 && 
                <Fab onClick={scrollToTop}
                    color="primary" className="up-floating-icon"
                    aria-label="add">
                    <UpIcon color="primary.light"/>
                </Fab>}

            <LinearProgress className="reading-progress" variant="determinate" value={progress} />
            
            </div>
    )
}