
import "../../css/home.css";
import { useNavigate } from 'react-router-dom';
// import ProfilePicture from '../../Images/profile.png';
import Resizer from "react-image-file-resizer";

import NewCard from "../../Components/NewCard";
import {getCookie} from "../../Util/Cookie";
import axios from "axios";
import {useState} from "react"
import {useEffect} from "react"

export default function Home(props){
    console.log("Rendering Home")
    const navigate = useNavigate();
    const defaultProfilePic = "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/profiles%2Fdefault.jpeg?alt=media&token=a220a7a4-ab49-4b95-ac02-d024b1ccb5db"
    const [uploadProgress, setUploadProgress] = useState('')
    

    var [cards, setCards] = useState(
        ()=>JSON.parse(localStorage.getItem("cards")) || []
    )
    
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if(!props.login){
            navigate("/login")
        }
        // eslint-disable-next-line 
      }, [props.login])

      useEffect(() => {
        console.log("userdata changed")
        
        // eslint-disable-next-line 
      }, [userData])

    useEffect(() => {
        console.log("homeuseeffect")
        if(getCookie("me")){
            const cookieUser = JSON.parse(getCookie("me"))
            setUserData(cookieUser)
            setUserData(prevFormData => ({
                ...prevFormData,
                profilepic: defaultProfilePic
            }))
            console.log(!localStorage.getItem("profilePic"))
            if(!localStorage.getItem("profilePic")){
                getProfileImageIntoLocalStorage()
            }else{
                document.getElementById("profilePic").src=localStorage.getItem("profilePic")
                document.getElementById("navProfilePic").src=localStorage.getItem("profilePic")
                setUserData(prevFormData => ({
                    ...prevFormData,
                    profilepic: localStorage.getItem("profilePic")
                }))
            }
        
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

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
            file,
            80,
            80,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
            );
        });

    function changePicture(){
        
        var input = document.createElement('input');
        document.body.appendChild(input); //required for iphone
        input.addEventListener('change', updateValue); //required for iphone
        input.type = 'file';
        input.id ="input"
        input.click();
    }

    const dataURIToBlob = (dataURI) => {
        const splitDataURI = dataURI.split(",");
        const byteString =
          splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
        return new Blob([ia], { type: mimeString });
      };
   
    const updateValue = async (e) =>{
        // getting a hold of the file reference
        var file = e.target.files[0];
        const image = await resizeFile(file);
        const newFile = dataURIToBlob(image);
        console.log(file)
        console.log(newFile)
        
        //to send encoded info
        var form_data = new FormData();
        form_data.append("profile_image",newFile);
        
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
            console.log(response.data)
            document.getElementById("profilePic").src=response.data.url
            document.getElementById("navProfilePic").src=response.data.url
            localStorage.setItem("profilePic", response.data.url)
            setUserData(prevFormData => ({
                ...prevFormData,
                profilepic: response.data.url
            }))
          }).finally(function(response){
            const input = document.getElementById("input")
            document.body.removeChild(input)    
            // getProfileImageIntoLocalStorage()
                // getProfileImageIntoLocalStorage()
                // document.getElementById("profilePic").src=response
                // document.getElementById("navProfilePic").src=response
                // localStorage.setItem("profilePic", response)
                // setUserData(prevFormData => ({
                //     ...prevFormData,
                //     profilepic: response
                // }))
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function getProfileImageIntoLocalStorage(){
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
            // console.log("setting pic storage:"+response.data)
            // setUserData(JSON.parse(getCookie("me")))
            
            if(response.data){
                document.getElementById("profilePic").src=response.data
                document.getElementById("navProfilePic").src=response.data;
                localStorage.setItem("profilePic", response.data)
                setUserData(prevFormData => ({
                    ...prevFormData,
                    profilepic: response.data
                }))
            }else{
                localStorage.setItem("profilePic", defaultProfilePic)
                document.getElementById("navProfilePic").src=defaultProfilePic;
            }
        })
        .catch(function (error) {
            console.log("error retrieving image")
        });
    }

    // <div  onClick={changePicture}>change image</div>}
    return (
        props.login &&
        <div className= {`home ${props.darkMode ? "dark": ""}`}>
            <div className={`sidebar ${props.darkMode ? "dark": ""}`}>
            <div  className="wrap-img">
                <img id="profilePic"  className="sidebar-profilepicture" src={userData.profilepic} alt="profile pic" />
                {!uploadProgress && <span className="wrap-text" onClick={changePicture}>
                        <i className="bi-pencil-square" role="img" aria-label="name"></i>
                    </span>}
                {uploadProgress && <div className="upload-progress" >{uploadProgress+'%'}</div>}
            </div>
                <div id="username" className="sidebar-username">
                    {userData.name} 
                </div>
            </div>
            <div className="home-main">
                <NewCard 
                    darkMode = {props.darkMode}
                    handleClick = {addCard}
                    userData ={userData}
                />
            </div>
        </div>
    )
}