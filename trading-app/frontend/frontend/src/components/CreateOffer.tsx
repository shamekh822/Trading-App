import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CreateOffer() {
    const { tradeId } = useParams<{ tradeId: string }>();
    const [cashOffered, setCashOffered] = useState("");
    const [message, setMessage] = useState("");
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token") || "";
        setAuthToken(token);
    }, []);

    const handleInputChange = (event:any) => {
        setCashOffered(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('tradeId:', tradeId); // Add this line to log the tradeId
        if (!authToken) {
            setMessage("No authentication token found.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/offer/createOffer', {
                cashOffered: parseFloat(cashOffered),
                tradeId
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setMessage(`Offer Created Successfully! Offer ID: ${response.data.offer._id}`);
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.message || "An unknown error occurred";
            setMessage(`Failed to create offer: ${errorMessage}`);
        }
    };
    
    return (
        <div>
            <h1>Create Offer</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cash Offered:</label>
                    <input
                        type="number"
                        name="cashOffered"
                        value={cashOffered}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Create Offer</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
