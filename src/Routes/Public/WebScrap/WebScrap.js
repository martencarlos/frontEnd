
import "./webScrap.css";

import {useState, useEffect} from "react"
import axios from "axios"

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Product from "../../../Components/Product/Product";

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import EuroSymbolSharpIcon from '@mui/icons-material/EuroSymbolSharp';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';


export default function WebScrap(props){

    console.log("Rendering webScrap")

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([{}])
    const [avgPrice, setAvgPrice] = useState(0)
    const [query, setQuery] = useState("");

    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])
    
    useEffect(() => {
        
        const fetchData = async () => {
          await axios.get(`${process.env.REACT_APP_SERVER}/laptops?q=${query}`)
            .then(function (res) {
          
                //Clean data
                let cleanData = res.data
                cleanData= cleanData.filter(emptyValues)
                function emptyValues(value){
                    return value.price.length !==0 && value.title.length !==0
                }

                setData(cleanData)

                // Calculate the average price
                let numberOfProductsWithPrices=0;
                setAvgPrice(((cleanData.reduce(calcAvg,0))/numberOfProductsWithPrices).toFixed(2))
                function calcAvg(total, value) {
                    numberOfProductsWithPrices=numberOfProductsWithPrices+1
                    return total + parseInt(value.price);
                }

                setLoading(false)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
            })
            .finally(function (response) {});
          
        };

        if (query.length === 0 || query.length > 1) fetchData();

      }, [query]);

            
    
    return (
        <div className= {`webScrap ${props.darkMode ? "dark": ""}`}>
            
           <SectionHeader 
                darkMode = {props.darkMode}
                title = "Webscrap"
                text = {`To get the list of the most sold laptops on Amazon.es at the time the page is loaded, you can use web scraping techniques to extract the necessary data from the webpage. This involves using a web scraping tool or library to automatically navigate to the webpage and extract the relevant information.

                Once you have obtained the webpage data, you can search for the relevant sections and extract the data on the most sold laptops, such as the laptop models, their prices, and their current sales ranking. You can then store this data in a data structure such as an array or object for further use.`}
            />
            
            <br></br>
            <br></br>
            
            <div className="filter-row">
                <div className="filter-full">
                    <Typography className="filter-label" variant="h5" gutterBottom> Filter: </Typography>
                    <TextField id="search" label="search" variant="standard" onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                </div>
                <Typography variant="h5" gutterBottom>{"Average price: "} 
                    <Chip icon={<EuroSymbolSharpIcon />} color="primary" variant="filled" label={avgPrice} />
                </Typography>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            {!loading ? data.length!==0 ? 

                <div className="table"> 
                    {<Product data={data} />}
                </div>
                
                :
                
                <div>No items found</div>

            :
                <div className="webScrap-loading">
                    <CircularProgress size="3rem"  />
                </div>}
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    )
}