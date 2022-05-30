
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
            _id: ""
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
            setUserData(JSON.parse(getCookie("me")))
            document.getElementById("profilePic").src=localStorage.getItem("profilePic")
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
            
            
            console.log(URL.createObjectURL(file));

            //to send encoded info
            var form_data = new FormData();
            form_data.append("profile_image",file);
            
            //Upload the file
            axios.post('http://www.localhost/setImageProfile',form_data,{
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
                // const imgSrc = URL.createObjectURL(file) //blob
                // document.getElementById("profilePic").src=imgSrc;
                // document.getElementById("navProfilePic").src=imgSrc;
                console.log("finally")
                retrieveProfilePicture()
              })
              .catch(function (error) {
                console.log(error);
              });
        }

    input.click();
    }

    function retrieveProfilePicture(){
        
        // if(localStorage.getItem("profilePic")){
        //     document.getElementById("profilePic").src=localStorage.getItem("profilePic")
        // }else{
            console.log("retrieving pic")
        const config = {
            url: 'http://www.localhost/getProfileImage',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: getCookie("me"),
            withCredentials: true, // Now this is was the missing piece in the client side 
        };
        axios(config).then(function (response) {
            console.log(response.data)
            document.getElementById("profilePic").src=response.data
            document.getElementById("navProfilePic").src=response.data;
            localStorage.setItem("profilePic", response.data)
        })
        .catch(function (error) {
        console.log(error);
        });
        // }
    }

    return (
        props.login &&
        <div className= {`home ${props.darkMode ? "dark": ""}`}>
            <div className={`sidebar ${props.darkMode ? "dark": ""}`}>
            <div  className="wrap-img">
                <img id="profilePic" className="sidebar-profilepicture" src={ProfilePicture} alt="profile pic" />
                {!uploadProgress && <div className="wrap-text" onClick={changePicture}>change image</div>}
                {uploadProgress && <div className="upload-progress" >{uploadProgress+'%'}</div>}
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