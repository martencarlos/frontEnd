
import "./product.css";
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';

export default function Product(props){
    
    return (
        
        <div className="product-table">
            
            {props.data.map((item) => (
                <div className="product-row" key={item.pos}>
                    <div className="product-column">{item.pos}</div>
                    <div className="product-column"><img className="table-product-img" fetchpriority="high" src= {item.imgSrc} alt="product"></img></div>
                    <div className="product-title">{item.title}</div>
                    <div className="product-mobile-bundle"> 
                        <div className="product-column">{item.price}</div>
                        <div className="product-column">
                            <a href={item.url} className="chip-link">
                                <Chip color="primary" variant="filled" label="Details"/>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
      </div>
    )
}




