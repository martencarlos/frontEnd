 
import "./users.css";

import {useState, useEffect, useRef} from "react";
import axios from "axios";

import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export default function Users(props){

    console.log("Rendering Users")

    const [users, setUsers] = useState()
    const selectedRows = useRef();
    // const [loading, setLoading] = useState(true)
    
   

    //Get all users from the database
    useEffect(() => {
        console.log("useEffect - get users")
        const fetchUsers = async () => {
            await axios.get(`${process.env.REACT_APP_SERVER}/users`)
              .then(function (res) {
                    
                    //change the '_id' key for 'id' to be able to display in data grid. + reformat dates
                    res.data = res.data.map(function(obj) {
                        
                        obj.createDate = new Date(Date.parse(obj.createDate)).toLocaleDateString();
                        obj.lastUpdate = new Date(Date.parse(obj.lastUpdate)).toLocaleDateString();
                        obj['id'] = obj['_id']; // Assign new key
                        delete obj['_id']; // Delete old key
                        return obj;
                    });
                    
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
        { field: 'actions', headerName: 'Actions', width: 80, renderCell: (params)=>{
            return (
                <div className="datagrid-actions">
                    <EditIcon className="clickable-icon"/>
                    <DeleteIcon className="clickable-icon"/>
                </div>
            )
        } }
      ];
      
      
      
    return (
        <div className="users">
            <Typography className="page-title" variant="h4"  gutterBottom> All Users </Typography>
            <div className="users-pannel">
                {users && 
                <div style={{ height: 482, width: '100%' }}>
                    <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    density={"compact"}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        selectedRows.current = users.filter((user) =>{return selectedIDs.has(user.id.toString())}
                        );
                      }}
                    />
                </div>}
            </div>
      </div>
                
    )
}