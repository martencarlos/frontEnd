
import {delCookie} from "../../Util/Cookie";
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
      }, [])

    delCookie("me")
    
    return (
        <div></div>
    )
}