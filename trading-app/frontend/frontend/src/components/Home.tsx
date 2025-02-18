import React from "react";
import { Link } from "react-router-dom";
import '../Design/TradingApp/css/home.css'; // Make sure to provide the correct path to your CSS file

export default function Home() {
    return (
        <div className="hero">
            <div className="hero-overlay">
                <h1>Home Page</h1>
                <div className="link-container"> 
                    <Link to="/browse">Browse</Link>
                    <Link to="/profile">Display your profile</Link>
                    <Link to="/create-trade">Create Trade</Link>
                </div>
            </div>
        </div>
    );
}