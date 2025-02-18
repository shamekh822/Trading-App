import React from "react";

export default function Contact() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Contact Us</h1>
            <p>If you have any questions or need support, feel free to reach out to us:</p>
            <ul>
                <li>Email: <a href="mailto:support@yourtradingapp.com">support@yourtradingapp.com</a></li>
                <li>Phone: +1 123 456 7890</li>
                <li>
                    Follow us on social media:
                    <ul>
                        <li><a href="https://facebook.com/yourtradingapp">Facebook</a></li>
                        <li><a href="https://twitter.com/yourtradingapp">Twitter</a></li>
                        <li><a href="https://instagram.com/yourtradingapp">Instagram</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
