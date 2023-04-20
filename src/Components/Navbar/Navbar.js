import "./navbar.css";

import {Link, NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getCookie} from "../../Util/Cookie";
import {useState, useEffect} from "react"

import Button from '@mui/material/Button'
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';

const defaultProfilePic = "https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/profiles%2Fdefault.jpg?alt=media&token=a39b3f4a-9d54-4680-91fd-095a158a612c"

// Darkmode switch definition
// const MaterialUISwitch = styled(Switch)(({ theme }) => ({
//     width: 62,
//     height: 34,
//     padding: 7,
//     '& .MuiSwitch-switchBase': {
//       margin: 1,
//       padding: 0,
//       transform: 'translateX(6px)',
//       '&.Mui-checked': {
//         color: '#fff',
//         transform: 'translateX(22px)',
//         '& .MuiSwitch-thumb:before': {
//           backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//             '#fff',
//           )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
//         },
//         '& + .MuiSwitch-track': {
//           opacity: 1,
//           backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//         },
//       },
//     },
//     '& .MuiSwitch-thumb': {
//       backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
//       width: 32,
//       height: 32,
//       '&:before': {
//         content: "''",
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         left: 0,
//         top: 0,
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//           '#fff',
//         )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
//       },
//     },
//     '& .MuiSwitch-track': {
//       opacity: 1,
//       backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//       borderRadius: 20 / 2,
//     },
//   }));

export default function Navbar(props){
    console.log("Rendering Navbar")
    const navigate = useNavigate();
    
    // ***** USE STATES & USE EFFECTS *****
    const [userData, setUserData] = useState({})
    const [switchChecked, setswitchChecked] = useState(false);
    const [keyRender, setKeyRender] = useState(1)

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
        // console.log("navbar props: ")
        // console.log(props)
        if(!getCookie("uid") && props.login){
            console.log("NAVBAR TOOOOOOOOOOOOOOOOOOGLE")
            props.toggleLogin()
        }
    },[props])

    //close hamburguer event listener function
    function closeHambMenu(e){
        var x = document.getElementById("hamb-menu");
        
        if(x.style.display === "flex"){
            
            console.log(e.target.className)
            console.log(e.target.className.baseVal)
            if (e.target.id ==="hamb-menu" || e.target.id ==="hamb-zone" || 
            e.target.tagName === "path" || e.target.classList.contains("bt-nav-link-dropdown"))
            {}else if(e.target.className.baseVal){}
            else{
                x.classList.add("closeMenu");
                if(e.target.className ==="bar1" || e.target.className ==="bar2" || e.target.className ==="bar3"){
                }else{
                    var icon = document.getElementById("hamb-zone");
                    icon.classList.toggle("openHambMenu");
                }
                
                setTimeout(function() {
                    x.style.display = "none";
                    x.classList.remove("closeMenu");
                }, 170);
            }
        }
    }

    //open & close hamburguer by clicking the icon 
    function hambMenuClick(){
        var x = document.getElementById("hamb-menu");
        console.log("toggling openHambMenu")
        var icon = document.getElementById("hamb-zone");
        icon.classList.toggle("openHambMenu");
        if (x.style.display === "flex") {
            x.classList.add("closeMenu");
            
            setTimeout(function() {
                x.style.display = "none";
                x.classList.remove("closeMenu");
            }, 170);
            
        } else {
            x.style.animationName = "openMenu";
            x.style.display = "flex";
        }
    }


    const switchHandler = (event) => {
        setswitchChecked(event.target.checked);
        
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [profileMenu, setProfileMenu] = useState(null);
    const [logoutProfileMenu, setLogoutProfileMenu] = useState(null);

    const open = Boolean(anchorEl);
    const openProfileMenu = Boolean(profileMenu);
    const openLogoutProfileMenu = Boolean(logoutProfileMenu);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const clickProfileMenu = (event) => {
        setProfileMenu(event.currentTarget);
    };
    const clickLogoutProfileMenu = (event) => {
        console.log("clickLogoutProfileMenu")
        setLogoutProfileMenu(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const closeProfileMenu = () => {
        setProfileMenu(null);
    };
    const closeLogoutProfileMenu = () => {
        setLogoutProfileMenu(null);
    };

    var reRenderIfChanged =1;
    return (
       //<img src={`../images/${props.img}`} className="card--image" />
        <div  className="navbar">
            <nav id="navbar" className={props.darkMode ? "dark": ""}>
                {/* <Link className="nav-brand"  to="/">{props.siteTitle}</Link> */}
                
                <img className="nav-brand-img" onClick={() => {navigate('/')}} src="https://firebasestorage.googleapis.com/v0/b/webframebase.appspot.com/o/static%20images%2FBrand.png?alt=media&token=cc86f988-d765-429f-a356-25c05460be7d" alt="logo" />
                
                {props.login &&
                    <ul className="nav-links">
                        <li><Button className= {`bt-nav-link ${props.darkMode ? "dark": ""}` }   variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/home">Home</NavLink></Button></li>
                        <li><Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} className= {`bt-nav-link-dropdown ${props.darkMode ? "dark": ""}`}  variant="text">Projects</Button></li>
                    </ul>}
                {!props.login &&     
                    <ul className="nav-links">
                        <li><Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} className= {`bt-nav-link-dropdown ${props.darkMode ? "dark": ""}`}  variant="text">Projects</Button></li>
                        <li><Button className= {`bt-nav-link ${props.darkMode ? "dark": ""}`}  variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/features">Features</NavLink></Button></li>
                        <li><Button className= {`bt-nav-link ${props.darkMode ? "dark": ""}`}  variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/blog">Blog</NavLink></Button></li>
                        <li><Button className= {`bt-nav-link ${props.darkMode ? "dark": ""}`}  variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/about">About</NavLink></Button></li>
                    
                    </ul>}
                    <Menu
                        disableScrollLock={true}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem id="css-paper-list-icon" onClick={() => {
                            handleClose()
                            hambMenuClick()
                            navigate('/projects/infinitycards')
                            }}>
                            <ListItemText>Infinity Cards</ListItemText>
                            <ListItemIcon>
                                <Tooltip title="req. login" placement="right">
                                    <PersonIcon fontSize="small" />
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleClose()
                            hambMenuClick()
                            navigate('/projects/blog')
                            }}>
                            Blog Integration
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleClose()
                            hambMenuClick()
                            navigate('/projects/webScrap')
                            }}>
                            Web scrap
                        </MenuItem>
                        <MenuItem id="css-paper-list-icon" onClick={() => {
                            handleClose()
                            hambMenuClick()
                            navigate('/projects/priceTracker')
                            }}>
                            <ListItemText>Price Tracker</ListItemText>
                            <ListItemIcon>
                                <Tooltip title="req. login" placement="right">
                                    <PersonIcon fontSize="small" />
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem id="css-paper-list-icon" onClick={() => {
                            handleClose()
                            hambMenuClick()
                            navigate('/projects/openai')
                            }}>
                            <ListItemText>Open AI</ListItemText>
                            <ListItemIcon>
                                <Tooltip title="req. login" placement="right">
                                    <PersonIcon fontSize="small" />
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>
                        
                    </Menu>
                {!props.login && 
                    <div className="sign-buttons">
                        <img onClick={clickLogoutProfileMenu} id="navProfilePic" src={defaultProfilePic} className="nav-profilepicture-logout" alt={"default"} />
                        {/* <Button variant="outlined" color="primary" className= {`nav-button-login ${props.darkMode ? "dark": ""}`} type="button" onClick={() => navigate('/login')}>Login</Button>
                        <Button variant="contained" color="primary" className="nav-button" type="button" onClick={() => navigate('/register')}>Register</Button> */}
                        

                        <Menu
                            disableScrollLock={true}
                            id="logout-profile-menu"
                            anchorEl={logoutProfileMenu}
                            open={openLogoutProfileMenu}
                            onClose={closeLogoutProfileMenu}
                            MenuListProps={{
                            'aria-labelledby': 'logout-profile-menu',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            >
                            
                            <Typography className="profile-name" variant="subtitle1" gutterBottom>{"Unknown User"}</Typography>
                            
                            <MenuItem className="profile-option" onClick={() => {
                                closeLogoutProfileMenu()
                                navigate('/Login')
                                }}>
                                <ListItemIcon>
                                    <ManageAccountsIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Login</ListItemText>
                            </MenuItem>
                             
                            <MenuItem className="profile-option" onClick={() => {
                                closeLogoutProfileMenu()
                                navigate('/Register')
                                }}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Register</ListItemText>
                            </MenuItem>
                        </Menu>
                        
                        <div className="toggler" key={keyRender} onClick= {()=>{
                            setKeyRender(Math.random())
                            props.toggleDarkMode()}}>
                            {
                                !props.darkMode ?
                                <LightModeOutlinedIcon onChange={switchHandler}  sx={{ m: 1 }} color='primary' checked={switchChecked} />
                                :
                                <DarkModeOutlinedIcon  onChange={switchHandler}  sx={{ m: 1 }} color='primary' checked={switchChecked} />
                                
                            }
                        </div>
                        

                    </div>
                }

                {props.login && props.userData.profilePic && 
                    <div className="sign-buttons">
                        {userData.name && 
                            // <Tooltip  sx={{ bgcolor: 'primary.main' }}   title={userData.name} arrow leaveDelay={200}>
                                <img onClick={clickProfileMenu} id="navProfilePic" src={userData.profilePic} className="nav-profilepicture" alt={userData.name} />
                            /* </Tooltip> */
                        }
                        
                        
                        <Menu
                            disableScrollLock={true}
                            id="profile-menu"
                            anchorEl={profileMenu}
                            open={openProfileMenu}
                            onClose={closeProfileMenu}
                            MenuListProps={{
                            'aria-labelledby': 'profile-menu',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            >
                            
                            <Typography className="profile-name" variant="subtitle1" gutterBottom>{userData.name}</Typography>
                            
                            <MenuItem className="profile-option" onClick={() => {
                                closeProfileMenu()
                                navigate('/home/account')
                                }}>
                                <ListItemIcon>
                                    <ManageAccountsIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Account</ListItemText>
                            </MenuItem>
                             
                            <MenuItem className="profile-option" onClick={() => {
                                closeProfileMenu()
                                navigate('/logout')
                                }}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                           
                        </Menu>

                        <div className="toggler">
                            {!props.darkMode ?
                            <LightModeOutlinedIcon onChange={switchHandler}  sx={{ m: 1 }} color='primary' checked={switchChecked} onClick= {props.toggleDarkMode}/>
                            :
                            <DarkModeOutlinedIcon onChange={switchHandler}  sx={{ m: 1 }} color='primary' checked={switchChecked} onClick= {props.toggleDarkMode}/>
                            }
                        </div>
                    </div>
                }
                <div id="hamb-zone" className="hamb-menu-icon" onClick={hambMenuClick}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                {/* <MenuRoundedIcon id="hamb-zone" className="hamb-menu-icon" onClick={hambMenuClick}/> */}
                 
            </nav>
            <div id="hamb-menu"  className= {`hamb-menu ${props.darkMode ? "dark": ""}`}>
                {props.login && 
                <div className="nav-links-hamb">   
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/home">Home</NavLink></Button></li>
                    <li><Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} className= {`bt-nav-link-dropdown ${props.darkMode ? "dark": ""}`}  variant="text">Projects</Button></li>
                </div>}
                {!props.login && 
                <div className="nav-links-hamb"> 
                    {/* <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/projects">Projects</NavLink></Button></li> */}
                    <li><Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} className= {`bt-nav-link-dropdown ${props.darkMode ? "dark": ""}`}  variant="text">Projects</Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/features">Features</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/blog">Blog</NavLink></Button></li>
                    <li><Button className="bt-nav-link" variant="text"><NavLink className={({ isActive }) =>isActive ? "nav-link-active" : "nav-link"}  to="/about">About</NavLink></Button></li>
                </div>}

                <div className="toggler" >
                    {!props.darkMode ?
                        <LightModeOutlinedIcon onChange={switchHandler}  sx={{ m: 1 }} color='primary' checked={switchChecked} onClick= {()=>{
                            var x = document.getElementById("hamb-menu");
                            x.style.animationName = "";
                            var icon = document.getElementById("hamb-zone");
                            icon.classList.toggle("openHambMenu");
                            x.classList.add("closeMenu");
                            setTimeout(function() {
                                x.style.display = "none";
                                x.classList.remove("closeMenu");
                                props.toggleDarkMode()
                            }, 170);
                        }}/>
                        :
                        <DarkModeOutlinedIcon onChange={switchHandler}  sx={{ m: 1 }} color='primary' checked={switchChecked} onClick= {()=>{
                            var x = document.getElementById("hamb-menu");
                            x.style.animationName = "";
                            var icon = document.getElementById("hamb-zone");
                            icon.classList.toggle("openHambMenu");
                            x.classList.add("closeMenu");
                            setTimeout(function() {
                                x.style.display = "none";
                                x.classList.remove("closeMenu");
                                props.toggleDarkMode()
                            }, 170);
                        }}/>
                        }
                    
                    
                    </div>
            </div>
        </div>
    )
}

