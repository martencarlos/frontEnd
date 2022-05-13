
import "../css/featurecards.css";
import Card from "./Card";
import React from "react"
import NewCard from "./NewCard";
import cardsData from "../raw/cardsData.js";

export default function FeatureCards(props){
    
    var [cards, setCards] = React.useState(
        ()=>JSON.parse(localStorage.getItem("cards")) || cardsData
    )
    
    React.useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
        console.log("Set local storage if cards array is changed")
    }, [cards])

    
    function addCard(newCard) {
        console.log("Added new card");
        console.log(newCard)
        setCards(prevCards => {
            return [
                ...prevCards,
                newCard
            ]
        })
    }
    
    function cardElements(darkmode){
        return cards.map(mycard => {
            return <Card
                    darkMode = {darkmode}
                    item = {mycard}
                />
            })
        }

    return (
        <feature className={props.darkMode ? "dark" : ""}>
            <h1>Feature Cats</h1>
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