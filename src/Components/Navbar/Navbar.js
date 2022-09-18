import "./navbar.css";

import {Link, NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getCookie} from "../../Util/Cookie";
import {useState, useEffect} from "react"

import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip';

import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

// Darkmode switch definition
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

export default function Navbar(props){
    console.log("Rendering Navbar")
    const navigate = useNavigate();
    
    // ***** USE STATES & USE EFFECTS *****
    const [userData, setUserData] = useState({})
    const [switchChecked, setswitchChecked] = useState(false);

    //close hamburguer menu if clicked outside the menu
    useEffect(() => {
        var x = document.getElementById("website");
        x.addEventListener("click", closeHambMenu);

        return () => {
            document.removeEventListener('click', closeHambMenu);
            setUserData({})
        }
    }, [])

    useEffect(() => {
        if(props.darkMode){
            setswitchChecked(true)
        }
    }, [props.darkMode])

     // initialize user data
     useEffect(() => {
        console.log("navbar useEffect")
        setUserData(props.userData)
    }, [props.userData])

    useEffect(() => {
        //Logout if cookie expired
        if(getCookie("me")==="" && props.login){
            props.toggleLogin()
        }
    })

    //close hamburguer event listener function
    function closeHambMenu(e){
        var x = document.getElementById("hamb-menu");
        console.log(e.target.id)
        console.log(e.target)   
        
        if(x.style.display === "flex"){
            console.log(x.style.display)
            if (e.target.id ==="hamb-menu" || e.target.id ==="hamb-zone" || e.target.tagName === "path"){
            }else
                x.style.display = "none";
        }
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

    const switchHandler = (event) => {
        setswitchChecked(event.target.checked);
    };

  
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
                {!props.login && 
                    <div className="sign-buttons">
                        <Button variant="outlined" className= {`nav-button-login ${props.darkMode ? "dark": ""}`} type="button" onClick={() => navigate('/login')}>Login</Button>
                        <Button variant="contained" className="nav-button" type="button" onClick={() => navigate('/register')}>Register</Button>
                        
                        <FormControlLabel className="toggler"
                            control={<MaterialUISwitch onChange={switchHandler}  sx={{ m: 1 }} color='primary' checked={switchChecked} onClick= {props.toggleDarkMode}/>}
                        />
                        {/* onChange={switchHandler} */}

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
                        
                        <FormControlLabel className="toggler"
                            control={<MaterialUISwitch onChange={switchHandler}  sx={{ m: 1 }} color='primary' checked={switchChecked} onClick= {props.toggleDarkMode}/>}
                        />
                    </div>
                }

                <MenuRoundedIcon id="hamb-zone" className="hamb-menu-icon" onClick={hambMenuClick}/>
                 
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

                <FormControlLabel className="toggler"
                    control={<MaterialUISwitch onChange={switchHandler} sx={{ m: 1 }} color='primary' checked={switchChecked} onClick= {props.toggleDarkMode}/>}
                />
            </div>
        </div>
    )
}

