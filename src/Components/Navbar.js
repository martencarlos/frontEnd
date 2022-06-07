import "../css/navbar.css";
import {Link, NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getCookie} from "../Util/Cookie";
import {useState, useEffect} from "react"

export default function Navbar(props){
    console.log("Rendering Navbar")
    const navigate = useNavigate();
    let activeStyle = {
        fontweight: "bold",
      };
    
      let activeClassName = "underline";
    // ***** USE STATES & USE EFFECTS *****
    const [userData, setUserData] = useState({})

    //Set user data after login
    useEffect(() => {
        console.log("navbar useEffect")
        if(getCookie("me")){
            setUserData(JSON.parse(getCookie("me")))
            document.getElementById("navProfilePic").src=localStorage.getItem("profilePic")
        }
      }, [props.login])

    //Logout if cookie expired
    if(getCookie("me")==="" && props.login){
        props.toggleLogin()
    }
    
    return (
       //<img src={`../images/${props.img}`} className="card--image" />
        <nav className={props.darkMode ? "dark": ""}>
            <Link className="nav-brand"  to="/">{props.siteTitle}</Link>

            <ul className="nav-links">
                <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/home">Home</NavLink></li>
                <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/features">Features</NavLink></li>
                <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/blog">Blog</NavLink></li>
                <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/about">About</NavLink></li>
            </ul>
            {!props.login && <div className="sign-buttons">
                <button className="nav-button" type="button" onClick={() => navigate('/login')}>Login</button>
                <button className="nav-button" type="button" onClick={() => navigate('/register')}>Register</button>
                <div className="toggler" >
                    <div className="toggler--slider" onClick={props.toggleDarkMode} >
                        <div className="toggler--slider--circle"></div>
                    </div>
                </div>
            </div>}
            {getCookie("me") && <div className="sign-buttons">
                <div className="tooltip">
                    <img id="navProfilePic" className="nav-profilepicture" alt={JSON.parse(getCookie("me")).name} />
                    <span className="tooltip-text">{JSON.parse(getCookie("me")).name}</span> 
                </div>
                <button className="nav-button" type="button" onClick={() => navigate('/logout')}>Logout</button>
                <div className="toggler" >
                    <div className="toggler--slider" onClick={props.toggleDarkMode} >
                        <div className="toggler--slider--circle"></div>
                    </div>
                </div>
            </div>}
            
        </nav>
    )
}
