
import "./footer.css";

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer(props){
    console.log("Rendering Footer")
    
    const year= new Date().getFullYear()

    return (
        <footer id="footer" className={props.darkMode ? "dark" : ""}>
            <Typography id="footer-brand" variant="body1"  className="footer-brand">
                © {year} Webframe Inc
            </Typography>

            <ul id="footer-links" className="footer-links">
                <li className="nav-item">
                    <Link underline="hover" href="/features" >Features</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/blog">Blog</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/privacyPolicy" >Privacy</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/about" >About</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="https://status.webframe.one/" >Status</Link>
                </li>
            </ul>
        </footer>
    )
}