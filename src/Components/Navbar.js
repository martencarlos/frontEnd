import "../css/navbar.css";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getCookie} from "../Util/Cookie";
import axios from "axios";
import {useState, useEffect} from "react"

import ProfilePicture from '../Images/profile.png';


export default function Navbar(props){
    console.log("Rendering Navbar")
    var features = "Features"
    
    const navigate = useNavigate();

    //Logout if cookie expired
    if(getCookie("me")==="" && props.login){
        props.toggleLogin()
    }
    
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
        console.log("navbar useEffect")
        if(getCookie("me")){
            setUserData(JSON.parse(getCookie("me")))

            if(localStorage.getItem("profilePic")){
                document.getElementById("navProfilePic").src=localStorage.getItem("profilePic")
            }
            //get profile image
            // const config = {
            //     url: 'http://www.localhost/getProfileImage',
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     data: getCookie("me"),
            //     withCredentials: true, // Now this is was the missing piece in the client side 
            // };
            // axios(config).then(function (response) {
            //     document.getElementById("navProfilePic").src=response.data
            // })
            // .catch(function (error) {
            // console.log(error);
            // });
        }
      }, [props.login])

      
    
    return (
        
       //<img src={`../images/${props.img}`} className="card--image" />
        <nav className={props.darkMode ? "dark": ""}>
            <Link className="nav-brand"  to="/">{props.siteTitle}</Link>

            <ul className="nav-links">
                <li><Link className="nav-link" to="/home">Home</Link></li>
                <li><Link className="nav-link" to="/features">{features}</Link></li>
                <li><Link className="nav-link" to="/blog">Blog</Link></li>
                <li><Link className="nav-link" to="/about">About</Link></li>
            </ul>
            {!props.login && <div className="sign-buttons">
                <button className="nav-button" type="button" onClick={() => navigate('/login')}>Login</button>
                <button className="nav-button" type="button" onClick={() => navigate('/register')}>Register</button>
            </div>}
            {getCookie("me") && <div className="sign-buttons">
                <div className="tooltip">
                    <img id="navProfilePic" className="nav-profilepicture" src={ProfilePicture} alt={JSON.parse(getCookie("me")).name} />
                    <span className="tooltip-text">{JSON.parse(getCookie("me")).name}</span> 
                </div>
                <button className="nav-button" type="button" onClick={() => navigate('/logout')}>Logout</button>
            </div>}
            <div 
                className="toggler" 
            >
                <div 
                    className="toggler--slider"
                    onClick={props.toggleDarkMode}
                >
                    <div className="toggler--slider--circle"></div>
                </div>
                
            </div>
        </nav>
    )
}
