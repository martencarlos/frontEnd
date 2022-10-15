 
import "./home.css";

import {useState, useEffect} from "react";
import {useNavigate,useLocation } from 'react-router-dom';
import {} from 'react-router-dom';

import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";
import Account from "./Pages/Account/Account";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Divider from '@mui/material/Divider';
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Home(props){

    console.log("Rendering home")
    const navigate = useNavigate();
    const location = useLocation();
    
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
    const [page, setPage] = useState("dashboard")
    

    //redirect to login page if logged out
    useEffect(() => {
        console.log("useEffect - check if logged in")
        if(!props.login)
            navigate("/login",{ replace: true });
        
    }, [props.login, navigate])

    // Set the user data from APP
    useEffect(() => {

        var n = location.pathname.lastIndexOf('/');
        let path = location.pathname.substring(n + 1);
        if(path !== "home")
            setPage(path)

        if(props.userData.profilePic){
            setUserData(props.userData)
        }

        return () => {
            setUserData({})
        }

    }, [props, location.pathname]);

    const [listStatus, setListStatus] = useState(false)
    
    function toggleList() {
        setListStatus(prevMode => !prevMode)
    }

    function goToUsers() {
        
        navigate('/home/users')
    }
    function goToDashboard() {
        
        navigate('/home/dashboard')
    }
    function goToAccount() {
        navigate('/home/account')
    }

    function toggleSidebar() {
        console.log("toggleSidebar")
        
        var x = document.getElementById("sidebar");
        console.log(x.style.display)
        if(x.style.display === ""){
            x.style.display = "flex";
            x.style.position = "absolute";
        }
            
        else{
            x.style.display = ""
            x.style.position = "relative";
        }
            
    }
    
    console.log("Page: ")
    console.log(page)
    return (
        props.login && props.userData.profilePic &&
        <div className= {`home ${props.darkMode ? "dark": ""}`}>
           
           {/* Sidebar */}
           <div id="sidebar" className={"sidebar"}>
                <br></br>
                <br></br>
                <br></br>
                <Typography className="sidebar-section" variant="body1"  gutterBottom> Dashboard </Typography>
                <Button onClick= {goToDashboard}style={{textTransform: 'none'}} className="sidebar-button" startIcon={<DashboardIcon />} color="primary">Dashboard</Button>
                <br></br>
                <Divider variant="middle" />
                <br></br>
                <Typography className="sidebar-section" variant="body1"  gutterBottom> Storage </Typography>
                <Button style={{textTransform: 'none'}} onClick={toggleList} className="sidebar-button" startIcon={<StorageIcon />} endIcon={listStatus ?<KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} color="primary">Objects</Button>    
                {listStatus && 
                    <div className="sidebar-dataList">
                        <Button onClick={goToUsers} style={{textTransform: 'none'}} className="sidebar-nestedButton" startIcon={<PeopleIcon />}  color="primary">Users</Button>
                    </div>
                }
                <br></br>
                <Divider variant="middle" />
                <br></br>
                <Typography className="sidebar-section" variant="body1"  gutterBottom> {"Settings"} </Typography>
                <Button onClick= {goToAccount}style={{textTransform: 'none'}} className="sidebar-button" startIcon={<AccountCircleIcon />} color="primary">Account</Button>

                
            </div>
            <div onClick={toggleSidebar} className="sidebar-toggle">
                <ViewSidebarIcon color="secondary"  />
            </div>

            { page === "dashboard" &&
                    <Dashboard 
                        darkMode = {props.darkMode}
                        login = {props.login}
                    />
            }

            { page === "users" && <Users/> }
            { page === "account" && <Account
                userData = {userData}
                login = {props.login}
                updateUserData= {props.updateUserData}
            /> }


                 {/* <NewCard 
                    darkMode = {props.darkMode}
                    handleClick = {addCard}
                    userData ={userData}
                />  */}
        </div>

        
    )
}