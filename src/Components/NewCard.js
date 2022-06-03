
import "../css/newcard.css";
import React from "react"
import Card from "./Card";



export default function NewCard(props){
    console.log("Rendering NewCard")
    
    const [formData, setFormData] = React.useState(
        {
            title: "", 
            image: "",
            stats:{
                likes: 0,
                views: 0,
                downloads: 0
            },
            author:{
                pic: props.userData.profilepic,
                firstName: localStorage.getItem("firstName"),
                lastName: ""
            }
        }
    )

    React.useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            author:{
                firstName: props.userData.name,
                lastName:"",
                pic: props.userData.profilepic
            }
        }))
      }, [props.userData])

    function urlIsImage(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    function handleChange(event) {
        
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
        
    }

    return (
        <div className={`newcard ${props.darkMode ? "dark": ""}`}>
            <div className="newcard--form">
                <h2>Add a new card</h2>
                <div className="newcard--input">
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        required="required"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <input
                        name="image"
                        type="url"
                        placeholder="image url"
                        required="required"
                        value={formData.image}
                        onChange={handleChange}
                    />
                    <button onClick={() => {props.handleClick(formData)}}>Add Card</button>
                </div>
            </div>
            {urlIsImage(formData.image) && <div className="cardPreview">
                <Card
                    darkMode = {props.darkmode}
                    item = {formData}
                />
            </div>}
        </div>
    )
}