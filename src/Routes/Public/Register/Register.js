

import "./register.css";
import {useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {setCookie} from "../../../Util/Cookie";

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Register(props){
    console.log("rendering Register")
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            name: "", 
            username: "",
            email:"",
            password: "",
            password2: ""
        }
    )
    const[formErrors,setFormErrors] = useState({
            name: "", 
            username: "",
            email:"",
            password: "",
            password2: ""
    })
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function validateForm(){
        console.log(formData)

        const errors= {}

        if(!formData.name){
            errors.name = "Full Name is required"
        }
        if(!formData.username){
            errors.username = "Username is required"
        }else if(formData.username.indexOf(' ') >= 0){
            errors.username = "no white space permitted"
        }
        if(!formData.email){
            errors.email = "Email is required"
        }else if(!String(formData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            errors.email = "Email is invalid"
        }
        if(!formData.password){
            errors.password = "Password is required"
        } else if(formData.password !== formData.password2){
            errors.password2 = "Passwords do not match"
        }
        
        return errors
    }

    function validate(){
        //event.preventDefault();
        const currentErrors = validateForm()
        setFormErrors(currentErrors)
        if(Object.keys(currentErrors).length===0){
             
             registerUser(currentErrors)
        }
    }

    //Register User
    function registerUser(currentErrors) {
        var user = JSON.parse(JSON.stringify(formData));
        delete user.password2;

        const config = {
            url: process.env.REACT_APP_SERVER+'/registeruser',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(user),
        };
        axios(config) 
            .then(function (response) {
                const {email,username, success} = response.data;
                
                if(!success){
                    let newErrors = {...currentErrors,email,username};
                    setFormErrors(newErrors);
                }else{
                    login(user)
                }
            })
            .catch(function (error) {
            console.log(error);
            });
    }

    function login(user){
        
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
                
                setCookie("me", JSON.stringify(response.data), 1/24)
                
                navigate({
                    pathname: '/home',
                    state: {  
                        user: response.data,
                        registered: true
                    }
                    })
                    
                props.toggleLogin()
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={props.darkMode ? "dark" : ""}>
            <form className="register-form">
                <Typography variant="h2" gutterBottom>Register</Typography>
                <div className="register-form-inputs">
                    <div className="register-form-input-row">
                        <div className="register-form-input-row-inputanderror">
                            
                            {!formErrors.name && <TextField
                                required
                                name="name"
                                id="standard-required"
                                label="name"
                                defaultValue={formData.name}
                                variant="standard"
                                onChange={handleChange}
                            />}

                            {formErrors.name && <TextField
                                error
                                name="name"
                                id="standard-error-helper-text"
                                label="Error"
                                defaultValue={formData.name}
                                helperText={formErrors.name}
                                variant="standard"
                                onChange={handleChange}
                            />}

                            {/* <input
                                name="name"
                                type="name"
                                placeholder="Full Name"
                                autoComplete="section-blue name"
                                required="required"
                                value={formData.name}
                                onChange={handleChange}
                            /> */}
                            
                        </div>
                    </div>
                    

                    <div className="register-form-input-row">
                        
                        <div className="register-form-input-row-inputanderror">
                            
                            {!formErrors.username && <TextField
                                required
                                name="username"
                                id="standard-required"
                                label="username"
                                defaultValue={formData.username}
                                variant="standard"
                                onChange={handleChange}
                            />}

                            {formErrors.username && <TextField
                                error
                                name="username"
                                id="standard-error-helper-text"
                                label="Error"
                                defaultValue={formData.username}
                                helperText={formErrors.username}
                                variant="standard"
                                onChange={handleChange}
                            />}
                            {/* <input
                                name="username"
                                type="nickname"
                                placeholder="username"
                                autoComplete="section-blue nickname"
                                required="required"
                                value={formData.username}
                                onChange={handleChange}
                                
                            /> */}
                        </div>
                    </div>
                    
                    <div className="register-form-input-row">
                        <div className="register-form-input-row-inputanderror">
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
                            {/* <input
                                name="email"
                                type="email"
                                placeholder="email"
                                autoComplete="section-blue email"
                                required="required"
                                value={formData.email}
                                onChange={handleChange}
                                
                            /> */}
                        </div>
                    </div>
                    <div className="register-form-input-row">
                        
                        <div className="register-form-input-row-inputanderror">
                            
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
                            {/* <input
                                name="password"
                                type="password"
                                placeholder="password"
                                autoComplete="section-red new-password"
                                required="required"
                                value={formData.password}
                                onChange={handleChange}
                                
                            /> */}
                        </div>
                    </div>
                    <div className="register-form-input-row">
                        <div className="register-form-input-row-inputanderror">
                            
                            {!formErrors.password2 && <TextField
                                required
                                name="password2"
                                id="standard-password-input"
                                label="re-enter password"
                                type="password"
                                defaultValue={formData.password2}
                                variant="standard"
                                onChange={handleChange}
                            />}

                            {formErrors.password2 && <TextField
                                error
                                name="password2"
                                id="standard-error-helper-text"
                                label="Error"
                                type="password"
                                defaultValue={formData.password2}
                                helperText={formErrors.password2}
                                variant="standard"
                                onChange={handleChange}
                            />}   
                            
                            {/* <input
                                name="password2"
                                type="password"
                                placeholder="re-enter password"
                                autoComplete="section-red new-password"
                                required="required"
                                value={formData.password2}
                                onChange={handleChange}
                            /> */}
                        </div>
                    </div>
                    <Button variant="contained"  className="register" type="button" onClick={validate}>Register</Button>
                </div>
            </form>
        </div>
    )
}