
import "../css/card.css";


export default function Card(props){
    console.log("Rendering Card")
    
    return (
        <div id={props.item._id}  className="card">
            <span onClick= {props.deleteCard} className="card--delete">
                <i className="bi-x-lg" role="img"></i>
            </span>
            <img className="card--info-img"
                    src={props.item.image}
                    alt="cover"
            />
            <div className="card--info">
                <span className="card--stats">
                    <i className="bi-star" role="img"></i>
                        {props.item.stats.likes}
                </span>
                <span className="card--stats">
                        <i className="bi-eye"></i>
                        {props.item.stats.views}
                </span>
                <span className="card--stats">
                        <i className="bi-box-arrow-in-down"></i>
                        {props.item.stats.downloads}
                </span>
            </div>
            <div className={`card--profile ${props.darkMode ? "dark": ""}`}>
                <img className="card--profile--img"
                    src={props.item.author.pic}
                    alt="profile pic"
                />
                <div className="card--profile--text">
                    <h2 className="card--profile--text--h2">{props.item.title}</h2>
                    <p className="author"> <b>{props.item.author.firstName + " " + props.item.author.lastName}</b></p>
                </div>
            </div>
        </div>
    )
}