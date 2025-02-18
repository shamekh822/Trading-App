import React from "react";
import { Link } from "react-router-dom"; 

export default function Navbar() {
    return (
        <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ display: 'inline', margin: '0 10px' }}>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'black' }}>About</Link>
                </li>
                <li style={{ display: 'inline', margin: '0 10px' }}>
                    <Link to="/contact" style={{ textDecoration: 'none', color: 'black' }}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
}
