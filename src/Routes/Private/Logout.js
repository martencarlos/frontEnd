
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
        localStorage.removeItem("user")
        navigate("/login")
        console.log("actual clear of localstorage")
      })
    console.log("logging out deleting cookie:")
    console.log(getCookie("uid"))
    delCookie("uid")
    delCookie("ssid")
    
    return (
        <div></div>
    )
}