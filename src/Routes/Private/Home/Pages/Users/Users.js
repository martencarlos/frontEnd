 
import "./users.css";

import {useState, useEffect, useRef} from "react";
import axios from "axios";

import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';


export default function Users(props){

    console.log("Rendering Users")

    const [users, setUsers] = useState()
    const [notification, setNotification] = useState(false)
    const [loading, setLoading] = useState(true)

    const selectedRows = useRef();
    const deleteUserId = useRef();
    const notificationMessage = useRef();
    
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
                    
                    //change the '_id' key for 'id' to be able to display in data grid. + reformat dates
                    res.data = res.data.map(function(obj) {
                        
                        obj.createDate = new Date(Date.parse(obj.createDate)).toLocaleDateString();
                        obj.lastUpdate = new Date(Date.parse(obj.lastUpdate)).toLocaleDateString();
                        obj.lastLogin = new Date(Date.parse(obj.lastLogin)).toLocaleDateString();
                        obj['id'] = obj['_id']; // Assign new key
                        delete obj['_id']; // Delete old key
                        return obj;
                    });
                    
                    setUsers(res.data);
                    setLoading(false)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
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
        { field: 'lastLogin', headerName: 'Last Login', width: 130 },
        { field: 'logins', headerName: 'Total Logins', width: 110 },
        { field: 'role', headerName: 'Role', width: 110 },
        { field: 'actions', headerName: 'Actions', width: 80, renderCell: (params)=>{
            return (
                <div className="datagrid-actions">
                    <EditIcon onClick={editUser} className="clickable-icon"/>
                    <DeleteIcon onClick={()=>deleteUserConfirmation(params.row.id)} color="error" className="clickable-icon"/>
                </div>
            )
        } }
    ];
      
    function editUser(){
        console.log("edit user")
    }

    function deleteUserConfirmation(id){
        deleteUserId.current = id;
        handleOpen()
    }
    function cancel(){
        deleteUserId.current = 0;
        handleClose()
    }

    function deleteUser(){
        console.log("deleting user: "+deleteUserId.current)
        
        const config = {
            url: process.env.REACT_APP_SERVER+'/deleteUser',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {"deleteUserId": deleteUserId.current,
                    "adminUserId": props.userData._id},
            withCredentials: true, // Now this is was the missing piece in the client side 
            
        };

        axios(config) 
            .then(function (response) {
                console.log(response.data);
                if(response.data.message === "user deleted"){
                    setUsers(users.filter(user => user.id !== deleteUserId.current));
                }
                notificationMessage.current = response.data.message
                setNotification(true)
                
                handleClose()
            }).finally(()=>{
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleCloseNotif(){
            setNotification(false);
    }
      
    return (
        <div className="users">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="delete-confirmation">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete the selected user?
                    </Typography>
                    <br></br>
                    <br></br>
                    <div className="delete-confirmation-buttons">
                        <Button onClick={deleteUser} variant="contained" startIcon={<DeleteIcon />} color="error">Delete</Button>
                        <Button onClick={cancel} variant="contained" color="text">Cancel</Button>
                    </div>
                </div>
            </Modal>
            <br></br>
            <br></br>
            <Typography className="page-title" variant="h4"  gutterBottom> Manage Users </Typography>
            
            {loading ? 
                <div className="skeleton-users-pannel">
                    <Skeleton variant="rectangular" width={'100%'} height={482} />
                </div>
            :
            <div className="users-pannel">
                {users && 
                <div style={{ height: 482, width: '100%' }}>
                    <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    density={"compact"}
                    disableSelectionOnClick
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        selectedRows.current = users.filter((user) =>{return selectedIDs.has(user.id.toString())}
                        );
                      }}
                    />
                </div>}
            </div>
        }
            <Snackbar open={notification} autoHideDuration={6000} onClose={handleCloseNotif} >
                <Alert severity="info" sx={{ width: '100%' }}>
                    {notificationMessage.current}
                </Alert>
            </Snackbar>
            
      </div>
                
    )
}