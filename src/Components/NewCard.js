
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
                pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                firstName: "Carlos",
                lastName: "Marten"
            }
        }
    )

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
        <newcard is="x3d" className={props.darkMode ? "dark" : ""}>
            <div className="newcard--form">
                <h1>Add a new card</h1>
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
                    <button onClick={() => {props.handleClick(formData)}}>Add Item</button>
                    
                </div>
            </div>
            {urlIsImage(formData.image) && <Card
                    darkMode = {props.darkmode}
                    item = {formData}
                />}
        </newcard>
    )
}