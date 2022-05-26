
import "../../css/login.css";
import {useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {setCookie} from "../../Util/Cookie";

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
            url: 'http://www.localhost/login',
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

    function validate(){
        //event.preventDefault();
        const currentErrors = validateForm()
        setFormErrors(currentErrors)

        
        if(Object.keys(currentErrors).length===0){
             console.log("submitting form")
             login()
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
                <h1>Login</h1>
                <div className="login-form-inputs">
                    
                    <div className="login-form-input-row">
                        <span>
                            <i className="bi-envelope-fill" role="img" aria-label="name"></i>
                        </span>
                        <div className="login-form-input-row-inputanderror">
                            <input
                                name="email"
                                type="email"
                                placeholder="email"
                                autoComplete="section-blue email"
                                required="required"
                                value={formData.email}
                                onChange={handleChange}
                                
                            />
                            {formErrors.email && <label className="error">{formErrors.email}</label>}
                        </div>
                    </div>

                    <div className="login-form-input-row">
                        <span>
                            <i className="bi-key-fill" role="img" aria-label="name"></i>
                        </span>
                        <div className="login-form-input-row-inputanderror">
                            <input
                                name="password"
                                type="password"
                                placeholder="password"
                                autoComplete="section-red new-password"
                                required="required"
                                value={formData.password}
                                onChange={handleChange}
                                
                            />
                            {formErrors.password && <label className="error">{formErrors.password}</label>}
                        </div>
                    </div>
                   
                    <button className="login" type="button" onClick={validate}>Login</button>

                </div>
            </form>
        </div>

        
    )
}