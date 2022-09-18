
import "./blog.css";

import Summary from "../../../Components/ArticleSummary/ArticleSummary";
import Article from "../../../Components/Article/Article";
import CircularProgress from '@mui/material/CircularProgress';

import { useState,useEffect} from "react"
import * as rssParser from 'react-native-parser-rss';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function Blog(props){
    console.log("Rendering Blog")
    
    const [posts, setPosts] = useState([])
    const [mainArticle, setMainArticle] = useState({})
    const [loading, setLoading] = useState(true)

    const [numberOfArticles, setNumerOfArticles] = useState(3);
    const loadMoreImages = () => {
        if(posts.length >= (numberOfArticles+3))
            setNumerOfArticles(numberOfArticles + 3)
        else if(posts.length > numberOfArticles){
            setNumerOfArticles(posts.length)
        }
      };
    

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
                  setLoading(false)
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
        <div className="blog-root">{
            loading ? (
                <CircularProgress size="5rem" className="loading-circle" />

            ) : (
        
                <div className={`blog ${props.darkMode ? "dark": ""}`}>
                    {mainArticle && 
                        <div  className="blog-mainArticle">
                            <Article
                                    darkMode = {props.darkmode}
                                    item = {mainArticle}
                                    scrollToTop = {scrollToTop}
                                    
                                />
                        </div>
                    }

                    <div  className="blog-posts" >
                        <br></br>
                        <Typography variant="h6" gutterBottom className="blog-posts-title"> Latest updates</Typography>
                        <br></br>
                        {posts.slice(0, numberOfArticles).map((post, i) => (
                            <div key = {i}>
                                <Summary
                                    darkMode = {props.darkmode}
                                    item = {post}
                                    openArticle = {openArticle}
                                    />
                                
                                <div className="separator"></div>

                            </div>
                        ))}
                        {numberOfArticles<posts.length && <Button variant="outlined" onClick={loadMoreImages}>Load more</Button>
                        }
                    </div>
                </div>
            )
        }</div>

    )
}
