
import "./footer.css";

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer(props){
    console.log("Rendering Footer")
    
    const year= new Date().getFullYear()

    return (
        <footer className={props.darkMode ? "dark" : ""}>
            <Typography variant="body1" gutterBottom className="footer-brand">
                © {year} Webframe Inc
            </Typography>

            <ul className="footer-links">
                <li className="nav-item">
                    <Link underline="hover" href="/features" >Features</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/blog">Blog</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/about" >About</Link>
                </li>
            </ul>
        </footer>
    )
}