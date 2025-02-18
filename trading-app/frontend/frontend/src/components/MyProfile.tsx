import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';


interface User {
    _id: string; 
    name: string;
    username: string;
    password: string; 
    numberOfItemsOwned: number;
    trades: string[];
}

interface Trade {
    _id: string;
    title: string;
    description: string;
    conditions: string[];
    creator: string; 
    offers: string[];
    acceptedOffer?: string;
}

interface Offer {
    _id: string;
    user: string; 
    itemsOffered: string[];
    cashOffered: number;
    trade: string;
}
  
  

  
export default function MyProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    fetchUserProfile();
    fetchUserTrades();
    fetchUserOffers();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/user-details', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in local storage
        }
      });
      console.log(response.data)
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const fetchUserTrades = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/user-trades', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in local storage
        }
      });

      console.log(response.data)
      setTrades(response.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const fetchUserOffers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/user-offers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in local storage
        }
      });
      setOffers(response.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Username: {user?.username}</p>
      <h2>My Trades</h2>
      <ul>
        {trades.map(trade => <li key={trade._id}>{trade.title}</li>)}
      </ul>
      <h2>My Offers</h2>
      <ul>
        {offers.map(offer => <li key={offer._id}>Offer on trade {offer._id} for ${offer.cashOffered}</li>)}
      </ul>
      <Link to="/create-trade">Create New Trade</Link>
      <br />
      <Link to="/changePassword">Change Password</Link>
    </div>
  );
}
