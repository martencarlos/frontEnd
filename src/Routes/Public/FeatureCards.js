
import "../../css/featurecards.css";
import Card from "../../Components/Card";
import React from "react"


export default function FeatureCards(props){
    console.log("Rendering Feature Cards")

    var [cards, setCards] = React.useState(
        ()=>JSON.parse(localStorage.getItem("cards")) || []
    )
    
    //Get the cards from Database - only once after render
    React.useEffect(() => {
        
        async function getData() {
            await fetch(`http://www.localhost/cards`,{
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
        </feature>
    )
}