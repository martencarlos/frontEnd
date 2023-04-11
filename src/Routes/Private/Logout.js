
import {getCookie,delCookie} from "../../Util/Cookie";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react"

export default function Logout(props){
    console.log("Rendering Logout")
    const navigate = useNavigate();

    useEffect(() => {
        deleteAllCookies()
        props.updateUserData({})
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
    // delCookie("uid")
    // delCookie("ssid")
    
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