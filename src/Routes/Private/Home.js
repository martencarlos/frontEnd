
import "../../css/home.css";
import { useNavigate } from 'react-router-dom';
import ProfilePicture from '../../Images/profile.png';

import NewCard from "../../Components/NewCard";
import {getCookie} from "../../Util/Cookie";
import axios from "axios";
import {useState} from "react"
import {useEffect} from "react"

export default function Home(props){
    console.log("Rendering Home")
    const navigate = useNavigate();
    
    const [uploadProgress, setUploadProgress] = useState('')
    

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
            _id: "",
            profile: ProfilePicture
        }
    )

    useEffect(() => {
        if(!props.login){
            navigate("/login")
        }
        // eslint-disable-next-line 
      }, [props.login])

    useEffect(() => {
        if(getCookie("me")){
            const cookieUser = JSON.parse(getCookie("me"))
            if(!localStorage.getItem("profilePic")){
                retrieveProfilePicture()
                localStorage.setItem("firstName", cookieUser.name)
                setUserData(JSON.parse(getCookie("me")))
            }
            // document.getElementById("profilePic").src=localStorage.getItem("profilePic")
            // document.getElementById("username").src=localStorage.getItem("firstName")
            
            setUserData(prevFormData => ({
                ...prevFormData,
                profile: localStorage.getItem("profilePic"),
                name: localStorage.getItem("firstName")
            }))
        }
      }, [])
    
    //cards
    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
    }, [cards])

   
    //Add new card
    function addCard(newCard) {
        
        const config = {
            url: process.env.REACT_APP_SERVER+'/cards',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(newCard),
        };
        axios(config) 
          .then(function (response) {
            
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
            
            //to send encoded info
            var form_data = new FormData();
            form_data.append("profile_image",file);
            
            //Upload the file
            axios.post(process.env.REACT_APP_SERVER+'/setImageProfile',form_data,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'enc-type': 'multipart/form-data',
                },
                onUploadProgress: (event)=>{
                    const totalUploaded = Math.floor((event.loaded / event.total) * 100)
                    setUploadProgress(totalUploaded)
                },
                withCredentials: true, 
                }) 
              .then(function (response) {
                setUploadProgress('')
                
              }).finally(function(response){
                retrieveProfilePicture()
              })
              .catch(function (error) {
                console.log(error);
              });
        }

    input.click();
    }

    function retrieveProfilePicture(){
        console.log("retrieving pic")
        const config = {
            url: process.env.REACT_APP_SERVER+'/getProfileImage',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: getCookie("me"),
            withCredentials: true, // Now this is was the missing piece in the client side 
        };
        axios(config).then(function (response) {
            console.log("setting pic storage:"+response.data)
            document.getElementById("profilePic").src=response.data
            document.getElementById("navProfilePic").src=response.data;
            localStorage.setItem("profilePic", response.data)
            setUserData(JSON.parse(getCookie("me")))
            setUserData(prevFormData => ({
                ...prevFormData,
                profile: response.data
            }))
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    return (
        props.login &&
        <div className= {`home ${props.darkMode ? "dark": ""}`}>
            <div className={`sidebar ${props.darkMode ? "dark": ""}`}>
            <div  className="wrap-img">
                <img id="profilePic" className="sidebar-profilepicture" src={userData.profile} alt="profile pic" />
                {!uploadProgress && <div className="wrap-text" onClick={changePicture}>change image</div>}
                {uploadProgress && <div className="upload-progress" >{uploadProgress+'%'}</div>}
            </div>
                
                <div id="username" className="sidebar-username">
                    {userData.name} 
                </div>
                
            </div>
            <div className="home-main">
            {localStorage.getItem("profilePic") && 
                <NewCard 
                    darkMode = {props.darkMode}
                    handleClick = {addCard}
                    userData ={userData}
                />}
            </div>
        </div>
    )
}