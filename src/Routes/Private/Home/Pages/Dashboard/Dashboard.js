 
import "./dashboard.css";

import {useState, useEffect, useRef} from "react";
import axios from "axios";

import Typography from '@mui/material/Typography';
import {useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LoginIcon from '@mui/icons-material/Login';
import SellIcon from '@mui/icons-material/Sell';
import { DataGrid } from '@mui/x-data-grid';
import TooltipMUI from '@mui/material/Tooltip';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { BarChart, Bar, AreaChart, Area,  XAxis,  Tooltip,  ResponsiveContainer } from 'recharts'; // LineChart, Line, YAxis, CartesianGrid,Legend,

const months = ["jan", "feb", "mar", "apr", "may","jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const currentYear = new Date().getFullYear()

const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'avatar', headerName: 'Avatar', width: 60, renderCell: (params)=>{
        return (
            <img className="datagrid-mini-avatar" src={params.row.profilePic} alt={"avatar"}></img>
        )
    } },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'createDate', headerName: 'Create Date', width: 130 },
    { field: 'lastUpdate', headerName: 'Last Update', width: 130 },
    { field: 'lastLogin', headerName: 'Last Login', width: 130 },
    { field: 'logins', headerName: 'Total Logins', width: 110 },
    { field: 'role', headerName: 'Role', width: 110 },
];

export default function Dashboard(props){

    console.log("Rendering Dashboard")
    const navigate = useNavigate();

    //UserData     
    const [userAnalytics, setUserAnalytics] = useState()
    const [trackerAnalytics, setTrackerAnalytics] = useState()
    const totalUsers = useRef(0)
    const [users, setUsers] = useState()
    const totalLogins = useRef(0)
    const activeSessions = useRef(0)
    
    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;

        return () => {
            document.title = "Webframe"
        }
    }, [props.title])

    //get tracker info from db
    useEffect(() => {
        
        async function fetchTrackers(){
            const config = {
                url: process.env.REACT_APP_SERVER+'/mytrackers',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.SERVER,
                },
                withCredentials: true, // Now this is was the missing piece in the client side 
            };
            axios(config).then(function (response) {
                if(response.data.error){
                    //Auth error
                    console.log(response.data.error)
                    navigate("/logout",{ replace: true });
                }else{
                    setTrackerAnalytics(response.data)
                    var graphData = []
                    months.forEach(function (month, i) {
                        let monthlyTracker =0
                        response.data.forEach((item) => {
                                
                            if(i===0 && item.logins){
                                totalLogins.current +=  item.logins
                            }
                            let date = new Date(Date.parse(item.createDate))
                            if(date.getFullYear() === currentYear)
                                if(date.getMonth()+1 === i+1)
                                    monthlyTracker += 1
                        });
                        let obj = {}
                        obj.trackers = monthlyTracker
                        obj.month = month
                        graphData.push(obj)
                    })
                    setTrackerAnalytics(graphData)
                }
                
            })
        }
        fetchTrackers()
    }, [props.title,navigate])

    useEffect(() => {
        activeSessions.current=0;
        const today = new Date((new Date()).getTime())
        console.log(props.userData)
        if(props.userData.sessions){
            props.userData.sessions.forEach(function(session){
                var expireDate = new Date((session.expireDate))
                if(expireDate>today){
                    activeSessions.current += 1
                }
            })
        }
    }, [props.userData])

    //Get all users from the database
    useEffect(() => {
        console.log("useEffect - get users")
        const fetchUsers = async () => {
            const config = {
                url: process.env.REACT_APP_SERVER+'/users',
                method: 'GET',
          
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.SERVER,
                },
                withCredentials: true, // Now this is was the missing piece in the client side 
                
            };
            await axios(config)
              .then(function (res) {
                    var graphData = []
                    totalUsers.current = res.data.length
                    totalLogins.current=0;
                    
                    months.forEach(function (month, i) {
                        
                        let monthlyUsers = 0;
                        
                        res.data.forEach((item) => {
                            
                            if(i===0 && item.logins){
                                totalLogins.current +=  item.logins
                            }
                            let date = new Date(Date.parse(item.createDate))
                            if(date.getFullYear() === currentYear)
                                if(date.getMonth()+1 === i+1)
                                    monthlyUsers += 1
                        });

                        let obj = {}
                        obj.users = monthlyUsers
                        obj.month = month
                        graphData.push(obj)
                        
                    })

                    //change the '_id' key for 'id' to be able to display in data grid. + reformat dates
                    res.data = res.data.map(function(obj) {
                        
                        obj.createDate = new Date(Date.parse(obj.createDate)).toLocaleDateString();
                        obj.lastUpdate = new Date(Date.parse(obj.lastUpdate)).toLocaleDateString();
                        obj.lastLogin = new Date(Date.parse(obj.lastLogin)).toLocaleDateString();
                        obj['id'] = obj['_id']; // Assign new key
                        delete obj['_id']; // Delete old key
                        return obj;
                    });
                    setUserAnalytics(graphData)
                    setUsers(res.data);
                  
                //   setLoading(false)
  
              })
              .catch(function (error) {
                  // handle error
                  console.log(error);
                //   setLoading(false)
              })
              .finally(function (response) {});
          };
        
          if (true) fetchUsers();
        
    }, [])

    function openUsers(){
        navigate("/home/users");
    }

    var style = getComputedStyle(document.body)

    return (
        <div className="dashboard">
            {props.userData.role === 'admin' ? 
                <div style={{width:'100%'}}>
                    <Typography className="page-title" variant="h5"  gutterBottom> Users </Typography>
                    <br></br>
                    <div className="widget-row">
                
                    <div className="widget-half-row">
                        <div className="widget" >
                            <div className="widget-header">
                                <PeopleAltIcon className="widget-title"/>
                                {/* <Typography className="widget-title" variant="subtitle1" gutterBottom>New Users</Typography> */}
                                <Typography className="widget-year" variant="subtitle1" gutterBottom>{currentYear}</Typography>
                            </div>
                            { userAnalytics &&
                                <ResponsiveContainer width="100%" height="100%" >

                                    <BarChart width={150} height={40} data={userAnalytics} margin={{top: 5,right: 30,left: 20,bottom: 5,}}>
                                        <XAxis padding={{ left: 30, right: 30 }} stroke={style.getPropertyValue('--primary-color').trim()} dataKey="month" />
                                        <Bar dataKey="users" fill={style.getPropertyValue('--primary-color').trim()} />
                                        <Tooltip />
                                    </BarChart>
                                    {/* <LineChart
                                        data={userAnalytics}
                                        margin={{top: 5,right: 30,left: 20,bottom: 5,}}
                                        strokeWidth={2}
                                        >
                                        <XAxis padding={{ left: 30, right: 30 }} stroke="#8884d8" dataKey="month" />
                                        <Tooltip />
                                        <Line strokeWidth={3} type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 6 }} />
                                    </LineChart> */}
                                </ResponsiveContainer>
                            }
                        </div>
                    </div>

                    <div className="widget-half-row">
                        <div id="total-users" onClick={openUsers} className="mini-widget" >
                            <div className="mini-widget-header">
                                <PeopleAltIcon className="mini-widget-icon"/>
                                <Typography className="mini-widget-title" variant="body1" >Total Users</Typography>
                            </div>
                            <Typography className="mini-widget-data" variant="h2" >{totalUsers.current}</Typography>
                        </div>

                        <div className="mini-widget">
                            <div className="mini-widget-header">
                                <LoginIcon className="mini-widget-icon"/>
                                <Typography className="mini-widget-title" variant="body1" >Total Logins</Typography>
                            </div>
                            <Typography className="mini-widget-data" variant="h2" >{totalLogins.current}</Typography>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
            :
            <div style={{width:'100%'}}>
                    <Typography className="page-title" variant="h5"  gutterBottom> My info </Typography>
                    <br></br>
                    <div className="widget-row">
                        <div className="widget-half-row">
                        <div className="mini-widget">
                            <div className="mini-widget-header">
                                <LoginIcon className="mini-widget-icon"/>
                                <Typography className="mini-widget-title" variant="body1" >Total Logins</Typography>
                            </div>
                            <Typography className="mini-widget-data" variant="h2" >{props.userData.logins}</Typography>
                        </div>
                        <div className="mini-widget">
                            <div className="mini-widget-header">
                                <VpnKeyIcon className="mini-widget-icon"/>
                                <Typography className="mini-widget-title" variant="body1" >Active Sessions</Typography>
                            </div>
                            <Typography className="mini-widget-data" variant="h2" >{activeSessions.current}</Typography>
                        </div>
                        
                        </div>
                        <div className="widget-half-row">
                            {/* <div className="mini-widget"></div>
                            <div className="mini-widget"></div> */}
                        </div>
                    </div>
            </div>
            }
            {props.userData.role === 'admin' && <div className="widget-row-data">
                <div className="data-widget">
                    {users && 
                    <div style={{ height: 482, width: '100%' }}>
                        <DataGrid
                        rows={users}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        density={"compact"}
                        disableSelectionOnClick
                        />
                    </div>}
                </div>
            </div>
            }
            <br></br>
            <Typography className="page-title" variant="h5"  gutterBottom> Price tracker </Typography>
            <br></br>
            <div className="widget-row">
                <div className="widget">
                    <div className="widget-header">
                        <TooltipMUI title="my trackers" placement="right">
                            <SellIcon id="title" className="widget-title"/>
                        </TooltipMUI>
                        {/* <Typography className="widget-title" variant="subtitle1" gutterBottom>New Users</Typography> */}
                        <Typography id="title" className="widget-year" variant="subtitle1" gutterBottom>{currentYear}</Typography>
                    </div>
                    { trackerAnalytics &&
                        <ResponsiveContainer width="100%" height="100%" >
                            <AreaChart
                                data={trackerAnalytics}
                                margin={{top: 5,right: 30,left: 20,bottom: 5,}}
                                strokeWidth={2}
                                >
                                <XAxis padding={{ left: 30, right: 30 }} stroke={style.getPropertyValue('--secondary-color').trim()} dataKey="month" />
                                <Tooltip />
                                <Area strokeWidth={1} type="monotone" dataKey="trackers" stroke={style.getPropertyValue('--secondary-color').trim()} fillOpacity={0.6} fill={style.getPropertyValue('--secondary-color').trim()} activeDot={{ r: 6 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    }
                </div>
            </div>
            
            <br></br>

            
        </div>
                
    )
}