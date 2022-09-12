
import "./infinityCards.css";

import ImageCard from "../../../Components/ImageCard/ImageCard";
import {useState, useEffect,useRef} from "react"
import {getCookie} from "../../../Util/Cookie";

export default function FeatureCards(props){
    console.log("Rendering Feature Cards")
    
    var postsPerPage = 8;
    var postNumber = 0;

    const cardsLength = useRef(0);

    const [posts, setPosts] = useState([...Array(0).keys()]); 
    const [cards, setCards] = useState([])
    
    // Assign the cardsLength
    useEffect(function(){
        cardsLength.current=cards.length
        postNumber = postNumber + postsPerPage;
        // Last posts
        if(postNumber>=cardsLength.current){
            postNumber = cardsLength.current
            // window.removeEventListener("scroll",handleScroll)
        }
        setPosts([...Array(postNumber).keys()]);
    }, [cards])

    //Get the cards from Database - only once after render
    useEffect(() => {
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

    //Infinity Scroll
    useEffect(() => {
        function handleScroll() { 
            let documentHeight = document.body.scrollHeight;
            let currentScroll = window.scrollY + window.innerHeight;
            // When the user is [modifier]px from the bottom, fire the event.
            let modifier = 50; 
            if(currentScroll + modifier > documentHeight) {
            
            // var isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight; 
            // if (isAtBottom) { 
                postNumber = postNumber + postsPerPage;
                // Last posts
                if(postNumber>=cardsLength.current){
                    postNumber = cardsLength.current
                    window.removeEventListener("scroll",handleScroll)
                }
                setPosts([...Array(postNumber).keys()]);
            }
        } 
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
                if(message === "card deleted"){
                    // var successMessage = document.getElementById('cardAddedSuccessMessage');
                    card.classList.add("removed-item");
                    
                    setTimeout(function() {
                        // This will execute 5 seconds later
                        card.parentElement.removeChild(card)
                    }, 400);
                    
                }else{
                    alert(message)
                }
              });
        }else{
            alert("Please login to delete a card")
        }
    }

    //Display cards
    // function cardElements(darkmode){
    //     return cards.map(mycard => {
    //         return <Card
    //                 key = {mycard._id}
    //                 darkMode = {darkmode}
    //                 item = {mycard}
    //                 deleteCard={deleteCard}
    //                 showDeleteButton = {true}
    //             />
    //         })
    //     }

    return (
        <feature is="x3d" className={props.darkMode ? "dark" : ""}>
            {/* <h1>My Cards</h1> */}
            {/* <section className="cards-list"> */}
                {/* {cardElements (props.darkMode)} */}
            {/* </section> */}
            <h1>All Cards</h1>
            <div className="board">
                {cards.length !==0 && posts.map((item, i) => ( 
                    <ImageCard
                    key = {cards[i]._id}
                    darkMode = {props.darkmode}
                    item = {cards[i]}
                    deleteimageCard={deleteCard}
                    showDeleteButton = {true}
                    />
                ))}
            </div>
        </feature>
    )
}