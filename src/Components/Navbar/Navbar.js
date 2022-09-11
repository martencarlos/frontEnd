import "./navbar.css";
import {Link, NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getCookie} from "../../Util/Cookie";
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
            document.getElementById("navProfilePic2").src=localStorage.getItem("profilePic")
        }
      }, [props.login])


      useEffect(() => {
        var x = document.getElementById("website");
        x.addEventListener("click", closeHambMenu);

        return () => document.removeEventListener('click', closeHambMenu);
      }, [])

    //Logout if cookie expired
    if(getCookie("me")==="" && props.login){
        props.toggleLogin()
    }
    
    function closeHambMenu(e){
        var x = document.getElementById("hamb-menu");
        console.log(e.target.id)
        if (e.target.id !=="hamb-zone" && x.style.display === "flex") {
            x.style.display = "none";
        }
        
    }

    function hambMenuClick(){
        var x = document.getElementById("hamb-menu");
        
        if (x.style.display === "flex") {
            x.style.display = "none";
        } else {
            x.style.display = "flex";
        }
        
    }

    return (
       //<img src={`../images/${props.img}`} className="card--image" />
        <div className="navbar">
            <nav className={props.darkMode ? "dark": ""}>
                <Link className="nav-brand"  to="/">{props.siteTitle}</Link>

                <ul className="nav-links">
                    <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/home">Home</NavLink></li>
                    <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/projects">Projects</NavLink></li>
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

                <span id="hamb-zone" className="hamb-menu" onClick={hambMenuClick}>
                    <i id="hamb-zone" className="bi bi-list" role="img" aria-label="menu"></i>
                </span>
                
            </nav>
            <div id="hamb-menu"  className= {`hamb-menu ${props.darkMode ? "dark": ""}`}>
                <div className="nav-links-hamb">
                        <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/home">Home</NavLink></li>
                        <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/projects">Projects</NavLink></li>
                        <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/features">Features</NavLink></li>
                        <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/blog">Blog</NavLink></li>
                        <li><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/about">About</NavLink></li>
                </div>

                {!props.login && <div className="sign-buttons-hamb">
                    <button className="nav-button" type="button" onClick={() => navigate('/login')}>Login</button>
                    <button className="nav-button" type="button" onClick={() => navigate('/register')}>Register</button>
                    <div className="toggler" >
                        <div className="toggler--slider" onClick={props.toggleDarkMode} >
                            <div className="toggler--slider--circle"></div>
                        </div>
                    </div>
                </div>}
                {getCookie("me") && <div className="sign-buttons-hamb">
                    <div className="tooltip">
                        <img id="navProfilePic2" className="nav-profilepicture" alt={JSON.parse(getCookie("me")).name} />
                        <span className="tooltip-text">{JSON.parse(getCookie("me")).name}</span> 
                    </div>
                    <button className="nav-button" type="button" onClick={() => navigate('/logout')}>Logout</button>
                    <div className="toggler" >
                        <div className="toggler--slider" onClick={props.toggleDarkMode} >
                            <div className="toggler--slider--circle"></div>
                        </div>
                    </div>
                </div>}

            </div>

        </div>
    )
}

