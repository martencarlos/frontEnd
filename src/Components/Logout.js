
import {delCookie} from "./Cookie";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react"

export default function Logout(props){
    console.log("Rendering Logout")
    const navigate = useNavigate();

    useEffect(() => {
        props.toggleLogin()
        navigate("/login")
      }, [])

    delCookie("me")
    
    return (
        <div>nothing</div>
    )
}