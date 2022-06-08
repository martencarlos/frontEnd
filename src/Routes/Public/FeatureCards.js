
import "../../css/featurecards.css";
import Card from "../../Components/Card";
import React from "react"
import axios from "axios";

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

      function deleteCard(e){
        console.log("deleting card")
        console.log(e.target.parentElement.parentElement.id)
        }

    //Display cards
    function cardElements(darkmode){
        return cards.map(mycard => {
            console.log(mycard)
            return <Card
                    key = {mycard._id}
                    darkMode = {darkmode}
                    item = {mycard}
                    deleteCard={deleteCard}
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