 
import "./account.css";

import {useState, useEffect} from "react";
import axios from "axios";
import {resizeFile} from "../../../../../Util/ImageProcessing";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';

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
            // console.log(error);
            
        });
        console.log("removing child")
        
    }

    const[formErrors,setFormErrors] = useState({
            email:"",
            password: "",
    })
    const [formData, setFormData] = useState({
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


    return (
        props.login && props.userData.profilePic &&
        <div className="account">
            
            <br></br>
            <br></br>
            <Typography variant="h4" className="page-title" gutterBottom>{"Account Settings"} </Typography>

            <div className="row" >
                <div className="account-main-card">
                    <form className="account-form">
                        <br></br>
                        <div id="loginForm" className="login-form-inputs">
                            <div className="login-form-input-row">

                                <div className="login-form-input-row-inputanderror">
                                
                                    {!formErrors.fullName && userData.name && <TextField
                                        className="input"
                                        
                                        name="fullName"
                                        id="standard-required"
                                        label="Full Name"
                                        defaultValue={userData.name}
                                        
                                        variant="standard"
                                        onChange={handleChange}
                                    />}

                                    {formErrors.fullName && <TextField
                                        error
                                        name="fullName"
                                        id="standard-error-helper-text"
                                        label="Error"
                                        defaultValue={formData.fullName}
                                        helperText={formErrors.fullName}
                                        variant="standard"
                                        onChange={handleChange}
                                    />}
                        
                                </div>
                            </div>

                            
                            <div className="login-form-input-row">
                                <div className="login-form-input-row-inputanderror">
                                    {!formErrors.userName && userData.username && <TextField
                                        
                                        name="userName"
                                        id="username-input"
                                        label="UserName"
                                        defaultValue={userData.username}
                                        
                                        variant="standard"
                                        onChange={handleChange}
                                    />}

                                    {formErrors.userName && <TextField
                                        error
                                        name="userName"
                                        id="standard-error-helper-text"
                                        label="Error"
                                        defaultValue={userData.userName}
                                        helperText={formErrors.userName}
                                        variant="standard"
                                        onChange={handleChange}
                                    />}     
                                </div>
                            </div>

                            <div className="login-form-input-row">
                                <div className="login-form-input-row-inputanderror">
                                    {!formErrors.email && userData.email &&<TextField
                                        className="input"
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
                            
                            
                            <div className="login-form-input-row">
                                <div className="login-form-input-row-inputanderror"> 
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

                            <div className="login-form-input-row">
                                <div className="login-form-input-row-inputanderror"> 
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
                                <Button style={{textTransform: 'none'}} variant="contained"  disabled={false} endIcon={<UpgradeIcon />} color="success">Update</Button>
                                <Button style={{textTransform: 'none'}} variant="contained"  disabled={false} endIcon={<DeleteIcon />} color="error">Delete</Button>
                            </div>
                        </div>
                    </form>

                    {/* <InputLabel shrink htmlFor="bootstrap-input">Full Name</InputLabel>
                    <BootstrapInput placeholder={userData.name} id="bootstrap-input" />
                    <br></br>
                    <InputLabel shrink htmlFor="bootstrap-input">Username</InputLabel>
                    <BootstrapInput placeholder={userData.username} id="bootstrap-input" />
                    <br></br>
                    <InputLabel shrink htmlFor="bootstrap-input">Email</InputLabel>
                    <BootstrapInput placeholder={userData.email} id="bootstrap-input" />
                    <br></br>
                    <br></br>
                    <div className="main-card-actions">
                        <Button style={{textTransform: 'none'}} variant="contained"  disabled={false} endIcon={<UpgradeIcon />} color="success">Update</Button>
                        <Button style={{textTransform: 'none'}} variant="contained"  disabled={false} endIcon={<DeleteIcon />} color="error">Delete</Button>
                    </div> */}
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
                        <div className="row" >
                            <Typography className="info-label" variant="body1" gutterBottom>{"Register Date:"}</Typography>
                            <Typography className="info" variant="body1" gutterBottom>{new Date(Date.parse(userData.createDate)).toLocaleDateString()} </Typography>
                        </div>
                        <div className="row" >
                            <Typography className="info-label" variant="body1" gutterBottom>{"Last Update:"}</Typography>
                            <Typography className="info" variant="body1" gutterBottom>{new Date(Date.parse(userData.lastUpdate)).toLocaleDateString()} </Typography>
                        </div>
                    </div>
                </div>
                
            </div>
            <br></br>
            <br></br>
            
        </div>
                
    )
}