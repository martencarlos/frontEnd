 
import "./dashboard.css";

import {useState, useEffect} from "react";
import Typography from '@mui/material/Typography';


export default function Dashboard(props){

    console.log("Rendering Dashboard")

    //UserData & upload progress    
    const [userData, setUserData] = useState({})

    
    // Set the user data from APP
    useEffect(() => {

        if(props.userData.profilePic){
            setUserData(props.userData)
        }

        return () => {
            setUserData({})
        }
        
    }, [props]);


    return (
        props.login && props.userData.profilePic &&
        <div className="dashboard">
            {userData.createDate &&
            <div className="dashboard-main-panel">
                
                <Typography variant="h4" className="account-title" gutterBottom>{"Account information"} </Typography>
                <br></br>
                <br></br>
                <div className="account-row">
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
                </div>
                
            </div> }
        </div>
                
    )
}