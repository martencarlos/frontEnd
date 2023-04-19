
import "./openAi.css";

//React
import {useState, useEffect, useRef} from "react";
import {useNavigate} from 'react-router-dom';

//MUI
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import axios from "axios";

export default function OpenAi(props){
    console.log("Rendering Open Ai")

    //Global variables
    const navigate = useNavigate();
    
    //UseStates
    const [pageLoading, setPageLoading] = useState(true)
    const [sendingPrompt, setSendingPrompt] = useState(false)
    const [chatResponse, setChatResponse] = useState()
    const [imageResponse, setImageResponse] = useState()
    const [userData, setUserData] = useState({})
    const [formData, setFormData] = useState({
        prompt: ""
    })
    
    /****UseEffects****/

    //Redirect to login page if logged out
    useEffect(() => {
        console.log("useEffect - check if logged in")
        if(!props.login)
            navigate("/login",{ replace: true });
    }, [props.login, navigate])

    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])

    // //fixed navbar
    // useEffect(() => {
    //     var x = document.getElementById("navbar");
    //     x.classList.add("fixed-navbar");
    //     var y = document.getElementById("footer");
    //     y.classList.add("fixed-footer");
    //     var z = document.getElementById("footer-brand");
    //     z.classList.add("fixed-footer-brand");
    //     var zz = document.getElementById("footer-links");
    //     zz.classList.add("fixed-footer-links");

    //     return () => {
    //         var x = document.getElementById("navbar");
    //         x.classList.remove("fixed-navbar");
    //         var y = document.getElementById("footer");
    //         y.classList.remove("fixed-footer");
    //         var z = document.getElementById("footer-brand");
    //         z.classList.remove("fixed-footer-brand");
    //         var zz = document.getElementById("footer-links");
    //         zz.classList.remove("fixed-footer-links");
    //     }
    // }, [props.darkMode])

    //Set user data
    useEffect(() => {
        console.log("setting user data")
        setUserData(props.userData)
    }, [props.userData])

    //Event Listener - Enter key press to submit URL
    // useEffect(() => {
    //     if(props.login){
    //         // Get the input field
    //         var input = document.getElementById("input-prompt-id");
    //         function sumbitFunction(event) {
    //             // If the user presses the "Enter" key on the keyboard
    //             if (event.key === "Enter") {
    //                 // Cancel the default action, if needed
    //                 event.preventDefault();
    //                 // Trigger the button element with a click
    //                 document.getElementById("button-sendPrompt-id").click();
    //             }
    //         }
    //         // Execute a function when the user presses a key on the keyboard
    //         input.addEventListener("keypress", sumbitFunction);
    //         return () => {
    //             input.removeEventListener('keypress', sumbitFunction);
    //         }
    //     }
    //   }, [])

    //Functions
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function sendPrompt(){
        console.log("send prompt")
        setChatResponse()
        setImageResponse()
        setSendingPrompt(true)
        if(isInputValid()){
            var formToSend = { ...formData };

            const config = {
                url: process.env.REACT_APP_SERVER+'/openai',
                method: 'POST',
                // timeout:5000,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.SERVER,
                },
                data: JSON.stringify(formToSend),
                withCredentials: true, // Now this is was the missing piece in the client side
            };

            axios(config).then(function (response) {
                console.log(response)
                setSendingPrompt(false)

                setFormData({prompt: ""})
                
                if(response.data.type==="chat")
                    setChatResponse(response.data.result)
                else if(response.data.type==="image")
                    setImageResponse(response.data.result)
            
                }).catch(function (error) {
                console.log(error);
                setSendingPrompt(false)
            });
        }
        
    }

    function isInputValid (){
       return true
    }

    // console.log(userData)
    // console.log(formData)
    return (
        <div className="openai-fullpage-wrapper">
            {!props.login &&
                <div></div>
            }

            {props.login &&
            <div className="openai-fullpage">
                <div className="openai-input-form">
                    <Typography variant="h4" gutterBottom>Prompt</Typography>
                    <TextField multiline minRows={2} maxRows={6} placeholder="Ask your question or create an image with /imagine as prefix " value={formData.prompt} onChange={handleChange}  required name="prompt" className="openai-input-prompt" id="input-prompt-id" label="My text prompt" variant="standard" />

                    {sendingPrompt ?
                        <CircularProgress size="2rem" className="openai-input-button-loading-circle" />
                        :
                        <Button variant="contained" id="button-sendPrompt-id" className="openai-input-button" type="button" onClick={sendPrompt}>send prompt</Button>
                    }
                </div>
                {(chatResponse || imageResponse) &&<div className="openai-response">
                    <Typography variant="h4" gutterBottom>Response</Typography>
                    
                    <br></br>
                    {chatResponse && <Typography variant="body1" gutterBottom>{chatResponse}</Typography>}
                    {imageResponse && <img src={imageResponse} alt="generated img"></img>}
                </div>}
            </div>
            }
        </div>
    )
}