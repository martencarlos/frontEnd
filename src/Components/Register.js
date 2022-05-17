
import "../css/register.css";
import {useState} from "react"

export default function Register(props){
    console.log("rendering Register")
    const [formData, setFormData] = useState(
        {
            name: "", 
            username: "",
            email:"",
            password: "",
            password2: "",
            valid: false
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
        
        if(formErrors.name){
            const currentErrors = validateForm()
            if(!currentErrors.name){
                setFormErrors(currentErrors)
            }
        }

        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }
    function validateForm(){
        const errors= {
            name: "", 
            username: "",
            email:"",
            password: "",
            password2: ""
        }
        
        if(!formData.name){
            errors.name = "name is required"
        }
        if(!formData.username){
            errors.username = "username is required"
        }else if(formData.username.indexOf(' ') >= 0){
            errors.username = "no white space permitted"
        }
        if(!formData.email){
            errors.email = "email is required"
        }else if(!String(formData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            errors.email = "email is invalid"
        }
        if(!formData.password){
            errors.password = "password is required"
        }else if(formData.password != formData.password2){
            errors.password2 = "passwords do not match"
        }
        return errors
    }

    function validate(){
        
        const currentErrors = validateForm()
        setFormErrors(currentErrors)
        console.log(currentErrors)
        // if(Object.keys(currentErrors).length===0){
        //     console.log(formData)
        // }
        //event.preventDefault();
    }

    return (
        <div className={props.darkMode ? "dark" : ""}>
            <form className="register-form">
                <h1>Register</h1>
                <div className="register-form-inputs">
                    <div className="register-form-input-row">
                        <span  >
                            <i className="bi-people-fill" role="img" aria-label="name"></i>
                        </span>
                        <input
                            name="name"
                            type="name"
                            placeholder="name"
                            autoComplete="section-blue name"
                            required="required"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur = {validate}
                        />
                    </div>
                    {formErrors.name && <label>{formErrors.name}</label>}

                    <div className="register-form-input-row">
                        <span>
                            <i className="bi-person-badge-fill" role="img" aria-label="name"></i>
                        </span>
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

                    <div className="register-form-input-row">
                        <span>
                            <i className="bi-envelope-fill" role="img" aria-label="name"></i>
                        </span>
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
                    <div className="register-form-input-row">
                        <span>
                            <i className="bi-key-fill" role="img" aria-label="name"></i>
                        </span>
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
                    <div className="register-form-input-row">
                        <span>
                            <i className="bi-key-fill" role="img" aria-label="name"></i>
                        </span>
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
                    <button className="register" type="button" onClick={validate}>Register</button>
                    
                </div>
            </form>
        </div>

        
    )
}