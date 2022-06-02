
import axios from "axios";

export default function Secure(){
    
    function returnId(){
        axios
            .get(process.env.REACT_APP_SERVER+"/.well-known/acme-challenge/:id")
            .then(function (response) {
                console.log(response);
                return(response)
        });
    }
   
    return (
            {returnId}
    )
}