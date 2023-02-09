 
import "./account.css";

import {useState, useEffect,useRef} from "react";
import axios from "axios";
import {resizeFile} from "../../../../../Util/ImageProcessing";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import {useNavigate } from 'react-router-dom';

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
    
//     '& .MuiInputBase-input': {
//       borderRadius: 4,
//       position: 'relative',
//       backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
//       border: '1px solid #ced4da',
//       fontSize: 16,
//       width: 'auto',
//       padding: '10px 12px',
//       transition: theme.transitions.create([
//         'border-color',
//         'background-color',
//         'box-shadow',
//       ]),
//       // Use the system font instead of the default Roboto font.
//       fontFamily: [
//         '-apple-system',
//         'BlinkMacSystemFont',
//         '"Segoe UI"',
//         'Roboto',
//         '"Helvetica Neue"',
//         'Arial',
//         'sans-serif',
//         '"Apple Color Emoji"',
//         '"Segoe UI Emoji"',
//         '"Segoe UI Symbol"',
//       ].join(','),
//       '&:focus': {
//         boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//         borderColor: theme.palette.primary.main,
//       },
//     },
//   }));

export default function Account(props){

    console.log("Rendering Account")

    //UserData & upload progress    
    const [userData, setUserData] = useState({})
    const [uploadProgress, setUploadProgress] = useState('')
    const navigate = useNavigate();

    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])
    
    // Set the user data from APP
    useEffect(() => {

        if(props.userData.profilePic){
            setUserData(props.userData)
        }

        return () => {
            setUserData({})
        }
        
    }, [props]);

    //Profile Image functions
    function changePicture(){
        var input = document.createElement('input');
        document.body.appendChild(input); //required for iphone
        input.addEventListener('change', updateValue); //required for iphone
        input.type = 'file';
        input.id ="input"
        input.click();
        document.body.removeChild(input) 
    }

    const updateValue = async (e) =>{
        // getting a hold of the file reference
        var file = e.target.files[0];
        var blobImage
        try {
            blobImage = await resizeFile(file,400,400);
        } catch (error) {
            alert("File not supported - please select an image \n" + error)
            const input = document.getElementById("input")
            document.body.removeChild(input)
            return;
        }
        
        //to send encoded info
        var form_data = new FormData();
        form_data.append("profile_image",blobImage);
        
        //Upload the file
        axios.post(process.env.REACT_APP_SERVER+'/setImageProfile',form_data,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'enc-type': 'multipart/form-data',
            },
            onUploadProgress: (event)=>{
                const totalUploaded = Math.floor((event.loaded / event.total) * 100)
                setUploadProgress(totalUploaded)
            },
            withCredentials: true, 
            }) 
          .then(function (response) {
            setUploadProgress('')
            var user = JSON.parse(JSON.stringify(userData));
            user.profilePic = response.data.url;
            
            localStorage.setItem("profilePic", response.data.url)
            props.updateUserData(user)
            
          }).finally(function(response){
               
          })
          .catch(function (error) {
            console.log(error);
            
        });
        console.log("removing child")
        
    }

    const[formErrors,setFormErrors] = useState({
        name: "", 
        username: "",
        email:"",
        password: "",
        password2: ""
    })
    const [formData, setFormData] = useState({
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

    function validate(e){
        e.preventDefault();
        const currentErrors = validateForm()
        setFormErrors(currentErrors)
        
        if(Object.keys(currentErrors).length===0){
             console.log("Valid. Ready to update user")
             updateUser()
        }
    }

    function validateForm(){
        
        formData.id=userData._id;
        if(!formData.name){
            formData.name = userData.name
        }
        if(!formData.username){
            formData.username = userData.username
        }
        if(!formData.email){
            formData.email = userData.email
        }
        
        console.log(formData)
        console.log(userData)

        const errors= {}
        
        if(!formData.name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)){
            errors.name = "Name format is invalid"
        }
        if(formData.username.indexOf(' ') >= 0){
            errors.username = "No white space allowed"
        }
        if(!String(formData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            errors.email = "Email is invalid"
        }
        // if(formData.password !=="" && !formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
        //     errors.password="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        // }

        if(formData.password2 !== formData.password){
            errors.password2 = "Passwords do not match"
        }
        
        return errors
    }

    const [notification, setNotification] = useState(false)
    const notificationMessage = useRef();

    function handleCloseNotif(){
        setNotification(false);
}


    function updateUser(){
        console.log("updating user")
        
        const config = {
            url: process.env.REACT_APP_SERVER+'/updateUser',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.SERVER,
            },
            data: formData,
            withCredentials: true, 
        };

        axios(config) 
            .then(function (response) {
                console.log(response.data);

                if(JSON.stringify(response.data.errors) !== '{}'){
                    setFormErrors(response.data.errors)
                }else if(response.data.message === "User updated"){
                    
                    props.updateUserData(response.data.user)
                }else if(response.data.error){
                    //Auth error
                    
                    navigate("/logout",{ replace: true });
                }
                
                notificationMessage.current = response.data.message
                setNotification(true)
                
                
            }).finally(()=>{
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function deleteUserConfirmation(){
        handleOpen()
    }
    function cancel(){
        handleClose()
    }

    function deleteUser(){
        console.log("deleting user: "+userData._id)
        
        const config = {
            url: process.env.REACT_APP_SERVER+'/deleteAccount',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {"userId": userData._id},
            withCredentials: true, 
            
        };

        axios(config) 
            .then(function (response) {
                console.log(response.data);
                if(response.data.error){
                    //Auth error
                    
                    navigate("/logout",{ replace: true });
                }else if(response.data.message === "account deleted"){
                    navigate('/logout')
                }else{
                    notificationMessage.current = response.data.message
                    setNotification(true)
                    handleClose()
                }
                
            }).finally(()=>{
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // console.log("account User data:")
    // console.log(userData)
    return (
        props.login && props.userData.profilePic &&
        <div className="account">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="delete-confirmation">
                    <Typography id="modal-modal-title" variant="body1" component="h2">
                        Confirmation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to permanently delete your Webframe account? 
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Plase note that all your data will be lost.
                    </Typography>
                    <br></br>
                    <br></br>
                    <div className="delete-confirmation-buttons">
                        <Button onClick={deleteUser} variant="contained" startIcon={<DeleteIcon />} color="error">Delete</Button>
                        <Button onClick={cancel} variant="contained" color="text">Cancel</Button>
                    </div>
                </div>
            </Modal>
            <br></br>
            <br></br>
            <Typography variant="h4" className="page-title" gutterBottom>{"Account Settings"} </Typography>

            {userData.name &&
            <div className="row" >
                <div className="account-main-card">
                    <form className="account-form">
                        <br></br>
                        <div  className="account-form-inputs">
                            <div className="account-form-input-row">

                                <div className="account-form-input-row-inputanderror">
                                
                                    {!formErrors.name && userData.name && <TextField
                                        
                                        name="name"
                                        id="standard-required"
                                        label="Full Name"
                                        defaultValue={formData.name? formData.name :userData.name}
                                        
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
                        
                                </div>
                            </div>

                            
                            <div className="account-form-input-row">
                                <div className="account-form-input-row-inputanderror">
                                    {!formErrors.username && userData.username && <TextField
                                        
                                        name="username"
                                        id="username-input"
                                        label="UserName"
                                        defaultValue={formData.username? formData.username :userData.username}
                                        
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
                                </div>
                            </div>

                            <div className="account-form-input-row">
                                <div className="account-form-input-row-inputanderror">
                                    {!formErrors.email && userData.email &&<TextField
                                        
                                        name="email"
                                        id="standard-required"
                                        label="Email"
                                        defaultValue={userData.email}
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
                            <br></br>
                            
                            
                            <div className="account-form-input-row">
                                <div className="account-form-input-row-inputanderror"> 
                                    {!formErrors.password && <TextField
                                        name="password"
                                        id="standard-password-input"
                                        label="New Password"
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

                            <div className="account-form-input-row">
                                <div className="account-form-input-row-inputanderror"> 
                                    {!formErrors.password2 && <TextField
                                        name="password2"
                                        id="standard-password-input"
                                        label="Repeat New Password"
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
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="main-card-actions">
                                <Button onClick={validate} style={{textTransform: 'none'}} variant="contained"  disabled={false} endIcon={<UpgradeIcon />} color="success">Update</Button>
                                <Button onClick={deleteUserConfirmation} style={{textTransform: 'none'}} variant="contained"  disabled={false} endIcon={<DeleteIcon />} color="primary">Delete</Button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="account-info-card">
                    <div  className="avatar-container">
                        <img id="profilePic"  className="avatar" src={userData.profilePic} alt="profile pic" />
                        {!uploadProgress && 
                            <span className="wrap-text" onClick={changePicture}>
                                <i className="bi-pencil-square" role="img" aria-label="name"></i>
                            </span>}
                        {uploadProgress && 
                            <div className="upload-progress">{uploadProgress+'%'}</div>}
                    </div>
                    
                    <div className="info-wrap">
                        
                        <Typography className="info-label" variant="body1" >{"#ID"}</Typography>
                        <Typography className="info" variant="body1" gutterBottom>{userData._id} </Typography>
                        <br></br>
                        <br></br>
                        <div className="infocard-row" >
                            <Typography className="info-label" variant="body1" gutterBottom>{"Register Date:"}</Typography>
                            <Typography className="info" variant="body1" gutterBottom>{new Date(Date.parse(userData.createDate)).toLocaleDateString()} </Typography>
                        </div>
                        <div className="infocard-row" >
                            <Typography className="info-label" variant="body1" gutterBottom>{"Last Update:"}</Typography>
                            <Typography className="info" variant="body1" gutterBottom>{new Date(Date.parse(userData.lastUpdate)).toLocaleDateString()} </Typography>
                        </div>
                    </div>
                </div>
                
            </div>}
            <br></br>
            <br></br>
            <Snackbar open={notification} autoHideDuration={6000} onClose={handleCloseNotif} >
                <Alert severity="info" sx={{ width: '100%' }}>
                    {notificationMessage.current}
                </Alert>
            </Snackbar>
        </div>
                
    )
}