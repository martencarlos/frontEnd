
import "./hero.css";

// import { useEffect,useRef} from "react"
import Typography from '@mui/material/Typography';
import {useState,Fragment,forwardRef, useEffect} from "react";
// import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ForwardIcon from '@mui/icons-material/Forward';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import Typed from 'react-typed';
import { grey, red } from "@mui/material/colors";

export default function Hero(props){
    console.log("Rendering Hero component")
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const snackbarHandleClick = () => {
        setSnackbarOpen(true);
    };
  
    const snackbarHandleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };

    const [openContactUs, setOpenContactUs] = useState(false);
    const handleOpenContactUs = () => setOpenContactUs(true);
    const handleCloseContactUs = () => setOpenContactUs(false);
    const [formData, setFormData] = useState({
        name:"",
        email: "",
        message: "",
    }
)

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function sendEmail() {
        console.log("Sending email")

        const config = {
            url: process.env.REACT_APP_SERVER+'/send-email',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({name:formData.name ,email:formData.email, message:formData.message}),
            
        };

        axios(config).then(function (response) {
            console.log(response.data)
            snackbarHandleClick()
        }).catch(function (error) {
            console.log(error);
        });
        handleCloseContactUs()
    }

    return (
        loaded && <div className= {`hero ${props.darkMode ? "dark": ""}`}>
            {props.direction === "right" &&
                <img fetchpriority="high" src= {props.imgSrc} alt="Hero"></img>
            }
            <div className="text-area">
                {props.button ?
                    <div className="dynamic-title-wrap">
                    <Typography variant="h5" className="title">{props.title}</Typography>
                    <Typed className="dynamicText"
                            strings={[
                                'Online marketplace',
                                'Digital storefront',
                                'E-commerce',
                                'Web store',
                                'Online business',
                                'Digital commerce']}
                                typeSpeed={40}
                                backSpeed={50}
                                attr="placeholder"
                                loop >
                                <input disabled type="text"/>
                        </Typed>
                  </div>
                :
                <Typography variant="h4" className="title">{props.title}</Typography>
                }
            
                <Typography variant="body1"  className="text">{props.text}</Typography>
        
                {props.link &&
                <div className="hero-button">
                    <Button href={props.linkPath} style={{backgroundColor:"#59887bfc", color: "white"}} variant="contained" endIcon={<ForwardIcon />}>
                        {props.linkText}
                    </Button>
                </div>
                // <Link href={props.linkPath} className="link" underline="always">{props.linkText}</Link>
                }
                {props.button &&
                <div className="hero-button">
                    <Button onClick={handleOpenContactUs} style={{ width:"250px",backgroundColor:"#59887bfc", color: "white"}}  variant="contained" endIcon={<SendIcon />}>
                        Get in touch  
                    </Button>
                    <Modal
                        open={openContactUs}
                        onClose={handleCloseContactUs}
                    >
                        {/* <div className={`contact-modal ${props.darkMode ? "dark": ""}`}> */}
                        <div className="contact-modal">
                            <div className="close-modal" style={{right: "20px", position:"absolute"}}>
                            <IconButton onClick={handleCloseContactUs}>
                                <CloseIcon />
                            </IconButton>
                            </div>
                            <div className="landingmodal-row">
                                <Typography variant="h4" color={grey}>Get in touch</Typography>
                            </div>
                            <div className="landingmodal-row">
                                <div className="contact-modal-image">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/webframe-one.appspot.com/o/Landing%20Page%20%20-%20contact%20us.webp?alt=media&token=f8c7ac3c-4f1e-427c-8ee1-127d97e4f42e" alt=""></img>
                                </div>

                                <form className="contact-modal-form">
                                    
                                    <TextField required onChange={handleChange} style={{width:"100%"}} size="small" name="name" label="Name" variant="outlined" />
                                    <TextField required onChange={handleChange} style={{width:"100%"}} size="small" name="email" label="Email" variant="outlined" />
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        name="message"
                                        style={{width:"100%"}}
                                        placeholder="Please enter your message here *"
                                        multiline
                                        rows={3}
                                        maxRows={10}
                                    />
                                    <Button onClick={sendEmail} style={{width:"100%", backgroundColor:"#59887bfc", color: "white"}}  variant="contained" endIcon={<SendIcon />}>
                                        Send email
                                    </Button>
                                    
                                </form>
                            </div>
                        </div>
                    </Modal>
                    <Snackbar
                        open={snackbarOpen}
                        type="success"
                        autoHideDuration={10000}
                        onClose={snackbarHandleClose}
                        // action={snackbarAction}
                    >
                            <Alert onClose={snackbarHandleClose} severity="success" sx={{ width: '100%' }}>
                                Email sent! We will get back to you as soon as possible.
                            </Alert>
                    </Snackbar>
                    
                </div>
                }
            </div>
            {props.direction === "left" && <img src= {props.imgSrc} alt=""></img>
            }
        </div>
    )
}


