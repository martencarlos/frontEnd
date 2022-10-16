 
import "./dashboard.css";

import {useState, useEffect, useRef} from "react";
import axios from "axios";

import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const months = ["jan", "feb", "mar", "apr", "may","jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const currentYear = new Date().getFullYear()

export default function Dashboard(props){

    console.log("Rendering Dashboard")
    

    //UserData     
    const [userAnalytics, setUserAnalytics] = useState()
    const totalUsers = useRef(0)
    
    //Get all users from the database
    useEffect(() => {
        console.log("useEffect - get users")
        const fetchUsers = async () => {
            await axios.get(`${process.env.REACT_APP_SERVER}/users`)
              .then(function (res) {
                    var graphData = []
                    totalUsers.current = res.data.length
                    
                    months.map(function (month, i) {
                        
                        let monthlyUsers = 0;
                        
                        res.data.filter((item) => {
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
                    setUserAnalytics(graphData)
                  
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
            
            <div className="widget" >
                <div className="widget-header">
                    <PeopleAltIcon className="widget-title"/>
                    {/* <Typography className="widget-title" variant="subtitle1" gutterBottom>New Users</Typography> */}
                    <Typography className="widget-year" variant="subtitle1" gutterBottom>{currentYear}</Typography>
                </div>
                <ResponsiveContainer width="100%" height="100%" >
                    <LineChart
                        data={userAnalytics}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        strokeWidth={2}
                    >
                    
                        <XAxis padding={{ left: 30, right: 30 }} stroke="#8884d8" dataKey="month" />
                        
                        <Tooltip />
                        
                        <Line strokeWidth={3} type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                    
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="mini-widget" >
                
                <div className="mini-widget-header">
                    <PeopleAltIcon className="mini-widget-icon"/>
                    <Typography className="mini-widget-title" variant="body1" >Total Users</Typography>
                </div>
                <Typography className="mini-widget-data" variant="h2" >{totalUsers.current}</Typography>
            </div>
            

        </div>
                
    )
}