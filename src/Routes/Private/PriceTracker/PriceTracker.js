
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
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Skeleton from '@mui/material/Skeleton';
import { LineChart, Line, XAxis, YAxis,  Tooltip, ResponsiveContainer } from 'recharts'; // CartesianGrid,Legend, 
import Modal from '@mui/material/Modal';
import TooltipMui from '@mui/material/Tooltip';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuList from '@mui/material/MenuList';

export default function Pricetracker(props){

    console.log("Rendering Price Tracker")

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    var style = getComputedStyle(document.body)
    
    // const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    const [newTrackerLoading, setNewTrackerLoading] = useState(false)
    const [deleteTrackerLoading, setDeleteTrackerLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)

    const [userData, setUserData] = useState({})
    const [formData, setFormData] = useState({userID: "", url:""})
    const [priceGraphData, setPriceGraphData] = useState([])
    const [myTrackers, setMyTrackers] = useState([])
    
    //confirmation dialog
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const deletetrackerID = useRef();
    // const isMobile = navigator.userAgentData.mobile;
    
    //tracker options menu
    const [trackerOptionAnchor, setTrackerOptionAnchor] = useState(null);
    const trackerOptionState = Boolean(trackerOptionAnchor);
    const setTrackerOptionsAnchor = (event) => {
        deletetrackerID.current =event.currentTarget.parentNode.id
        setTrackerOptionAnchor(event.currentTarget);
    };
    const removeTrackerOptionsAnchor = () => {
        setTrackerOptionAnchor(null);
    };

    //redirect to login page if logged out
    useEffect(() => {
        console.log("useEffect - check if logged in")
        if(!props.login)
            navigate("/login",{ replace: true });
    }, [props.login, navigate])

    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])

    //CSS - fixed navbar
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

    //event listener - Enter key press to submit URL
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
    }, [props.login])

    //load trackers
    useEffect(() => {
        console.log("get all trackers")

        async  function fetchTrackers(){
            await fetch(process.env.REACT_APP_SERVER+'/mytrackers',{
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }).then((response) => response.json())
            .then((data) => {
                if(!data.error){
                    console.log("Debug - my trackers response data:")
                    // console.log(data)
                    // console.log(localStorage.getItem("myTrackers"))
                    if (localStorage.getItem("myTrackers") !== JSON.stringify(data)){
                        console.log("DEBUG - ENTER COMPARISON")
                        localStorage.setItem("myTrackers", JSON.stringify(data))
                        setMyTrackers(data)
                    }
                    // setPageLoading(false)
                }
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

        if(props.login){
            if(localStorage.getItem("myTrackers") !== null){
                console.log("myTrackers from local storage")
                setMyTrackers(JSON.parse(localStorage.getItem("myTrackers")))
                fetchTrackers()
            }else
                fetchTrackers()
        }
            
    }, [navigate, props.login])
    
    //set user/form data
    useEffect(() => {
        console.log("setting user data")
        if(props.userData._id !== undefined){
            setUserData(props.userData)
            setFormData({userID: props.userData._id, url:""})
        }
    }, [props.userData])
    //set price graph from My trackers
    useEffect(() => {
        const months = ["jan", "feb", "mar", "apr", "may","jun", "jul", "aug", "sep", "oct", "nov", "dec"];
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
            // setPageLoading(false)
        }
    }, [myTrackers])
    
    //state change - delete confirmation dialog (open)
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
    //state change - delete confirmation dialog (cancel)
    function cancel(){
        handleClose()
    }
    //state change - form data
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    //add tracker
    function addTracker(){
        if(isInputValid()){
            setNewTrackerLoading(true)
            var newTracker = { ...formData };

            const config = {
                url: process.env.REACT_APP_SERVER+'/newtracker',
                method: 'POST',
                // timeout:5000,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.SERVER,
                },
                data: JSON.stringify(newTracker),
                withCredentials: true, // Now this is was the missing piece in the client side
            };

            axios(config).then(async function (response) {
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

                    //Update user data
                    const newUserData = JSON.parse(JSON.stringify(userData));
                    newUserData.trackers.push({trackerId:response.data._id, subscribed:false})
                    
                    setUserData(newUserData)
                    props.updateUserData(newUserData)

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
    //add tracker (auxiliar - validation)
    function isInputValid (){
        // check if url is valid
        if(formData.url ===""){
            const variant = 'error'
            enqueueSnackbar("URL is empty",{ variant });
            return false
        }else if(!String(formData.url).toLowerCase().match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&=]*)/gi)){
            const variant = 'error'
            enqueueSnackbar("URL is invalid",{ variant });
            return false
        }else if(!formData.url.startsWith("https://www.amazon.") && !formData.url.startsWith("https://amzn.eu/")&& !formData.url.startsWith("https://a.co/")){
            const variant = 'error'
            enqueueSnackbar("It needs to be an Amazon URL",{ variant });
            return false
        }else
            return true
    }

    //delete tracker
    function deleteTracker(){
        var trackerIDToDelete =deletetrackerID.current;
        setDeleteTrackerLoading(true)
        setMyTrackers(myTrackers.filter(x => x._id !== trackerIDToDelete));
        localStorage.setItem("myTrackers", JSON.stringify(myTrackers.filter(x => x._id !== trackerIDToDelete)))
        setDeleteTrackerLoading(false)
        handleClose()
        // delete request to server to delete from DB
        const config = {
            url: process.env.REACT_APP_SERVER+'/deletetracker',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({userID:userData._id ,trackerID:trackerIDToDelete}),
            withCredentials: true, // Now this is was the missing piece in the client side
        };

        axios(config).then(function (response) {
            console.log(response.data)
             if(response.data === "deleted"){
                 
                 const variant = 'success'
                 enqueueSnackbar("tracker deleted from database",{ variant });

             }else if(response.data.error){
                //auth error
                console.log(response.data.error)
                navigate("/logout",{ replace: true });

             }else{
                const variant = 'error'
                enqueueSnackbar("unexpected error",{ variant });
             }

        }).finally(()=>{
            
        }).catch(function (error) {
            const variant = 'error'
            enqueueSnackbar(error.message,{ variant });
            console.log(error);
        });

    }

    //update subscription
    function priceTrackerSubscriptionToggle(e){
        //getting notified
        console.log(deletetrackerID.current)
        
        const trackerIDForSubscription = deletetrackerID.current;
        
        //delete request to server to delete from DB
        const config = {
            url: process.env.REACT_APP_SERVER+'/tracker-subscribe',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({userID:userData._id ,trackerID:trackerIDForSubscription}),
            withCredentials: true, // Now this is was the missing piece in the client side
        };

        axios(config).then(function (response) {
            console.log(response.data)
            // console.log(userData.trackers)
            const newUserData = JSON.parse(JSON.stringify(userData));
            let variant
            if(response.data==="Subscribed"){
                newUserData.trackers[userData.trackers.findIndex(obj => obj.trackerId === deletetrackerID.current)].subscribed= true
                variant = 'success'
            }else if(response.data==="Unsubscribed"){
                newUserData.trackers[userData.trackers.findIndex(obj => obj.trackerId === deletetrackerID.current)].subscribed= false
                variant = 'info'
            }else{
                variant = 'error'
            }
                
            //re-render
            // setMyTrackers(prevTrackers => {
            //     return [
            //         ...prevTrackers
            //     ]
            // })
            props.updateUserData(newUserData)
            setUserData(newUserData)
            
            //console.log(userData.trackers)
            enqueueSnackbar(response.data,{ variant });

            //  if(response.data === "deleted"){
            //      setMyTrackers(myTrackers.filter(x => x._id !== trackerIDToDelete));

            //      const variant = 'success'
            //      enqueueSnackbar("tracker deleted",{ variant });

            //  }else if(response.data.error){
            //     //auth error
            //     console.log(response.data.error)
            //     navigate("/logout",{ replace: true });

            //  }else{
            //     const variant = 'error'
            //     enqueueSnackbar("unexpected error",{ variant });
            //  }

        }).finally(()=>{
            
        }).catch(function (error) {
            const variant = 'error'
            enqueueSnackbar(error.message,{ variant });
            console.log(error);
        });
    }
    
    //RENDER
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
                        <div style={{transform: "translate(0px, -15px)",display:"flex", justifyContent:"center"}}>
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
            <Menu
                className={`priceTrackerMenu ${props.darkMode ? "dark": ""}` }
                elevation={2}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                    }}
                    transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                    }}
                // disableScrollLock={()=>{if(!isMobile){return true}}}
                
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
                <MenuList  dense>
                {deletetrackerID.current && userData.trackers[userData.trackers.findIndex(obj => obj.trackerId === deletetrackerID.current)].subscribed ?
                    <MenuItem id="css-paper-list-icon" onClick={(e)=>{
                        removeTrackerOptionsAnchor()
                        priceTrackerSubscriptionToggle(e)}}>
                        <ListItemIcon>
                            <NotificationsOffOutlinedIcon   className="pricetracker-mytrackers-delete"/>
                        </ListItemIcon>
                        {/* <ListItemText>{userData.trackers[userData.trackers.findIndex(obj => obj.trackerId === deletetrackerID.current)]._id}</ListItemText> */}
                            <ListItemText>Unsubscribe</ListItemText>
                            
                    </MenuItem>
                    :
                    <MenuItem onClick={(e)=>{
                        removeTrackerOptionsAnchor()
                        priceTrackerSubscriptionToggle(e)}}>
                        <ListItemIcon>
                            <NotificationsNoneOutlinedIcon   className="pricetracker-mytrackers-delete"/>
                        </ListItemIcon>
                        {/* <ListItemText>{userData.trackers[userData.trackers.findIndex(obj => obj.trackerId === deletetrackerID.current)]._id}</ListItemText> */}
                            <ListItemText>Subscribe</ListItemText>
                    </MenuItem>
                    }
                    <MenuItem onClick={(e)=>{
                        removeTrackerOptionsAnchor()
                        deleteUserConfirmation(e)}}>
                        <ListItemIcon>
                            <DeleteIcon style={{ color: '#9e1b32' }}  className="pricetracker-mytrackers-delete"/>
                        </ListItemIcon>
                        <ListItemText>Delete Tracker</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
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
                        
                        <div className="pricetracker-mytrackers-info-skeleton">
                            <Skeleton className="pricetracker-mytrackers-graph-skeleton" animation="wave" variant="rectangular" />
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
                        <div className="pricetracker-mytrackers-info-skeleton">
                            <Skeleton className="pricetracker-mytrackers-graph-skeleton" animation="wave" variant="rectangular" />
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
                        <Typography variant="body2" sx={{ width: 100 }} gutterBottom><Skeleton/></Typography> 
                    */}
                    </div>
                    :
                    myTrackers.length>0 &&
                    <div>
                        <Typography className="pricetracker-mytrackers-header"  variant="h4" gutterBottom>My trackers</Typography>
                        { myTrackers.map((tracker, i) =>(
                            <div className="pricetracker-tracker" key = {i}>
                                <div className="pricetracker-mytrackers-info" id={tracker._id}>
                                    <div className="pricetracker-mytrackers-img-wrapper">
                                        <a className="pricetracker-mytrackers-img-link" href={tracker.url} target="_blank" rel="noopener noreferrer">
                                        {tracker.productInfo.outOfStock ?
                                            // <div className="pricetracker-mytrackers-img-outofstock-container">
                                            //     <img  className="pricetracker-mytrackers-img" fetchpriority="high" src= {tracker.productInfo.imgSrc} alt="product"></img>
                                            //     <div className="pricetracker-mytrackers-img-outofstock">Out of stock</div>
                                            // </div>
                                            <div className="pricetracker-mytrackers-img-outofstock-container">
                                                <img  className="pricetracker-mytrackers-img" fetchpriority="high" src= {tracker.productInfo.imgSrc} alt="product"></img>
                                                <img  className="pricetracker-mytrackers-img-outofstock" fetchpriority="high" src= "https://firebasestorage.googleapis.com/v0/b/webframe-one.appspot.com/o/outofstock.png?alt=media&token=24514c3d-8009-4032-b71b-73266851d609" alt="outofstock"></img>
                                            </div>
                                            :
                                            <img  className="pricetracker-mytrackers-img" fetchpriority="high" src= {tracker.productInfo.imgSrc} alt="product"></img>
                                        }
                                        </a>
                                        
                                    </div>
                                    <div className="container">
                                        <Typography className="pricetracker-mytrackers-title" variant="body1" >{tracker.productInfo.title}</Typography>
                                        {userData.trackers[userData.trackers.findIndex(obj => obj.trackerId === tracker._id)].subscribed && 
                                            <TooltipMui title="subscribed" placement="right">
                                                <NotificationsOutlinedIcon className="subscribe-bell"/>
                                            </TooltipMui>
                                        }
                                    </div>
                                    {/* <Typography className="pricetracker-mytrackers-url" variant="body1" gutterBottom>{tracker.url}</Typography> */}
                                    
                                    <Typography className="pricetracker-mytrackers-price" variant="body1" >{tracker.productInfo.price+tracker.productInfo.currency}</Typography>
                                        
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
                                            <Line strokeWidth={2} type="monotone" dataKey="price" stroke={style.getPropertyValue('--secondary-color').trim()}  />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>}
                            </div>
                        ))}
                    </div>
                    }
                </div>
            </div>
            }
        </div>
    )
}