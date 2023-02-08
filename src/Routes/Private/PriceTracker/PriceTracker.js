 
import "./pricetracker.css";

import {useState, useEffect, useRef} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useSnackbar } from 'notistack';

import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Pricetracker(props){

    console.log("Rendering Price Tracker")
    
    
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    // const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const months = ["jan", "feb", "mar", "apr", "may","jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    //redirect to login page if logged out
    useEffect(() => {
        console.log("useEffect - check if logged in")
        if(!props.login)
            navigate("/login",{ replace: true });
    }, [props.login, navigate])

    //Confirmation dialog
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const deletetrackerID = useRef();

    function deleteUserConfirmation(e){
        
        //get tracker ID from Event
        if(!e.target.parentNode.id)
            deletetrackerID.current = e.target.parentNode.parentNode.id
        else 
            deletetrackerID.current = e.target.parentNode.id

        handleOpen()
    }
    function cancel(){
        handleClose()
    }

    const [loading, setLoading] = useState(false)
    const [priceGraphData, setPriceGraphData] = useState([])
    const [myTrackers, setMyTrackers] = useState([])
    const [formData, setFormData] = useState({
        userID: "",
        url:""
    })

    // get trackers
    useEffect(() => {
        console.log("get all trackers")
        fetchTrackers()
        
    }, [])

    useEffect(() => {
        setFormData({userID: props.userData._id, url:""})
    }, [props])

    //set price graph from My trackers
    useEffect(() => {
        if(myTrackers.length >0){
            let newArray = JSON.parse(JSON.stringify(myTrackers))
            myTrackers.map((tracker, i) => (
                tracker.productInfo.prices.map((price, j) => (
                    newArray[i].productInfo.prices[j].date = (new Date(price.date).getDate())+" "+ (months[new Date(price.date).getMonth()])
                ))
            ))
            setPriceGraphData(newArray)
        }
        
    }, [myTrackers])

    // useEffect(() => {
    //     console.log("updated price graph data: ")
    //     console.log(priceGraphData)
    // }, [priceGraphData])
    
    
    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])

    async function fetchTrackers(){
        await fetch(process.env.REACT_APP_SERVER+'/mytrackers',{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then((response) => response.json())
        .then((data) => {
            if(!data.error)
                setMyTrackers(data)
            else{
                props.toggleLogin()
                navigate("/login",{ replace: true });
            }
                
        }).finally(function(){
            
        });
    }

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function isInputValid (){
        // check if url is valid
        if(!String(formData.url).toLowerCase().match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/gi)){
            const variant = 'error'
            enqueueSnackbar("URL is invalid",{ variant });
            return false
        }else if(!formData.url.startsWith("https://www.amazon.")){
            const variant = 'error'
            enqueueSnackbar("It needs to be an Amazon URL",{ variant });
            return false
        }else
            return true
    }
    

    function addTracker(){
        if(isInputValid()){
            setLoading(true)
            var newTracker = { ...formData };
            
            const config = {
                url: process.env.REACT_APP_SERVER+'/newtracker',
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.SERVER,
                },
                data: JSON.stringify(newTracker),
                withCredentials: true, // Now this is was the missing piece in the client side 
            };

            axios(config).then(function (response) {
                var variant;
                
                if(response.data.message === "user tracker already exists"){
                    variant = 'info'
                    enqueueSnackbar(response.data.message,{ variant });
                }else if(response.data.message === "URL is not a product page"){
                    variant = 'info'
                    enqueueSnackbar(response.data.message,{ variant });
                }else if(!response.data.error){
                    setMyTrackers(prevTrackers => {
                        return [
                            ...prevTrackers,
                            response.data
                        ]
                    })
                     variant = 'success'
                     enqueueSnackbar("user tracker added",{ variant });
                }else{
                    if(response.data.error==="not authenticated"){
                        props.toggleLogin() 
                        navigate("/login",{ replace: true });
                    }
                }
                
            }).finally(()=>{
                setLoading(false)
            })
            .catch(function (error) {
                const variant = 'error'
                enqueueSnackbar(error.message,{ variant });
                console.log(error);
            });
        }
    }

    function deleteTracker(){
        var trackerIDToDelete =deletetrackerID.current;
        setLoading(true)

        // delete request to server to delete from DB
        const config = {
            url: process.env.REACT_APP_SERVER+'/deletetracker',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({id:trackerIDToDelete}),
            withCredentials: true, // Now this is was the missing piece in the client side 
        };

        axios(config).then(function (response) {
            console.log(response.data)
             if(response.data === "deleted"){
                 setMyTrackers(myTrackers.filter(x => x._id !== trackerIDToDelete));
                
                 const variant = 'success'
                 enqueueSnackbar("tracker deleted",{ variant });
                 
             }else if(response.data.error){
                props.toggleLogin();
                navigate("/login",{ replace: true });
                
             }else{
                const variant = 'error'
                enqueueSnackbar("unexpected error",{ variant });
             }

        }).finally(()=>{
            setLoading(false)
            handleClose()
        }).catch(function (error) {
            const variant = 'error'
            enqueueSnackbar(error.message,{ variant });
            console.log(error);
        });
        
    }
    console.log(myTrackers)
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="delete-confirmation">
                    <Typography id="modal-modal-title" variant="body1" component="h2">
                        Confirmation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this tracker? 
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        All the prices of this tracker will be lost
                    </Typography>
                    <br></br>
                    <br></br>
                    <div className="delete-confirmation-buttons">
                        <Button onClick={deleteTracker} variant="contained" startIcon={<DeleteIcon />} color="error">Delete</Button>
                        <Button onClick={cancel} variant="contained" color="text">Cancel</Button>
                    </div>
                </div>
            </Modal>
            {!props.login && 
                <div></div>
            }
            {props.login &&
            <div className="pricetracker-fullpage">
                 {myTrackers.length >0 && <div className="pricetracker-mytrackers">
                    <Typography className="pricetracker-mytrackers-header"  variant="h4" gutterBottom>My trackers</Typography>
                    { myTrackers.map((tracker, i) => (
                        <div className="pricetracker-tracker" key = {i}>
                            <div className="pricetracker-mytrackers-row" id={tracker._id}>
                                <a className="pricetracker-mytrackers-img-link" href={tracker.url} target="_blank" rel="noopener noreferrer">
                                    <img  className="pricetracker-mytrackers-img" fetchpriority="high" src= {tracker.productInfo.imgSrc} alt="product"></img>
                                </a>
                                <Typography  variant="body1" gutterBottom>{tracker.productInfo.productNumber}</Typography>
                                {/* <Typography className="pricetracker-mytrackers-url" variant="body1" gutterBottom>{tracker.url}</Typography> */}
                                <Typography  variant="body1" gutterBottom>{tracker.productInfo.price+"€"}</Typography>
                                <DeleteIcon onClick={(e)=>deleteUserConfirmation(e)} color="error" className="pricetracker-mytrackers-delete"/>
                            </div>
                            {priceGraphData.length>0 && priceGraphData.length ===myTrackers.length && tracker.productInfo.prices.length>1 &&<div className="pricetracker-mytrackers-row">
                                <ResponsiveContainer width="100%" height="100%" >
                                    <LineChart
                                        data={priceGraphData[i].productInfo.prices}
                                        margin={{top: 20,right: 30,left: 20,bottom: 5,}}
                                        strokeWidth={2}
                                        >
                                        <XAxis   padding={{ left: 30, right: 30 }} stroke="#f17e5b" dataKey="date" />
                                        <Tooltip />
                                        <Line strokeWidth={2} type="monotone" dataKey="price" stroke="#f17e5b" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>}
                        </div>
                    ))}
                    
                </div>}
                <div className="pricetracker-inputcard">
                    <Typography variant="h4" gutterBottom>New price tracker</Typography>
                    <TextField placeholder="https://www.amazon.es/xxx" value={formData.url} onChange={handleChange}  required name="url" className="pricetracker-inputcard-url" id="product_url" label="Amazon product URL" variant="standard" />
                    
                    {loading ? 
                        <CircularProgress size="2rem" className="login-loading-circle" />
                        : 
                        <Button variant="contained" id="addtraker" className="pricetracker-inputcard-submit" type="button" onClick={addTracker}>Add new tracker</Button>
                    }
                </div>
            </div>
            }
        </div>
    )
}