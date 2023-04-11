
import "./privacyPolicy.css";

import { useEffect} from "react"
import { Typography } from "@mui/material";

export default function PrivacyPolicy(props){

    console.log("Rendering PrivacyPolicy")

    //Set title of page
    useEffect(() => {
        document.title = "Webframe - "+ props.title;
        return () => {
            document.title = "Webframe"
        }
    }, [props.title])

    return (
        <div className= {`PrivacyPolicy ${props.darkMode ? "dark": ""}`}>
            <br></br>
            <Typography variant="h4" gutterBottom>
                Privacy Policy
            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                Introduction
            </Typography>
            
            <Typography variant="body1" gutterBottom>
                This Privacy Policy outlines how we collect, use, and protect personal
                information obtained through our web application. By accessing or using
                our web application, you agree to the terms of this Privacy Policy.
            </Typography>
            
            <Typography variant="h6" gutterBottom>
                Personal Information Collection
            </Typography>
            <Typography variant="body1" gutterBottom>
                We may collect personal information such as name, email address, and
                other contact details when you use our web application. We only collect
                information that is necessary to provide our services and we will only
                use this information for the purposes stated in this Privacy Policy.
            </Typography>

            <Typography variant="h6" gutterBottom>
                Use of Personal Information
            </Typography>
            <Typography variant="body1" gutterBottom>
                We use personal information collected through our web application to
                provide our services, to communicate with users about our products and
                services, and to improve our web application. We will never sell or share
                your personal information with third parties without your consent,
                except as required by law.
            </Typography>

            <Typography variant="h6" gutterBottom>
                Cookies
            </Typography>
            <Typography variant="body1" gutterBottom>
                Our web application may use cookies to improve the user experience.
                Cookies are small text files that are stored on your device and contain
                information about your use of our web application. You can disable
                cookies in your browser settings, but this may affect the functionality
                of our web application.
            </Typography>

            <Typography variant="h6" gutterBottom>
                Security
            </Typography>
            <Typography variant="body1" gutterBottom>
                We take the security of your personal information seriously and use
                appropriate measures to protect it from unauthorized access, disclosure,
                alteration, or destruction. However, no method of transmission over the
                Internet, or method of electronic storage, is 100% secure and we cannot
                guarantee its absolute security.
            </Typography>

            <Typography variant="h6" gutterBottom>
                Changes to Privacy Policy
            </Typography>
            <Typography variant="body1" gutterBottom>
                We may update this Privacy Policy from time to time. If we make material
                changes, we will notify you by email or by posting a notice on our web
                application. Your continued use of our web application after any changes
                to this Privacy Policy will constitute your acceptance of such changes.
            </Typography>

            <Typography variant="h6" gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="body1" gutterBottom>
                If you have any questions or concerns about this Privacy Policy or our
                use of your personal information, please contact us at
                martencarlos@gmail.com.
            </Typography>
            <br></br>
        </div>
    )
}