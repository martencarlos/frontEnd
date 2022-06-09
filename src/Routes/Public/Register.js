
import "../../css/register.css";
import {useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        }else if(formData.password !== formData.password2){
            errors.password2 = "Passwords do not match"
        }
        
        return errors
    }

    function validate(){
        //event.preventDefault();
        const currentErrors = validateForm()
        setFormErrors(currentErrors)
        if(Object.keys(currentErrors).length===0){
             
             registerUser()
        }
    }

    //Register User
    function registerUser() {
        var user = { ...formData };
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
                    let newErrors = {...formErrors,email,username};
                    setFormErrors(newErrors);
                }else{
                    navigate('/login') 
                }
            })
            .catch(function (error) {
            console.log(error);
            });
    }

    return (
        <div className={props.darkMode ? "dark" : ""}>
            <form className="register-form">
                <h1>Register</h1>
                <div className="register-form-inputs">
                    <div className="register-form-input-row">
                        <span className="register-icon">
                            <i className="bi-people-fill" role="img" aria-label="name"></i>
                        </span>
                        <div className="register-form-input-row-inputanderror">
                            <input
                                name="name"
                                type="name"
                                placeholder="Full Name"
                                autoComplete="section-blue name"
                                required="required"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            
                        </div>
                    </div>
                    {formErrors.name && <label className="error">{formErrors.name}</label>}

                    <div className="register-form-input-row">
                        <span className="register-icon">
                            <i className="bi-person-badge-fill" role="img" aria-label="name"></i>
                        </span>
                        <div className="register-form-input-row-inputanderror">
                            <input
                                name="username"
                                type="nickname"
                                placeholder="username"
                                autoComplete="section-blue nickname"
                                required="required"
                                value={formData.username}
                                onChange={handleChange}
                                
                            />
                        </div>
                    </div>
                    {formErrors.username && <label className="error">{formErrors.username}</label>}
                    <div className="register-form-input-row">
                        <span className="register-icon">
                            <i className="bi-envelope-fill" role="img" aria-label="name"></i>
                        </span>
                        <div className="register-form-input-row-inputanderror">
                            <input
                                name="email"
                                type="email"
                                placeholder="email"
                                autoComplete="section-blue email"
                                required="required"
                                value={formData.email}
                                onChange={handleChange}
                                
                            />
                        </div>
                    </div>
                    {formErrors.email && <label className="error">{formErrors.email}</label>}
                    <div className="register-form-input-row">
                        <span className="register-icon">
                            <i className="bi-key-fill" role="img" aria-label="name"></i>
                        </span>
                        <div className="register-form-input-row-inputanderror">
                            <input
                                name="password"
                                type="password"
                                placeholder="password"
                                autoComplete="section-red new-password"
                                required="required"
                                value={formData.password}
                                onChange={handleChange}
                                
                            />
                        </div>
                    </div>
                    {formErrors.password && <label className="error">{formErrors.password}</label>}
                    <div className="register-form-input-row">
                        <span className="register-icon">
                            <i className="bi-key-fill" role="img" aria-label="name"></i>
                        </span>
                        <div className="register-form-input-row-inputanderror">
                            <input
                                name="password2"
                                type="password"
                                placeholder="re-enter password"
                                autoComplete="section-red new-password"
                                required="required"
                                value={formData.password2}
                                onChange={handleChange}
                                
                            />
                        </div>
                    </div>
                    {formErrors.password2 && <label className="error">{formErrors.password2}</label>}
                    <button className="register" type="button" onClick={validate}>Register</button>
                </div>
            </form>
        </div>
    )
}