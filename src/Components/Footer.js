
import "../css/footer.css";

export default function Footer(props){
    console.log("Rendering Footer")
    return (
        <footer className={props.darkMode ? "dark" : ""}>
            
            <section className="ft-legal">
                <ul className="ft-legal-list">
                <li><a href="/">Terms &amp; Conditions</a></li>
                <li><a href="/">Privacy Policy</a></li>
                <li>&copy; 2022 Copyright Webframe Inc.</li>
                </ul>
            </section>
        </footer>

        
    )
}