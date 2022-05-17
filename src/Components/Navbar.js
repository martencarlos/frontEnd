import "../css/navbar.css";
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';



export default function Navbar(props){
    var features = "Features"

    const history = useHistory();

    return (
        
       //<img src={`../images/${props.img}`} className="card--image" />
        <nav className={props.darkMode ? "dark": ""}>
            <a className="nav-brand"  href="/">{props.siteTitle}</a>

            <ul className="nav-links">
                <li><Link className="nav-link" to="/features">{features}</Link></li>
                <li><Link className="nav-link" to="/blog">Blog</Link></li>
                <li><Link className="nav-link" to="/about">About</Link></li>
            </ul>
            <div className="sign-buttons">
                <button className="nav-button" type="button" onClick={() => history.push('/login')}>Login</button>
                <button className="nav-button" type="button" onClick={() => history.push('/register')}>Sign-up</button>
            </div>
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
