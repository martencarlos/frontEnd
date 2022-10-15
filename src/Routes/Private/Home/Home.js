 
import "./home.css";

import {useState, useEffect} from "react";
import {useNavigate } from 'react-router-dom';
import {} from 'react-router-dom';
import axios from "axios";
import {resizeFile} from "../../../Util/ImageProcessing";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Divider from '@mui/material/Divider';
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People';

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



    //UserData & upload progress    
    const [userData, setUserData] = useState({})
    const [page, setPage] = useState("Dashboard")
    const [uploadProgress, setUploadProgress] = useState('')

    //redirect to login page if logged out
    useEffect(() => {
        console.log("useEffect - check if logged in")
        if(!props.login)
            navigate("/login",{ replace: true });
        
    }, [props.login, navigate])

    // Set the user data from APP
    useEffect(() => {

        if(props.userData.profilePic){
            setUserData(props.userData)
        }

        return () => {
            setUserData({})
        }
        
    }, [props]);


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
            blobImage = await resizeFile(file,400,400);
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
            var user = JSON.parse(JSON.stringify(userData));
            user.profilePic = response.data.url;
            
            localStorage.setItem("profilePic", response.data.url)
            props.updateUserData(user)
            
          }).finally(function(response){
               
          })
          .catch(function (error) {
            // console.log(error);
            
        });
        console.log("removing child")
        
    }

    
  
    const [listStatus, setListStatus] = useState(false)
    
    function toggleList() {
        setListStatus(prevMode => !prevMode)
    }

    function goToUsers() {
        console.log("goToUsers")
        setPage ("Users")
    }
    function goToDashboard() {
        
        setPage ("Dashboard")
    }

    
    
    return (
        props.login && props.userData.profilePic &&
        <div className= {`home ${props.darkMode ? "dark": ""}`}>
           
           {/* Sidebar */}
           <div className={"sidebar"}>
                <br></br>
                <Typography variant="body1"  gutterBottom> Dashboard </Typography>
                <Button onClick= {goToDashboard}style={{textTransform: 'none'}} className="sidebar-button" startIcon={<DashboardIcon />} color="secondary">Dashboard</Button>
                <br></br>
                <Divider variant="middle" />
                <br></br>
                <Typography variant="body1"  gutterBottom> Storage </Typography>
                <Button style={{textTransform: 'none'}} onClick={toggleList} className="sidebar-button" startIcon={<StorageIcon />} endIcon={listStatus ?<KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} color="secondary">Objects</Button>    
                {listStatus && 
                    <div className="sidebar-dataList">
                        <Button onClick={goToUsers} style={{textTransform: 'none'}} className="sidebar-nestedButton" startIcon={<PeopleIcon />}  color="secondary">Users</Button>
                    </div>
                }
                <br></br>
                <Divider variant="middle" />
                <br></br>
                <Typography variant="body1"  gutterBottom> {"Settings"} </Typography>
                {/* <div className="space"></div>
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
                </div> */}
            </div>

            { page === "Dashboard" &&
                    <Dashboard 
                        darkMode = {props.darkMode}
                        userData = {userData}
                        login = {props.login}
                    />
            }

            { page === "Users" &&
                    <Users  
                        darkMode = {props.darkMode}
                        
                    />
            }


                 {/* <NewCard 
                    darkMode = {props.darkMode}
                    handleClick = {addCard}
                    userData ={userData}
                />  */}
        </div>

        
    )
}