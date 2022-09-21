
import "./blog.css";

import Summary from "../../../Components/ArticleSummary/ArticleSummary";
import Article from "../../../Components/Article/Article";
import {useNavigate,useParams} from "react-router-dom";

import { useState,useEffect} from "react"
import * as rssParser from 'react-native-parser-rss';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';


export default function Blog(props){
    console.log("Rendering Blog")

    const {id} = useParams();
    const navigate=useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [posts, setPosts] = useState([])
    const [mainArticle, setMainArticle] = useState({})
    const [loading, setLoading] = useState(true)

    const [numberOfArticles, setNumerOfArticles] = useState(5);
    const loadMoreImages = () => {
        if(posts.length >= (numberOfArticles+2))
            setNumerOfArticles(numberOfArticles + 2)
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
                    if(id && !feed.items.find(x=>x.id === "https://medium.com/p/"+id)){
                        navigate("/404", { replace: true });
                    }else{
                        setPosts(feed.items);
                        setMainArticle(feed.items[0])
                        
                    }
                }).catch(function(error) {
                    const variant = 'error'
                    enqueueSnackbar(error.message,{ variant });
                    
                }).finally(function(){
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

    useEffect(() => {
        if (!id && mainArticle.id){
            navigate("/blog/"+(mainArticle.id).substring(21), { replace: true });
        }
    })
    
    //open article by using event.currentTarget id
    function openArticle(e){
        
        setMainArticle(posts.find(x => x.id === e.currentTarget.id))
        scrollToTop()
        navigate("/blog/"+(e.currentTarget.id).substring(21))
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
                    
                    {id && 
                        <div  className="blog-mainArticle">
                            <Article
                                darkMode = {props.darkmode}
                                item = {posts.find(x => x.id === "https://medium.com/p/"+id)}
                                scrollToTop = {scrollToTop}
                            />
                        </div>
                    }
                    {id && 
                    <div  className="blog-posts" >
                        <br></br>
                        <Typography variant="h6" gutterBottom className="blog-posts-title"> Latest updates</Typography>
                        <br></br>
                        {posts.slice(0, numberOfArticles).map((post, i) => (
                            (("https://medium.com/p/"+id) !== post.id) &&
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
                    }
                </div>
            )
        }</div>

    )
}
