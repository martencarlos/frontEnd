
import "../css/featurecards.css";
import Card from "./Card";
import React from "react"
import NewCard from "./NewCard";
import axios from "axios";

export default function FeatureCards(props){
    console.log("Rendering Feature Cards")

    var [cards, setCards] = React.useState(
        ()=>JSON.parse(localStorage.getItem("cards")) || []
    )
    
    //Get the cards from Database - only once after render
    React.useEffect(() => {
        console.log("Loading cards from DB")
        async function getData() {
          await fetch(`http://www.localhost/cards`)
            .then(response => response.json())
            .then(data =>{
                setCards(data)
            }) 
        }
        getData()
      }, [])

    
    React.useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
        console.log("Set local storage if cards array is changed")
    }, [cards])

    
    //Add new card
    function addCard(newCard) {
        console.log("Added new card");
        console.log(newCard)

        
        const config = {
            url: 'http://www.localhost/cards',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(newCard),
        };
        axios(config) 
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        setCards(prevCards => {
            return [
                ...prevCards,
                newCard
            ]
        })
    }
    
    //Display cards
    function cardElements(darkmode){
        return cards.map(mycard => {
            return <Card
                    key = {mycard._id}
                    darkMode = {darkmode}
                    item = {mycard}
                />
            })
        }

    return (
        <feature is="x3d" className={props.darkMode ? "dark" : ""}>
            <h1>Feature Cards</h1>
            <section className="cards-list">
                {cardElements (props.darkMode)}
            </section>
            <NewCard 
                darkMode = {props.darkMode}
                handleClick = {addCard}
            />
        </feature>
    )
}