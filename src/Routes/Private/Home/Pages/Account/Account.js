 
import "./account.css";

import {useState, useEffect} from "react";
import axios from "axios";
import {resizeFile} from "../../../../../Util/ImageProcessing";

import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import UpgradeIcon from '@mui/icons-material/Upgrade';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

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


    
    return (
        props.login && props.userData.profilePic &&
        <div className="account">
            
            <br></br>
            <br></br>
            <Typography variant="h4" className="page-title" gutterBottom>{"Account information"} </Typography>

            <div className="row" >
                <div className="account-main-card">
                    <InputLabel shrink htmlFor="bootstrap-input">Full Name</InputLabel>
                    <BootstrapInput placeholder={userData.name} id="bootstrap-input" />
                    <br></br>
                    <InputLabel shrink htmlFor="bootstrap-input">Username</InputLabel>
                    <BootstrapInput placeholder={userData.username} id="bootstrap-input" />
                    <br></br>
                    <InputLabel shrink htmlFor="bootstrap-input">Email</InputLabel>
                    <BootstrapInput placeholder={userData.email} id="bootstrap-input" />
                    <br></br>
                    <br></br>
                    <Button style={{textTransform: 'none'}} variant="contained"  disabled={false} endIcon={<UpgradeIcon />} color="success">Update</Button>
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
            
                {/* <div className="account-row">
                    <Typography variant="body1" fontWeight={"bold"} gutterBottom>{"Name:"} </Typography>
                    <Typography variant="body1" gutterBottom>{userData.name} </Typography>
                </div>
                <div className="account-row">
                    <Typography variant="body1" fontWeight={"bold"} gutterBottom>{"Username:"} </Typography>
                    <Typography variant="body1" gutterBottom>{userData.username} </Typography>
                </div>
                <div className="account-row">
                    <Typography variant="body1" fontWeight={"bold"} gutterBottom>{"Email:"} </Typography>
                    <Typography variant="body1" gutterBottom>{userData.email} </Typography>
                </div>
                <div className="account-row">
                    <Typography variant="body1" fontWeight={"bold"} gutterBottom>{"Created date:"} </Typography>
                    <Typography variant="body1" gutterBottom>{userData.createDate.substring(0, 10)} </Typography>
                </div>
                <div className="account-row">
                    <Typography variant="body1" fontWeight={"bold"} gutterBottom>{"Last update:"} </Typography>
                    <Typography variant="body1" gutterBottom>{userData.lastUpdate.substring(0, 10)} </Typography>
                </div> */}
                
            
        </div>
                
    )
}