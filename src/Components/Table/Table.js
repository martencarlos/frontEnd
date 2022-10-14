
import "./table.css";
import Link from '@mui/material/Link';

export default function Table(props){
    

    return (
        
        <table>
            <tbody>
            <tr className="header">
                <th>Position</th>
                <th>Title</th>
                <th>Price</th>
                <th>Img</th>
                <th>Link</th>
            </tr>
            {props.data.map((item) => (
                <tr key={item.pos}>
                <td className="pos">{item.pos}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td><img className="table-product-img" fetchpriority="high" src= {item.imgSrc} alt="product"></img></td>
                <td><Link href={item.url} className="link" underline="always">Amazon</Link></td>
                </tr>
            ))}
            </tbody>
      </table>
    )
}




