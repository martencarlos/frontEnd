
import "../../css/home.css";
import { useNavigate } from 'react-router-dom';
import ProfilePicture from '../../Images/profile.png';

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
        // eslint-disable-next-line 
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

    function changePicture(){
        
        var input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => { 
            // getting a hold of the file reference
            var file = e.target.files[0]; 
            // setting up the reader
            var reader = new FileReader();
            reader.readAsDataURL(file); // this is reading as data url

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
                var image = readerEvent.target.result; // this is the content!
                
                
                document.getElementById("profilePic").src=image
            }
        }

input.click();
    }

    return (
        props.login &&
        <div className= {`home ${props.darkMode ? "dark": ""}`}>
            <div className={`sidebar ${props.darkMode ? "dark": ""}`}>
            <div className="wrap-img">
                <img id="profilePic" className="sidebar-profilepicture" src={ProfilePicture} alt="profile pic" />
                <div className="wrap-text" onClick={changePicture}>change image</div>
            </div>
                
                <div className="sidebar-username">
                    {userData.name} 
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