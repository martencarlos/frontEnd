
import axios from "axios";

export default function Secure(){
    var res=""
    axios
    .get("/.well-known/acme-challenge/:id")
    .then(function (response) {
        console.log(response);
        res=response
    });
    
    return (
        <>
            {res}
        </>
    )
}