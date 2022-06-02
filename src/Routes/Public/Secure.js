


export default function Secure(){
    
    function returnId(){
        console.log(process.env.REACT_APP_SSL_KEY)
        return (process.env.REACT_APP_SSL_KEY)
    }
   
    return (
            {returnId}
    )
}