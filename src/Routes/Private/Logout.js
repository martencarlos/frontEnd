
import {getCookie,delCookie} from "../../Util/Cookie";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react"

export default function Logout(props){
    console.log("Rendering Logout")
    const navigate = useNavigate();

    
    useEffect(() => {
        props.toggleLogin()
        localStorage.removeItem("profilePic")
        localStorage.removeItem("firstName")
        localStorage.removeItem("cards")
        navigate("/login")
        console.log("actual clear of localstorage")
      })
    console.log("logging out deleting cookie:")
    console.log(getCookie("me"))
    delCookie("me")
    delCookie("ssid")
    
    return (
        <div></div>
    )
}