
import "./footer.css";

export default function Footer(props){
    console.log("Rendering Footer")
    
    const year= new Date().getFullYear()

    return (
        <footer className={props.darkMode ? "dark" : ""}>
            <div className="footer-brand">
                © {year} Webframe Inc
            </div>

            <ul className="footer-links">
                <li className="nav-item">
                    <a href="#" className="">Features</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="">Blog</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="">About</a>
                </li>
            </ul>
        </footer>
    )
}