
import "./footer.css";

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { useTranslation } from "react-i18next";

export default function Footer(props){
    console.log("Rendering Footer")
    const { t } = useTranslation("global");
    
    const year= new Date().getFullYear()

    return (
        <footer id="footer" className={props.darkMode ? "dark" : ""}>
            <Typography id="footer-brand" variant="body1"  className="footer-brand">
                © {year} Webframe Inc
            </Typography>

            <ul id="footer-links" className="footer-links">
                <li className="nav-item">
                    <Link underline="hover" href="/features" >{t("footer.features")}</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/blog">{t("footer.blog")}</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/privacyPolicy" >{t("footer.privacy")}</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/about" >{t("footer.about")}</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="https://status.webframe.one/" >{t("footer.status")}</Link>
                </li>
            </ul>
        </footer>
    )
}