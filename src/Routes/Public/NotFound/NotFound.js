
import "./notFound.css";

import Typography from '@mui/material/Typography';
import '@fontsource/roboto/900.css';
import { useEffect, useState } from "react";

import Skeleton from '@mui/material/Skeleton';


export default function NotFound(props){

    console.log("Rendering 404")


    const [imgLoading, setImgLoading] = useState(true)
    const [img404Src, setimg404Src] = useState()
    
    const doggySrc= "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2Fdoggy.gif?alt=media&token=b976fefc-ebc2-4837-9aa8-080624a7501d"
    
    useEffect (() => {
        var random = Math.floor(Math.random() * 2);
        if(random===1)
            setimg404Src("https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2F404%20-%20dog.webp?alt=media&token=ea18b5c9-ad4e-4d77-b599-361ffe9c9294");
        else
            setimg404Src("https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2F404%20-%20cat.webp?alt=media&token=7ba21798-95e6-4e76-ac46-2c399eae065f");
        
        setImgLoading(false)
    },[])

  
    return (
        <div className= {`notFound ${props.darkMode ? "dark": ""}`}>
            {imgLoading ?
                <Skeleton sx={{ width:200, height: 250}} animation="wave" variant="rectangular" />
            :
                <img src= {img404Src}  alt="not found"></img>}
            <div className="notFound-textArea">
                <Typography className="notFound-title" variant="h1" gutterBottom>404</Typography>
                <Typography className="notFound-text" variant="h5" gutterBottom>Page Not Found</Typography>
                <img src= {doggySrc} className="doggy"  alt="not found"></img>
            </div>
        </div>
    )
}
