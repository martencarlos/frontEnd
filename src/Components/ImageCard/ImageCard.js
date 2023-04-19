
import "./imageCard.css";


export default function imageCard(props){
    console.log("Rendering imageCard")
    
    return (
        <div id={props.item._id}  className="imageCard">
            {props.showDeleteButton && <span onClick= {props.deleteimageCard} className="imageCard--delete">
                <i className="bi-x-lg" role="img"></i>
            </span>}
            <img  className="imageCard--info-img"
                    src={props.item.image}
                    alt="cover"
            />
            {/* <div className="imageCard--info">
                <span className="imageCard--stats">
                    <i className="bi-star" role="img"></i>
                        {props.item.stats.likes}
                </span>
                <span className="imageCard--stats">
                        <i className="bi-eye"></i>
                        {props.item.stats.views}
                </span>
                <span className="imageCard--stats">
                        <i className="bi-box-arrow-in-down"></i>
                        {props.item.stats.downloads}
                </span>
            </div> */}
            <div className={`imageCard--profile ${props.darkMode ? "dark": ""}`}>
                <img  className="imageCard--profile--img"
                    src={props.item.author.pic}
                    alt="profile pic"
                />
                <div className="imageCard--profile--text">
                    <h2 className="imageCard--profile--text--h2">{props.item.title}</h2>
                    <p className="imageCard--profile--author"> <b>{props.item.author.firstName + " " + props.item.author.lastName}</b></p>
                </div>
            </div>
        </div>
    )
}