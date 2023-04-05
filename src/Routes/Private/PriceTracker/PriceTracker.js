
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
import Skeleton from '@mui/material/Skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Modal from '@mui/material/Modal';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuList from '@mui/material/MenuList';
import { positions } from "@mui/system";

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
        // console.log(e.target)
        // console.log(e.target.parentNode.parentNode.parentNode)
        // //get tracker ID from Event
        // if(!e.target.parentNode.id)
        //     deletetrackerID.current = e.target.parentNode.parentNode.id
        // else
        //     deletetrackerID.current = e.target.parentNode.id

        handleOpen()
    }
    function cancel(){
        handleClose()
    }

    const [trackerOptionAnchor, setTrackerOptionAnchor] = useState(null);
    const trackerOptionState = Boolean(trackerOptionAnchor);
    const setTrackerOptionsAnchor = (event) => {
        deletetrackerID.current =event.currentTarget.parentNode.id
        setTrackerOptionAnchor(event.currentTarget);
    };
    const removeTrackerOptionsAnchor = () => {
        setTrackerOptionAnchor(null);
    };

    const [newTrackerLoading, setNewTrackerLoading] = useState(false)
    const [deleteTrackerLoading, setDeleteTrackerLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
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

    //fixed navbar
    useEffect(() => {
        var x = document.getElementById("navbar");
        x.classList.add("fixed-navbar");
        var y = document.getElementById("footer");
        y.classList.add("fixed-footer");
        var z = document.getElementById("footer-brand");
        z.classList.add("fixed-footer-brand");
        var zz = document.getElementById("footer-links");
        zz.classList.add("fixed-footer-links");

        return () => {
            var x = document.getElementById("navbar");
            x.classList.remove("fixed-navbar");
            var y = document.getElementById("footer");
            y.classList.remove("fixed-footer");
            var z = document.getElementById("footer-brand");
            z.classList.remove("fixed-footer-brand");
            var zz = document.getElementById("footer-links");
            zz.classList.remove("fixed-footer-links");
        }
    }, [props.darkMode])

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
            setPageLoading(false)
        }else{
            setPageLoading(false)
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

    //Enter key press to submit URL
    useEffect(() => {
        if(props.login){
            // Get the input field
            var input = document.getElementById("product_url");
            function sumbitFunction(event) {
                // If the user presses the "Enter" key on the keyboard
                if (event.key === "Enter") {
                    // Cancel the default action, if needed
                    event.preventDefault();
                    // Trigger the button element with a click
                    document.getElementById("addtraker").click();
                }
            }
            // Execute a function when the user presses a key on the keyboard
            input.addEventListener("keypress", sumbitFunction);
            
            return () => {
                input.removeEventListener('keypress', sumbitFunction);
            }
        }
      }, [])

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
                if (props.login){
                    //Auth error
                    console.log(data.error)
                    navigate("/logout",{ replace: true });
                }
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
            setNewTrackerLoading(true)
            var newTracker = { ...formData };

            const config = {
                url: process.env.REACT_APP_SERVER+'/newtracker',
                method: 'POST',
                timeout:5000,
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
                }else if(response.data.message === "Product is out of stock - no price found"){
                    variant = 'info'
                    enqueueSnackbar(response.data.message,{ variant });
                }else if(!response.data.error){
                    //Clear URL form data and field value
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        url: ""
                    }))
                    var productURL = document.getElementById("product_url");
                    productURL.value=""
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
                        //auth error
                        console.log(response.data.error)
                        navigate("/logout",{ replace: true });
                    }else{
                        //too many requests
                        console.log(response.data.message)
                        variant = 'info'
                        enqueueSnackbar(response.data.message,{ variant });
                    }
                }

            }).finally(()=>{
                setNewTrackerLoading(false)
            })
            .catch(function (error) {
                setNewTrackerLoading(false)
                const variant = 'error'
                enqueueSnackbar("request timeout - try again",{ variant });
                console.log(error);
            });
        }
    }

    function deleteTracker(){
        var trackerIDToDelete =deletetrackerID.current;
        setDeleteTrackerLoading(true)

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
                //auth error
                console.log(response.data.error)
                navigate("/logout",{ replace: true });

             }else{
                const variant = 'error'
                enqueueSnackbar("unexpected error",{ variant });
             }

        }).finally(()=>{
            setDeleteTrackerLoading(false)
            handleClose()
        }).catch(function (error) {
            const variant = 'error'
            enqueueSnackbar(error.message,{ variant });
            console.log(error);
        });

    }
    var style = getComputedStyle(document.body)
    // console.log(myTrackers)
    return (
        <div className="pricetracker-fullpage-wrapper">
            <Modal
                disableScrollLock={true}
                open={open}
                onClose={handleClose}
                id="pricetracker-delete-dialog"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="delete-confirmation">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmation
                    </Typography>
                    <br></br>
                    <Typography id="modal-modal-description">
                        Are you sure you want to delete this tracker?
                    </Typography>
                    <Typography id="modal-modal-description">
                        All the prices of this tracker will be lost
                    </Typography>
                    <br></br>
                    <br></br>
                    {deleteTrackerLoading ?
                        <div Style={"transform: translate(0px, -15px);display:flex ; justify-content:center"}>
                            <CircularProgress size="2rem" className="login-loading-circle" />
                        </div>
                        :
                        <div className="delete-confirmation-buttons">
                            <Button onClick={deleteTracker} variant="contained" startIcon={<DeleteIcon />} color="error">Delete</Button>
                            <Button onClick={cancel} variant="contained" color="text">Cancel</Button>
                        </div>
                    }
                </div>
            </Modal>
            {!props.login &&
                <div></div>
            }

            {props.login &&
            <div className="pricetracker-fullpage">
                 <div className="pricetracker-inputcard">
                    <Typography variant="h4" gutterBottom>New price tracker</Typography>
                    <TextField placeholder="https://www.amazon.es/xxx" value={formData.url} onChange={handleChange}  required name="url" className="pricetracker-inputcard-url" id="product_url" label="Amazon product URL" variant="standard" />

                    {newTrackerLoading ?
                        <CircularProgress size="2rem" className="login-loading-circle" />
                        :
                        <Button variant="contained" id="addtraker" className="pricetracker-inputcard-submit" type="button" onClick={addTracker}>Add new tracker</Button>
                    }
                </div>

                <div className="pricetracker-mytrackers">
                    {pageLoading ?
                    // <div className="pricetracker-fullpage-loading">
                    //     <CircularProgress size="4rem" className="login-loading-circle" />
                    // </div>
                    
                    <div  className="pricetracker-mytrackers-skeleton" >
                        <div  className="pricetracker-mytrackers-header-skeleton" >
                            <Skeleton sx={{ width: 200, height: 50}} animation="wave" variant="rectangular" />
                        </div>
                        <br></br>
                        <br></br>
                        <div className="pricetracker-mytrackers-info-skeleton">
                                <Skeleton className="pricetracker-mytrackers-info-img-skeleton" animation="wave" variant="rectangular" />
                                <div className="pricetracker-mytrackers-title-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-info-title-text-skeleton" animation="wave" variant="rectangular" />
                                    <Skeleton className="pricetracker-mytrackers-info-title-text-skeleton" animation="wave" variant="rectangular" />
                                </div>
                                <div className="pricetracker-mytrackers-price-column-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-price-skeleton" animation="wave" variant="rectangular" />
                                </div>
                                <div className="pricetracker-mytrackers-delete-column-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-delete-skeleton" animation="wave" variant="rectangular" />
                                </div>
                        </div>

                        <br></br>
                        <div className="pricetracker-mytrackers-info-skeleton">
                                <Skeleton className="pricetracker-mytrackers-info-img-skeleton" animation="wave" variant="rectangular" />
                                <div className="pricetracker-mytrackers-title-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-info-title-text-skeleton" animation="wave" variant="rectangular" />
                                    <Skeleton className="pricetracker-mytrackers-info-title-text-skeleton" animation="wave" variant="rectangular" />
                                </div>
                                <div className="pricetracker-mytrackers-price-column-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-price-skeleton" animation="wave" variant="rectangular" />
                                </div>
                                <div className="pricetracker-mytrackers-delete-column-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-delete-skeleton" animation="wave" variant="rectangular" />
                                </div>
                        </div>
                        <br></br>
                        <div className="pricetracker-mytrackers-info-skeleton">
                                <Skeleton className="pricetracker-mytrackers-info-img-skeleton" animation="wave" variant="rectangular" />
                                <div className="pricetracker-mytrackers-title-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-info-title-text-skeleton" animation="wave" variant="rectangular" />
                                    <Skeleton className="pricetracker-mytrackers-info-title-text-skeleton" animation="wave" variant="rectangular" />
                                </div>
                                <div className="pricetracker-mytrackers-price-column-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-price-skeleton" animation="wave" variant="rectangular" />
                                </div>
                                <div className="pricetracker-mytrackers-delete-column-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-delete-skeleton" animation="wave" variant="rectangular" />
                                </div>
                        </div>
                        <br></br>
                        <div className="pricetracker-mytrackers-info-skeleton">
                                <Skeleton className="pricetracker-mytrackers-info-img-skeleton" animation="wave" variant="rectangular" />
                                <div className="pricetracker-mytrackers-title-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-info-title-text-skeleton" animation="wave" variant="rectangular" />
                                    <Skeleton className="pricetracker-mytrackers-info-title-text-skeleton" animation="wave" variant="rectangular" />
                                </div>
                                <div className="pricetracker-mytrackers-price-column-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-price-skeleton" animation="wave" variant="rectangular" />
                                </div>
                                <div className="pricetracker-mytrackers-delete-column-skeleton">
                                    <Skeleton className="pricetracker-mytrackers-delete-skeleton" animation="wave" variant="rectangular" />
                                </div>
                        </div>
                        
                        
{/*
                        <Typography variant="body1"  gutterBottom><Skeleton/></Typography>
                        <Typography variant="body2" sx={{ width: 100 }} gutterBottom><Skeleton/></Typography>
                        <Typography variant="body2"  gutterBottom><Skeleton/></Typography>
                        <Skeleton sx={{ height: 150}} animation="wave" variant="rectangular" />
                        <Typography variant="body1" gutterBottom><Skeleton/></Typography>
                        <Typography variant="body2" sx={{ width: 100 }} gutterBottom><Skeleton/></Typography> */}
                    </div>
                    :
                    myTrackers.length>0 && <div>
                        <Typography className="pricetracker-mytrackers-header"  variant="h4" gutterBottom>My trackers</Typography>
                        { myTrackers.map((tracker, i) =>
                        (
                            <div className="pricetracker-tracker" key = {i}>
                                <div className="pricetracker-mytrackers-info" id={tracker._id}>
                                    <div className="pricetracker-mytrackers-img-wrapper">
                                        <a className="pricetracker-mytrackers-img-link" href={tracker.url} target="_blank" rel="noopener noreferrer">
                                            <img  className="pricetracker-mytrackers-img" fetchpriority="high" src= {tracker.productInfo.imgSrc} alt="product"></img>
                                        </a>
                                    </div>
                                    <Typography className="pricetracker-mytrackers-title" variant="body1" >{tracker.productInfo.title}</Typography>
                                    {/* <Typography className="pricetracker-mytrackers-url" variant="body1" gutterBottom>{tracker.url}</Typography> */}
                                    <Typography className="pricetracker-mytrackers-price" variant="body1" >{tracker.productInfo.price+"€"}</Typography>
                                    <IconButton
                                        aria-label="more options"
                                        id="tracker-options"
                                        aria-controls={open ? 'tracker-options' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={setTrackerOptionsAnchor}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        elevation={2}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                          }}
                                          transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                          }}
                                        disableScrollLock={true}
                                        id="tracker-options"
                                        MenuListProps={{
                                        'aria-labelledby': 'tracker-options',
                                        }}
                                        anchorEl={trackerOptionAnchor}
                                        open={trackerOptionState}
                                        onClose={removeTrackerOptionsAnchor}
                                        // style={{ // Add here you negative margin
                                        //     marginLeft: "-40px"
                                        // }}
                                    >
                                        <MenuList dense>
                                            <MenuItem onClick={(e)=>{
                                                removeTrackerOptionsAnchor()
                                                deleteUserConfirmation(e)}}>
                                                <ListItemIcon>
                                                    <DeleteIcon  color="error" className="pricetracker-mytrackers-delete"/>
                                                </ListItemIcon>
                                                <ListItemText>Delete Tracker</ListItemText>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    {/* <DeleteIcon onClick={(e)=>deleteUserConfirmation(e)} color="error" className="pricetracker-mytrackers-delete"/> */}
                                </div>
                                {priceGraphData.length>0 && priceGraphData.length ===myTrackers.length && tracker.productInfo.prices.length>1 &&<div className="pricetracker-mytrackers-graph">
                                    <ResponsiveContainer width="100%" height="100%" >
                                        <LineChart
                                            data={priceGraphData[i].productInfo.prices}
                                            margin={{top: 0,right: 6,left: -12,bottom: 0,}}
                                            strokeWidth={2}
                                            >
                                            <XAxis strokeWidth={1} padding={{ left: 30, right: 30 }} stroke={style.getPropertyValue('--secondary-color').trim()} dataKey="date" />
                                            <YAxis hide={true} strokeWidth={1} type="number" stroke={style.getPropertyValue('--secondary-color').trim()} domain={['dataMin-2', 'dataMax+2']} />
                                            <Tooltip />
                                            <Line strokeWidth={2} type="monotone" dataKey="price" stroke={style.getPropertyValue('--secondary-color').trim()} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>}
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
            }
        </div>
    )
}