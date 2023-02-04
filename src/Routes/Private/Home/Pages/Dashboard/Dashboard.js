 
import "./dashboard.css";

import {useState, useEffect, useRef} from "react";
import axios from "axios";

import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LoginIcon from '@mui/icons-material/Login';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    

    //UserData     
    const [userAnalytics, setUserAnalytics] = useState()
    const totalUsers = useRef(0)
    const [users, setUsers] = useState()
    const totalLogins = useRef(0)
    

    //Set title of page
    useEffect(() => {
        document.title = "Webframe - " + props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])


    //Get all users from the database
    useEffect(() => {
        console.log("useEffect - get users")
        const fetchUsers = async () => {
            await axios.get(`${process.env.REACT_APP_SERVER}/users`)
              .then(function (res) {
                    var graphData = []
                    totalUsers.current = res.data.length
                    totalLogins.current=0;
                    months.map(function (month, i) {
                        
                        let monthlyUsers = 0;
                        
                        res.data.filter((item) => {
                            
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


    return (
        
        <div className="dashboard">
            <div className="widget-row">
                <div className="widget" >
                    <div className="widget-header">
                        <LoginIcon className="widget-title"/>
                        {/* <Typography className="widget-title" variant="subtitle1" gutterBottom>New Users</Typography> */}
                        <Typography className="widget-year" variant="subtitle1" gutterBottom>{currentYear}</Typography>
                    </div>
                    { userAnalytics &&
                        <ResponsiveContainer width="100%" height="100%" >
                            <LineChart
                                data={userAnalytics}
                                margin={{top: 5,right: 30,left: 20,bottom: 5,}}
                                strokeWidth={2}
                                >
                                <XAxis padding={{ left: 30, right: 30 }} stroke="#f17e5b" dataKey="month" />
                                <Tooltip />
                                <Line strokeWidth={2} type="monotone" dataKey="users" stroke="#f17e5b" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    }
                </div>
            </div>
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
                                <LineChart
                                    data={userAnalytics}
                                    margin={{top: 5,right: 30,left: 20,bottom: 5,}}
                                    strokeWidth={2}
                                    >
                                    <XAxis padding={{ left: 30, right: 30 }} stroke="#8884d8" dataKey="month" />
                                    <Tooltip />
                                    <Line strokeWidth={3} type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        }
                    </div>
                </div>

                <div className="widget-half-row">
                    <div className="mini-widget" >
                        <div className="mini-widget-header">
                            <PeopleAltIcon className="mini-widget-icon"/>
                            <Typography className="mini-widget-title" variant="body1" >Total Users</Typography>
                        </div>
                        <Typography className="mini-widget-data" variant="h2" >{totalUsers.current}</Typography>
                    </div>

                    <div className="mini-widget" >
                        <div className="mini-widget-header">
                            <LoginIcon className="mini-widget-icon"/>
                            <Typography className="mini-widget-title" variant="body1" >Total Logins</Typography>
                        </div>
                        <Typography className="mini-widget-data" variant="h2" >{totalLogins.current}</Typography>
                    </div>
                </div>
            </div>
            <div className="widget-row-data">
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
        </div>
                
    )
}