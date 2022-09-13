
import "./login.css";
import {useState,useEffect} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {setCookie} from "../../../Util/Cookie";

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Login(props){
    console.log("Rendering Login")

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            email:"",
            password: "",
        }
    )

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
        var user = { ...formData };
        const config = {
            url: process.env.REACT_APP_SERVER+'/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
                    setCookie("me", JSON.stringify(response.data), 1/24)
                    
                    navigate({
                        pathname: '/home',
                        state: {  
                            user: response.data
                        }
                      })
                      
                    props.toggleLogin()
                }
            })
            .catch(function (error) {
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
        <div className={props.darkMode ? "dark" : ""}>
        
            <form className="login-form">
                <Typography variant="h2" gutterBottom>Login</Typography>
                <div className="login-form-inputs">
                    <div className="login-form-input-row">

                        <div className="login-form-input-row-inputanderror">
                        
                            {!formErrors.email && <TextField
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
                                defaultValue={formData.password}
                                helperText={formErrors.password}
                                variant="standard"
                                onChange={handleChange}
                            />}     

                        </div>
                    </div>

                    <Button variant="contained" id="login" className="login" type="button" onClick={validate}>Login</Button>
                </div>
            </form>
        </div>
    )
}