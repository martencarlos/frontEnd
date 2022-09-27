
import "./webScrap.css";

import {useState, useEffect} from "react"
import axios from "axios"

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Hero from "../../../Components/Hero/Hero";

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import EuroSymbolSharpIcon from '@mui/icons-material/EuroSymbolSharp';
import Chip from '@mui/material/Chip';


export default function WebScrap(props){

    console.log("Rendering webScrap")

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([{}])
    const [avgPrice, setAvgPrice] = useState(0)
    

    useEffect(() => {
        const config = {
            url: process.env.REACT_APP_SERVER+'/laptops',
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
            // ,withCredentials: true
            
        };
    
        axios(config)
            .then(function (response) {
            // handle success
            
            //Clean data
            let cleanData = response.data
            cleanData= cleanData.filter(emptyValues)
            function emptyValues(value){
                return value.price.length !==0 && value.title.length !==0
            }
            
            // Calculate the average price
            let numberOfProductsWithPrices=0;
            setAvgPrice(((cleanData.reduce(calcAvg,0))/numberOfProductsWithPrices).toFixed(2))
            function calcAvg(total, value) {
                numberOfProductsWithPrices=numberOfProductsWithPrices+1
                return total + parseInt(value.price);
            }

            setData(cleanData)
            setLoading(false)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
            })
            .then(function (response) {
                
        });
    }, [])

    
    return (
        <div className= {`webScrap ${props.darkMode ? "dark": ""}`}>
            
           <SectionHeader 
                darkMode = {props.darkMode}
                title = "Webscrap"
                text = "Getting the list of most sold laptops in Amazon.es at the time the page is loaded"
            />
            <br></br>
            <br></br>
            <Typography variant="h4" gutterBottom>{"Average price: "} 
                <Chip icon={<EuroSymbolSharpIcon />} color="primary" variant="filled" label={avgPrice} />
            </Typography>
            
            
            <br></br>
            <br></br>

            {!loading ? data && data.map((article, i) => (
                
                <div className="webScrap-product" key = {i}>
                    
                    <br></br>
                    <br></br>
                    <br></br>
               
                    <Hero
                        darkMode = {props.darkMode}
                        direction= {i%2 === 0 ? "left":"right"}
                        imgSrc= {article.imgSrc}
                        title = {"#"+article.pos+" - " + article.price}
                        text = {article.title}
                        link={true}
                        linkPath = {article.url}
                        linkText = "check it out"
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                ))
            :
                <div className="webScrap-loading">
                    <CircularProgress size="3rem"  />
                </div>}

        </div>
    )
}