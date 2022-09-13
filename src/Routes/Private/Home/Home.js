
import "./home.css";

import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {getCookie} from "../../../Util/Cookie";
import axios from "axios";
import {resizeFile} from "../../../Util/ImageProcessing";


export default function Home(props){

    console.log("Rendering home")
    const navigate = useNavigate();

    // //Add a card functionality
    // import NewCard from "../../../Components/NewCard/NewCard";
    // var [cards, setCards] = useState(
    //     ()=>JSON.parse(localStorage.getItem("cards")) || []
    // )

    // //cards
    // useEffect(() => {
    //     localStorage.setItem("cards", JSON.stringify(cards))
    // }, [cards])
    
       // //Add new card
    // function addCard(newCard) {
        
    //     const config = {
    //         url: process.env.REACT_APP_SERVER+'/cards',
    //         method: 'POST',
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Content-Type': 'application/json',
    //         },
    //         data: JSON.stringify(newCard),
    //     };
    //     axios(config) 
    //     .then(function (response) {
            
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    //     setCards(prevCards => {
    //         return [
    //             ...prevCards,
    //             newCard
    //         ]
    //     })
    // }



    //UserData
    
    const [userData, setUserData] = useState({})

    //Upload progress
    const [uploadProgress, setUploadProgress] = useState('')

    //Login
    useEffect(() => {

        if(!props.login)
            navigate("/login");

        console.log("home useEffect")
        setUserData(props.userData)

        return () => {
            setUserData({})
        }
    }, [props.userData])

    // useEffect(() => {
    //     console.log("home useEffect")
    //     if(!props.login){
    //         navigate("/login");
    //     }else{
    //         if(getCookie("me")){
    //             // var cookieUser = JSON.parse(getCookie("me"));
    //             // if(document.getElementById("navProfilePic").src)
    //             //     cookieUser.profilePic = document.getElementById("navProfilePic").src
    //             // else
    //             // cookieUser.profilePic = localStorage.getItem("profilePic")
    //             // setUserData(cookieUser)
    //         }
    //     }
    //     // eslint-disable-next-line 
    // }, [props.login])

    // useEffect(() => {
        
    // }, [userData])

    //Profile Image functions
    
    function changePicture(){
        var input = document.createElement('input');
        document.body.appendChild(input); //required for iphone
        input.addEventListener('change', updateValue); //required for iphone
        input.type = 'file';
        input.id ="input"
        input.click();
        document.body.removeChild(input) 
    }
    const updateValue = async (e) =>{
        // getting a hold of the file reference
        var file = e.target.files[0];
        var blobImage
        try {
            blobImage = await resizeFile(file,80,80);
        } catch (error) {
            alert("File not supported - please select an image \n" + error)
            const input = document.getElementById("input")
            document.body.removeChild(input)
            return;
        }
        
        //to send encoded info
        var form_data = new FormData();
        form_data.append("profile_image",blobImage);
        
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
            // document.getElementById("profilePic").src=response.data.url
            document.getElementById("navProfilePic").src=response.data.url
            // localStorage.setItem("profilePic", response.data.url)
            // var user = JSON.parse(JSON.stringify(userData));
            // props.updateUserData(user)
            setUserData(prevFormData => ({
                ...prevFormData,
                profilePic: response.data.url
            }))
          }).finally(function(response){
               
          })
          .catch(function (error) {
            // console.log(error);
            
        });
        console.log("removing child")
        
    }

    return (
        props.login && props.userData.profilePic &&
        <div className= {`home ${props.darkMode ? "dark": ""}`}>
           
           {/* Sidebar */}
           <div className={`sidebar ${props.darkMode ? "dark": ""}`}>
                <div className="space"></div>
                <div  className="wrap-img">
                    <img id="profilePic"  className="sidebar-profilepicture" src={userData.profilePic} alt="profile pic" />
                    {!uploadProgress && 
                        <span className="wrap-text" onClick={changePicture}>
                            <i className="bi-pencil-square" role="img" aria-label="name"></i>
                        </span>}
                    {uploadProgress && 
                        <div className="upload-progress">{uploadProgress+'%'}</div>}
                </div>
                <div id="username" className="sidebar-username">
                    {userData.name} 
                </div>
            </div>

            <div className="home-main">
                
                In development
                {/* <div className="home-main-panel">
                    Settings
                </div>  */}
                
                
                
                
                {/* <NewCard 
                    darkMode = {props.darkMode}
                    handleClick = {addCard}
                    userData ={userData}
                /> */}
            </div>

        </div>
    )
}