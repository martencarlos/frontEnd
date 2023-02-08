 
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
    
    //UserData & upload progress    
    const [userData, setUserData] = useState({})
    const [page, setPage] = useState("dashboard")
    

    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])

    //redirect to login page if logged out
    useEffect(() => {
        console.log("useEffect - check if logged in")
        // console.log("home props: ")
        // console.log(props)
        if(!props.login)
            navigate("/login",{ replace: true });
        
    }, [props.login, navigate])

    // Set the user data from APP
    useEffect(() => {
        
        
        var n = location.pathname.lastIndexOf('/');
        let path = location.pathname.substring(n + 1);
        
        
        if(path !== "home"){
            if(document.getElementById(path)){
                var x = document.getElementById(path);
                x.classList.add("active");
            }
            
            setPage(path)
        }
            

        if(props.userData.profilePic){
            setUserData(props.userData)
        }

        return () => {
            setUserData({})
            if(document.getElementById(path)){
                var x = document.getElementById(path);
                x.classList.remove("active");
            }
        }

    }, [props, location.pathname]);

    const [listStatus, setListStatus] = useState(false)
    
    function toggleList() {
        setListStatus(prevMode => !prevMode)
    }

    function goToUsers() {
        closeSideBarIfOpen()
        navigate('/home/users')
    }
    function goToDashboard() {
        closeSideBarIfOpen()
        navigate('/home/dashboard')
    }
    function goToAccount() {
        closeSideBarIfOpen()
        navigate('/home/account')
    }

    function closeSideBarIfOpen() {
        var x = document.getElementById("sidebar");
        x.style.display = ""
        x.style.position = "relative";
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
    
    
    return (
        props.login && props.userData.profilePic &&
        <div className= {`home ${props.darkMode ? "dark": ""}`}>
           
           {/* Sidebar */}
           <div id="sidebar" className={"sidebar"}>
                <div className="sidebar-sticky-content">
                    <br></br>
                    <br></br>
                    <br></br>
                    <Typography className="sidebar-section" variant="body1"  gutterBottom> Dashboard </Typography>
                    <Button id="dashboard" onClick= {goToDashboard}style={{textTransform: 'none'}} className="sidebar-button" startIcon={<DashboardIcon />} >Dashboard</Button>
                    <br></br>
                    <Divider variant="middle" />
                    <br></br>
                    <Typography className="sidebar-section" variant="body1"  gutterBottom> Storage </Typography>
                    <Button style={{textTransform: 'none'}} onClick={toggleList} className="sidebar-button" startIcon={<StorageIcon />} endIcon={listStatus ?<KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} color="primary">Objects</Button>    
                    {listStatus && 
                        <div className="sidebar-dataList">
                            <Button id="users" onClick={goToUsers} style={{textTransform: 'none'}} className="sidebar-nestedButton" startIcon={<PeopleIcon />}  color="primary">Users</Button>
                        </div>
                    }
                    <br></br>
                    <Divider variant="middle" />
                    <br></br>
                    <Typography className="sidebar-section" variant="body1"  gutterBottom> {"Settings"} </Typography>
                    <Button id="account" onClick= {goToAccount}style={{textTransform: 'none'}} className="sidebar-button" startIcon={<AccountCircleIcon />} color="primary">Account</Button>

                </div>
            </div>
            <div onClick={toggleSidebar} className="sidebar-toggle">
                <ViewSidebarIcon fontSize="large" color="secondary"  />
            </div>

            { page === "dashboard" &&
                    <Dashboard 
                        darkMode = {props.darkMode}
                        title={props.title}
                        login = {props.login}
                        toggleLogin={props.toggleLogin}
                    />
            }

            { page === "users" && <Users
                title={props.title}
                userData = {userData}
            /> }
            { page === "account" && <Account
                userData = {userData}
                title={props.title}
                login = {props.login}
                toggleLogin={props.toggleLogin}
                updateUserData= {props.updateUserData}
            /> }
        </div>
    )
}