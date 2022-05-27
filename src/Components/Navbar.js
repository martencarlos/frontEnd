import "../css/navbar.css";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getCookie} from "../Util/Cookie";


export default function Navbar(props){
    console.log("Rendering Navbar")
    var features = "Features"
    
    const navigate = useNavigate();

    //Logout if cookie expired
    if(getCookie("me")==="" && props.login){
        props.toggleLogin()
    }
    
    
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
                <label className="nav-username">{JSON.parse(getCookie("me")).name}</label>
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
