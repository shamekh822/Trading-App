import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Trade {
  _id: string;
  title: string;
  description: string;
  conditions: string[];
  creator?: { _id: string; username: string; };  // Modify as needed based on actual data
}

export default function Browse() {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchTrades();
    }, []);

    const fetchTrades = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/trade/browse?search=${search}`);
            setTrades(response.data);
        } catch (error) {
            console.error("Error fetching trades:", error);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearch = () => {
        fetchTrades();
    };

    return (
        <div>
            <h1>Browse Trades</h1>
            <input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {trades.map(trade => (
                    <li key={trade._id}>
                        <Link to={`/trades/${trade._id}`}>
                            {trade.title} - View Details
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
