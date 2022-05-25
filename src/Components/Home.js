
import "../css/home.css";
import { useLocation } from 'react-router-dom';

import NewCard from "./NewCard";
import UploadImage from "./UploadImage";
import {getCookie} from "./Cookie";
import axios from "axios";
import {useState} from "react"
import {useEffect} from "react"

export default function Home(props){
    console.log("Rendering Home")
    
    const location = useLocation();

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
            console.log("cookie me exists")
            setUserData(JSON.parse(getCookie("me")))
        }
        // if(location.state){
        //     console.log("cookie me does not exist")
        //     setUserData(JSON.parse(getCookie("me")))
        // }
        
      }, [])
    
      useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
        console.log("Set local storage if cards array is changed")
    }, [cards])

   
    
    //Add new card
    function addCard(newCard) {
        console.log("Added new card");
        console.log(newCard)

        
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
        <div className={props.darkMode ? "dark" : ""}>
        
            hello {userData.name}
            <UploadImage />
            <NewCard 
                darkMode = {props.darkMode}
                handleClick = {addCard}
            />
        </div>

        
    )
}