
import {getCookie} from "../../Util/Cookie";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react"
import axios from "axios";

export default function Logout(props){
    console.log("Rendering Logout")
    const navigate = useNavigate();

    useEffect(() => {
        if(getCookie("uid")){
            removeSession()
            deleteAllCookies()
            props.updateUserData({})
            props.toggleLogin()
            localStorage.removeItem("profilePic")
            localStorage.removeItem("firstName")
            localStorage.removeItem("cards")
            localStorage.removeItem("user")
            localStorage.removeItem("myTrackers")
            navigate("/login")
            console.log("actual clear of localstorage")
        }
        console.log("useEffect - logging out")
      })
    
    // console.log(JSON.parse(getCookie("ssid")).sessionID)
    // delCookie("uid")
    // delCookie("ssid")

    function removeSession(){
        let ids={}
        ids.userID= JSON.parse(getCookie("uid"))
        ids.sessionID= JSON.parse(getCookie("ssid")).sessionID
        console.log(ids)

        const config = {
            url: process.env.REACT_APP_SERVER+'/logout',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.SERVER,
            },
            data: JSON.stringify(ids)
        };
         axios(config) 
            .then(function (response) {
                console.log(response.data)
                
                }
            ).finally(()=>{
                
            })
            .catch(function (error) {
                console.log(error);
            }
        );
    }
    
    function deleteAllCookies() {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    }
    
    return (
        <div></div>
    )
}