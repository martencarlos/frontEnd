
import "./product.css";
import Link from '@mui/material/Link';

export default function Product(props){
    
    return (
        
        <div className="product-table">
            
            {props.data.map((item) => (
                <tr className="product-row" key={item.pos}>
                    <td className="product-column">{item.pos}</td>
                    <td className="product-column"><img className="table-product-img" fetchpriority="high" src= {item.imgSrc} alt="product"></img></td>
                    <td className="product-title">{item.title}</td>
                    <div className="product-mobile-bundle"> 
                        <td className="product-column">{item.price}</td>
                        <td className="product-column"><Link href={item.url} className="link" underline="always">Amazon</Link></td>
                    </div>
                </tr>
            ))}
      </div>
    )
}




