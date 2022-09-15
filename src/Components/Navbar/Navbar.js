import "./navbar.css";
import {Link, NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getCookie} from "../../Util/Cookie";
import {useState, useEffect} from "react"

import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip';

export default function Navbar(props){
    console.log("Rendering Navbar")
    const navigate = useNavigate();
    
    // ***** USE STATES & USE EFFECTS *****
    const [userData, setUserData] = useState({})

    //Initialize Navbar

    useEffect(() => {
        console.log("navbar useEffect")
        setUserData(props.userData)
        
        //close hamburguer menu if clicked outside the menu
        var x = document.getElementById("website");
        x.addEventListener("click", closeHambMenu);

        return () => document.removeEventListener('click', closeHambMenu);
    }, [props.userData])

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

    // console.log("PROPS:")
    // console.log("userData:")
    // console.log(props.userData)
    // console.log("login:")
    // console.log(props.login)

    // console.log("Navbar:")
    // console.log("userData:")
    // console.log(userData)

    return (
       //<img src={`../images/${props.img}`} className="card--image" />
        <div className="navbar">
            <nav className={props.darkMode ? "dark": ""}>
                <Link className="nav-brand"  to="/">{props.siteTitle}</Link>

                <ul className="nav-links">
                    {props.login && 
                        <li><Button className= {`bt-nav-link ${props.darkMode ? "dark": ""}` }   variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/home">Home</NavLink></Button></li>
                    }
                    <li><Button className= {`bt-nav-link ${props.darkMode ? "dark": ""}`}  variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/projects">Projects</NavLink></Button></li>
                    <li><Button className= {`bt-nav-link ${props.darkMode ? "dark": ""}`}  variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/features">Features</NavLink></Button></li>
                    <li><Button className= {`bt-nav-link ${props.darkMode ? "dark": ""}`}  variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/blog">Blog</NavLink></Button></li>
                    <li><Button className= {`bt-nav-link ${props.darkMode ? "dark": ""}`}  variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/about">About</NavLink></Button></li>
                </ul>
                {!props.login && <div className="sign-buttons">
                    <Button variant="outlined" className= {`nav-button ${props.darkMode ? "dark": ""}`} type="button" onClick={() => navigate('/login')}>Login</Button>
                    <Button variant="contained" className="nav-button" type="button" onClick={() => navigate('/register')}>Register</Button>
                        <div className="toggler" >
                            <div className="toggler--slider" onClick={props.toggleDarkMode} >
                                <div className="toggler--slider--circle"></div>
                            </div>
                        </div>
                    </div>
                }

                {props.login && props.userData.profilePic && 
                    <div className="sign-buttons">
                        {userData.name && <Tooltip sx={{ bgcolor: 'primary.main' }}  disableFocusListener title={userData.name} arrow leaveDelay={200}>
                            {/* <div className="tooltip"> */}
                                <img id="navProfilePic" src={userData.profilePic} className="nav-profilepicture" alt={userData.name} />
                                {/* <span className="tooltip-text">{userData.name}</span> 
                            </div> */}
                            </Tooltip>
                        }
                        <Button variant="outlined" className="nav-button" type="button" onClick={() => navigate('/logout')}>Logout</Button>
                        <div className="toggler" >
                            <div className="toggler--slider" onClick={props.toggleDarkMode} >
                                <div className="toggler--slider--circle"></div>
                            </div>
                        </div>
                    </div>
                }

                <span id="hamb-zone" className="hamb-menu" onClick={hambMenuClick}>
                    <i id="hamb-zone" className="bi bi-list"  role="img" aria-label="menu"></i>
                </span>
                 
            </nav>
            <div id="hamb-menu"  className= {`hamb-menu ${props.darkMode ? "dark": ""}`}>
                <div className="nav-links-hamb">
                    {props.login && 
                        <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/home">Home</NavLink></Button></li>
                    }
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/projects">Projects</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/features">Features</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/blog">Blog</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/about">About</NavLink></Button></li>
                </div>

                <div className="toggler" >
                    <div className="toggler--slider" onClick={props.toggleDarkMode} >
                        <div className="toggler--slider--circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

