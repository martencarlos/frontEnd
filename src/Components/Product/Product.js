
import "./product.css";
import Link from '@mui/material/Link';

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
                        <div className="product-column"><Link href={item.url} className="link" underline="always">Amazon</Link></div>
                    </div>
                </div>
            ))}
      </div>
    )
}




