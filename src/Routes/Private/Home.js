
import "../../css/home.css";
import { useNavigate } from 'react-router-dom';

import NewCard from "../../Components/NewCard";
import UploadImage from "../../Components/UploadImage";
import {getCookie} from "../../Util/Cookie";
import axios from "axios";
import {useState} from "react"
import {useEffect} from "react"

export default function Home(props){
    console.log("Rendering Home")
    const navigate = useNavigate();
  
    useEffect(() => {
        if(!props.login){
            navigate("/login")
        }
      }, [props.login])
    
    

    var [cards, setCards] = useState(
        ()=>JSON.parse(localStorage.getItem("cards")) || []
    )
    
    const [userData, setUserData] = useState(
        {
            name: "", 
            username: "",
            email:"",
            password: "",
            __v: 0,
            _id: ""
        }
    )

    useEffect(() => {
        if(getCookie("me")){
            setUserData(JSON.parse(getCookie("me")))
        }
        
      }, [])
    
      useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
    }, [cards])

   
    
    //Add new card
    function addCard(newCard) {
        
        const config = {
            url: 'http://www.localhost/cards',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(newCard),
        };
        axios(config) 
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        setCards(prevCards => {
            return [
                ...prevCards,
                newCard
            ]
        })
    }

    return (
        props.login &&
        <div className= {`home ${props.darkMode ? "dark": ""}`}>
            <div className={`sidebar ${props.darkMode ? "dark": ""}`}>
                <div className="sidebar-username">
                    {userData.name} 
                </div>
                <div className="sidebar-imageUpload">
                    <UploadImage />
                </div>
            </div>
            <div className="home-main">
                <NewCard 
                    darkMode = {props.darkMode}
                    handleClick = {addCard}
                />
            </div>
            
        </div>
    )
}