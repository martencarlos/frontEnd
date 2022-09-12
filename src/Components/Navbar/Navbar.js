import "./navbar.css";
import {Link, NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getCookie} from "../../Util/Cookie";
import {useState, useEffect} from "react"
import axios from "axios";

import Button from '@mui/material/Button'

export default function Navbar(props){
    console.log("Rendering Navbar")
    const navigate = useNavigate();
    
    // ***** USE STATES & USE EFFECTS *****
    const [userData, setUserData] = useState({})

    //Set user data after login
    useEffect(() => {
        console.log("navbar useEffect")
        if(getCookie("me")){
            if(!localStorage.getItem("profilePic")){
                    getProfileImageIntoLocalStorage()
            }else{
                setUserData(prevFormData => ({
                    ...prevFormData,
                    profilePic: localStorage.profilePic
                }))
            }
        }
    }, [props.login])

 

    //close hamburguer menu if clicked outside the menu
    useEffect(() => {
    var x = document.getElementById("website");
    x.addEventListener("click", closeHambMenu);

    return () => document.removeEventListener('click', closeHambMenu);
    }, [])

    //close hamburguer event listener function
    function closeHambMenu(e){
        var x = document.getElementById("hamb-menu");
        
        if (e.target.id !=="hamb-zone" && x.style.display === "flex") {
            x.style.display = "none";
        }
    }

    //Logout if cookie expired
    if(getCookie("me")==="" && props.login){
        props.toggleLogin()
    }
    
    //open & close hamburguer by clicking the icon 
    function hambMenuClick(){
        var x = document.getElementById("hamb-menu");
        
        if (x.style.display === "flex") {
            x.style.display = "none";
        } else {
            x.style.display = "flex";
        }
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
            
            if(response.data){
                localStorage.setItem("profilePic", response.data)
            }else{
                const defaultProfilePic = "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/profiles%2Fdefault.jpeg?alt=media&token=a220a7a4-ab49-4b95-ac02-d024b1ccb5db"
                localStorage.setItem("profilePic", defaultProfilePic)
            }
            setUserData(prevFormData => ({
                ...prevFormData,
                profilePic: localStorage.profilePic
            }))
        })
        .catch(function (error) {
            console.log("error retrieving image")
        });
    }

    return (
       //<img src={`../images/${props.img}`} className="card--image" />
        <div className="navbar">
            <nav className={props.darkMode ? "dark": ""}>
                <Link className="nav-brand"  to="/">{props.siteTitle}</Link>

                <ul className="nav-links">
                    {props.login && 
                    <li><Button className="bt-nav-link" variant="text"> <NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/home">Home</NavLink></Button></li>}
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/projects">Projects</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/features">Features</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/blog">Blog</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/about">About</NavLink></Button></li>
                </ul>
                {!props.login && <div className="sign-buttons">
                <Button variant="outlined" className="nav-button" type="button" onClick={() => navigate('/login')}>Login</Button>
                <Button variant="contained" className="nav-button" type="button" onClick={() => navigate('/register')}>Register</Button>
                    <div className="toggler" >
                        <div className="toggler--slider" onClick={props.toggleDarkMode} >
                            <div className="toggler--slider--circle"></div>
                        </div>
                    </div>
                </div>}
                {getCookie("me") && <div className="sign-buttons">
                    <div className="tooltip">
                        <img id="navProfilePic" src={userData.profilePic} className="nav-profilepicture" alt={JSON.parse(getCookie("me")).name} />
                        <span className="tooltip-text">{JSON.parse(getCookie("me")).name}</span> 
                    </div>
                    <Button variant="outlined" className="nav-button" type="button" onClick={() => navigate('/logout')}>Logout</Button>
                    <div className="toggler" >
                        <div className="toggler--slider" onClick={props.toggleDarkMode} >
                            <div className="toggler--slider--circle"></div>
                        </div>
                    </div>
                </div>}

                <span id="hamb-zone" className="hamb-menu" onClick={hambMenuClick}>
                    <i id="hamb-zone" className="bi bi-list"  role="img" aria-label="menu"></i>
                </span>
                
            </nav>
            <div id="hamb-menu"  className= {`hamb-menu ${props.darkMode ? "dark": ""}`}>
                <div className="nav-links-hamb">
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/projects">Projects</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/features">Features</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/blog">Blog</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/about">About</NavLink></Button></li>
                </div>

                {/* {!props.login && <div className="sign-buttons-hamb">
                    <button className="nav-button" type="button" onClick={() => navigate('/login')}>Login</button>
                    <button className="nav-button" type="button" onClick={() => navigate('/register')}>Register</button> */}
                    
                    <div className="toggler" >
                        <div className="toggler--slider" onClick={props.toggleDarkMode} >
                            <div className="toggler--slider--circle"></div>
                        </div>
                    </div>
                {/* </div>}
                {getCookie("me") && <div className="sign-buttons-hamb">
                    <div className="tooltip">
                        <img id="navProfilePic2" src={userData.profilePic} className="nav-profilepicture" alt={JSON.parse(getCookie("me")).name} />
                        <span className="tooltip-text">{JSON.parse(getCookie("me")).name}</span> 
                    </div>
                    <button className="nav-button" type="button" onClick={() => navigate('/logout')}>Logout</button>
                    <div className="toggler" >
                        <div className="toggler--slider" onClick={props.toggleDarkMode} >
                            <div className="toggler--slider--circle"></div>
                        </div>
                    </div>
                </div>} */}

            </div>

        </div>
    )
}

