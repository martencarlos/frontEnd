
import "./notFound.css";

import Typography from '@mui/material/Typography';
import '@fontsource/roboto/900.css';
import { useEffect, useState } from "react";




export default function NotFound(props){

    console.log("Rendering 404")

    
    const [img404Src, setimg404Src] = useState()
    const doggySrc= "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2Fdoggy.gif?alt=media&token=b976fefc-ebc2-4837-9aa8-080624a7501d"
    useEffect (() => {
        var random = Math.floor(Math.random() * 2);
        if(random===1)
            setimg404Src("https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2F404%20-%20dog.png?alt=media&token=a048cd6c-9760-4715-81f4-e482ccd76898");
        else
            setimg404Src("https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2F404%20-%20cat.png?alt=media&token=5dfbe803-bdf8-40ea-83a1-99987a9a3e02");

    },[])

    return (
        <div className= {`notFound ${props.darkMode ? "dark": ""}`}>
            
            <img src= {img404Src} alt="not found"></img>
            <div className="notFound-textArea">
                <Typography className="notFound-title" variant="h1" gutterBottom>404</Typography>
                <Typography className="notFound-text" variant="h5" gutterBottom>Page Not Found</Typography>
                <img src= {doggySrc} className="doggy" alt="not found"></img>
            </div>
        </div>
    )
}
