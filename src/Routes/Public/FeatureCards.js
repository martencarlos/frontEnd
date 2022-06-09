
import "../../css/featurecards.css";
import Card from "../../Components/Card";
import React from "react"
import axios from "axios";
import {getCookie} from "../../Util/Cookie";

export default function FeatureCards(props){
    console.log("Rendering Feature Cards")
    
    var [cards, setCards] = React.useState([])
    
    //Get the cards from Database - only once after render
    React.useEffect(() => {
        async function getData() {
            await fetch(process.env.REACT_APP_SERVER+`/cards`,{
                method: 'GET',
                credentials: 'include'
              })
            .then(response => response.json())
            .then(data =>{
                 if(!data.error)
                    setCards(data)
             }) 
        }
        getData()
      }, [])

      async function deleteCard(e){
        const card = e.target.parentElement.parentElement
        
        if(props.login && getCookie("me")){
            const me =JSON.parse(getCookie("me"))
            const deleteInfo={
                userID: me._id,
                cardID: card.id
            }
            
            await fetch(process.env.REACT_APP_SERVER+`/deletecard`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                credentials: 'include',
                body: JSON.stringify(deleteInfo)
              })
              .then(function(response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();
              }).then(function(data) {
                const {message} =data
                console.log(message); 
                if(message === "card deleted"){
                    card.parentElement.removeChild(card)
                }else{
                    alert(message)
                }
              });
        }else{
            alert("Please login to delete a card")
        }
    }

    //Display cards
    function cardElements(darkmode){
        return cards.map(mycard => {
            return <Card
                    key = {mycard._id}
                    darkMode = {darkmode}
                    item = {mycard}
                    deleteCard={deleteCard}
                    showDeleteButton = {true}
                />
            })
        }

    return (
        <feature is="x3d" className={props.darkMode ? "dark" : ""}>
            <h1>Feature Cards</h1>
            <section className="cards-list">
                {cardElements (props.darkMode)}
            </section>
        </feature>
    )
}