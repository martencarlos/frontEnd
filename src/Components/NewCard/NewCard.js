
import "./newcard.css";

import Card from "../ImageCard/ImageCard";
import {useState, useEffect} from "react"

import {resizeFile} from "../../Util/ImageProcessing";
import axios from "axios";

export default function NewCard(props){
    console.log("Rendering NewCard")
    console.log(props.userData._id)
    const [formData, setFormData] = useState(
        {
            title: "title will be generated", 
            image: "",
            stats:{
                likes: 0,
                views: 0,
                downloads: 0
            },
            author:{
                pic: props.userData.profilePic,
                firstName: props.userData.name,
                lastName: "",
                authorid: props.userData._id
            }
        }
    )
    const[formErrors,setFormErrors] = useState({
        title:"",
        image: "",
    })
    
    const[success,setSuccess] = useState(false)

    useEffect(() => {
        console.log("entering success useEffect")
        console.log(success)
        if(success){
            var successMessage = document.getElementById('cardAddedSuccessMessage');
            successMessage.style.visibility = 'visible'
            
            setTimeout(function() {
                // This will execute 5 seconds later
                console.log("executing")
                successMessage.style.visibility = 'hidden'
                setSuccess(false)
            }, 2000);
        }
        
      }, [success])

    useEffect(() => {
        
        setFormData(prevFormData => ({
            ...prevFormData,
            title:"title will be generated",
            author:{
                firstName: props.userData.name,
                lastName:"",
                pic: props.userData.profilePic,
                authorid: props.userData._id
            }
        }))
        
      }, [props.userData])

    // function urlIsImage(url) {
    //     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    // }

    // function handleChange(event) {
    //     const {name, value} = event.target
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         title: "title will be generated",
    //         [name]: value
    //     }))
    // }

    const processImage = async (e) => {
        var file = e.target.files[0];
        if(file){
            //Process Image
            var blobImage
            try {
                blobImage = await resizeFile(file,240,288);
            } catch (error) {
                alert("File not supported - please select an image \n" + error)
                return;
            }
            
            //create formData and append image
            var form_data = new FormData();
            form_data.append("cardCoverImage",blobImage,file.name);

            //Upload the file
            axios.post(process.env.REACT_APP_SERVER+'/setCardCoverImage',form_data,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'enc-type': 'multipart/form-data',
                },
                onUploadProgress: (event)=>{
                    // const totalUploaded = Math.floor((event.loaded / event.total) * 100)
                    // setUploadProgress(totalUploaded)
                },
                withCredentials: true, 
                }) 
            .then(function (response) {
                
                if(response){
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        title: "title will be generated",
                        image: response.data.url
                    }))
                }
            }).finally(function(response){
                // const input = document.getElementById("input")
                // document.body.removeChild(input)
            })
            .catch(function (error) {
                console.log(error);
            }
            );
        }else{
            setFormData(prevFormData => ({
                ...prevFormData,
                image: ''
            }))
        }
    }

    function validate(){
        //event.preventDefault();
        const currentErrors = validateForm()
        setFormErrors(currentErrors)

        if(Object.keys(currentErrors).length===0){
            
            props.handleClick(formData)
            setSuccess(true)
            setFormData(prevFormData => ({
                ...prevFormData,
                image: '',
                title:''
            }))
            document.getElementById('chosenCardImage').value= null
        }
    }

    function validateForm(){
        
        const errors= {}
        
        if(!formData.title){
            errors.title = "Title is required"
        }
        if(!formData.image){
            errors.image = "Image is required"
        }
        
        return errors
    }

    return (
        <div className={`newcard ${props.darkMode ? "dark": ""}`}>
            <div className="newcard--form">
                <h2>Add a new card</h2>
                <div className="newcard--input">
                    {/* <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        required="required"
                        value={formData.title}
                        onChange={handleChange}
                    /> */}
                    {formErrors.title && <label className="newCard-error">{formErrors.title}</label>}
                    <input
                        name="image"
                        type="file"
                        className="newCard-form-imageInput"
                        id="chosenCardImage"
                        required="required"
                        onChange={processImage}
                    />
                    {formErrors.image && <label className="newCard-error">{formErrors.image}</label>}
                    <button className="newCard-AddCard" onClick={validate}>Add Card</button>
                    <p id="cardAddedSuccessMessage" className="newCard-success">Card added successfully !</p>
                    {/* <button onClick={() => {props.handleClick(formData)}}>Add Card</button> */}
                </div>
            </div>
            {formData.image && <div className="cardPreview">
                <Card
                    darkMode = {props.darkmode}
                    item = {formData}
                    showDeleteButton = {false}
                />
            </div>}
        </div>
    )
}