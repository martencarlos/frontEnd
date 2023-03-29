
import "./login.css";
import {useState,useEffect,useRef} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getCookie, setCookie} from "../../../Util/Cookie";

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



export default function Login(props){
    console.log("Rendering Login")

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const keepLoggedIn = useRef(false);

    const handleKeepLoggedIn = (event) => {
        keepLoggedIn.current=!keepLoggedIn.current
      };

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
            email:"",
            password: "",
        }
    )

    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])

    //Redirect to home if already logged in
    useEffect(() => {
        if(props.login){
            navigate("/home",{ replace: true })
        }
    }, [props.login,navigate])

    useEffect(() => {
        if(!props.login){
            // Get the input field
            var input = document.getElementById("loginForm");

            // Execute a function when the user presses a key on the keyboard
            input.addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                document.getElementById("login").click();
            }
            });
        }
      }, [])


    const[formErrors,setFormErrors] = useState({
        email:"",
        password: "",
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function login(){
        setLoading(true)
        var user = { ...formData };
        user.email=String(user.email).toLowerCase()
        user.keepLoggedIn=keepLoggedIn.current
        
        const config = {
            url: process.env.REACT_APP_SERVER+'/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.SERVER,
            },
            data: JSON.stringify(user),
            withCredentials: true, // Now this is was the missing piece in the client side 
            
        };
        
        axios(config) 
            .then(function (response) {
                const {email,password, errors} = response.data;
                
                if(errors){
                    let newErrors = {...formErrors,email,password};
                    setFormErrors(newErrors);
                }else{
                    console.log(response.data)
                    // let userInfo = JSON.parse(JSON.stringify(response.data))
                    // userInfo.profilePic = userInfo.profilePic.replace("%2F", "/");
                
                    setCookie("me", JSON.stringify(response.data), 90001)
                    setCookie("ssid",JSON.stringify(response.data.sessions.at(-1)), 90001) //last session
                    navigate({
                        pathname: '/home',
                        state: {  
                            user: response.data
                        }
                      })
                    props.toggleLogin()
                }
            }).finally(()=>{
                setLoading(false)
            })
            .catch(function (error) {
                const variant = 'error'
                enqueueSnackbar(error.message,{ variant });
                console.log(error);
            });
    }

    function validate(e){
        e.preventDefault();
        
        const currentErrors = validateForm()
        
        if(Object.keys(currentErrors).length===0){
             login()
        }else{
            setFormErrors(currentErrors)
        }
    }

    function validateForm(){
        
        const errors= {}
        
        if(!formData.email){
            errors.email = "Email is required"
        }else if(!String(formData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            errors.email = "Email is invalid"
        }
        if(!formData.password){
            errors.password = "Password is required"
        }
        
        return errors
    }


    return (
        !props.login && <div className={props.darkMode ? "dark" : ""}>
        
            <form className="login-form">
                <Typography variant="h2" gutterBottom>Login</Typography>
                <br></br>
                <div id="loginForm" className="login-form-inputs">
                    <div className="login-form-input-row">

                        <div className="login-form-input-row-inputanderror">
                        
                            {!formErrors.email && <TextField
                                className="input"
                                required
                                name="email"
                                id="standard-required"
                                label="Email"
                                defaultValue={formData.email}
                                variant="standard"
                                onChange={handleChange}
                            />}

                            {formErrors.email && <TextField
                                error
                                name="email"
                                id="standard-error-helper-text"
                                label="Error"
                                defaultValue={formData.email}
                                helperText={formErrors.email}
                                variant="standard"
                                onChange={handleChange}
                            />}

                            
                
                        </div>
                    </div>

                    
                    <div className="login-form-input-row">

                        <div className="login-form-input-row-inputanderror">
                            
                            {!formErrors.password && <TextField
                                required
                                name="password"
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                defaultValue={formData.password}
                                autoComplete="current-password"
                                variant="standard"
                                onChange={handleChange}
                            />}

                            {formErrors.password && <TextField
                                error
                                name="password"
                                id="standard-error-helper-text"
                                label="Error"
                                type="password"
                                defaultValue={formData.password}
                                helperText={formErrors.password}
                                variant="standard"
                                onChange={handleChange}
                            />}     

                        </div>
                    </div>
                    
            
                    <FormControlLabel className="login-form-input-checkbox" control={<Checkbox onChange={handleKeepLoggedIn} />} label="keep me logged in" />
                    <br></br>
                    <Typography variant="body2" gutterBottom>Not a user yet? &nbsp;
                        <Link href="/register">create an account</Link>
                    </Typography>
                    
                    
                    {loading ? (
                        <CircularProgress size="2rem" className="login-loading-circle" />
                    ) : (
                    <Button variant="contained" id="login" className="login" type="button" onClick={validate}>Login</Button>
                    )}
                </div>
            </form>
        </div>
    )
}