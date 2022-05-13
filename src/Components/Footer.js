
import "../css/footer.css";

export default function Footer(props){
    return (
        <footer className={props.darkMode ? "dark" : ""}>
            
            <section class="ft-legal">
                <ul class="ft-legal-list">
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li>&copy; 2022 Copyright Webframe Inc.</li>
                </ul>
            </section>
        </footer>

        
    )
}