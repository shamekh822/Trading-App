import React, { useState, useEffect, useRef} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import io from 'socket.io-client';
import {jwtDecode} from 'jwt-decode';  // Correct import for jwtDecode

// Initialize the socket connection
const socket = io('http://localhost:8000');

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
    creator: string;  // Directly stores user ID
    offers: string[]; // Array of offer IDs
    acceptedOffer?: string;
}

interface Offer {
    _id: string;
    user: string;  // User ID of the offer creator
    itemsOffered: string[];
    cashOffered: number;
    trade: string;
}

interface CustomJwtPayload {
    userId: string;
    iat?: number;
    exp?: number;
}

export default function SpecificTrade() {
    const { id } = useParams<{ id: string }>();
    const [trade, setTrade] = useState<Trade | null>(null);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [authToken, setAuthToken] = useState("");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState<Record<string, User>>({});
    const fetchedOfferIdsRef = useRef<Set<string>>(new Set());
    

    useEffect(() => {
        // Auth token and user ID fetching
        const token = localStorage.getItem("token") || "";
        setAuthToken(token);
        if (token) {
            const decoded: CustomJwtPayload = jwtDecode(token);
            setUserId(decoded.userId);
        }
    }, []);

    useEffect(() => {
        // Fetching trade details and setting up socket listeners
        // This will be used to track the offers that have been fetched
        // to prevent adding duplicates

        const fetchTradeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/trade/details/${id}`);
                setTrade(response.data);
                // New set to track offer IDs for this fetch operation
                const newFetchedOfferIds = new Set<string>();
                response.data.offers.forEach((offerId: string) => {
                    if (!fetchedOfferIdsRef.current.has(offerId)) {
                        fetchOfferDetails(offerId);
                        newFetchedOfferIds.add(offerId); // Add to the new local set
                    }
                });
                fetchedOfferIdsRef.current = newFetchedOfferIds; // Update the ref with the new set
            } catch (error) {
                console.error("Error fetching trade details:", error);
            }
        };


        fetchTradeDetails();


        socket.on('newOffer', (offerId: string) => {
            if (!fetchedOfferIdsRef.current.has(offerId)) {
                fetchOfferDetails(offerId);
                fetchedOfferIdsRef.current.add(offerId);
            }
        });

        socket.on('offerAccepted', (offerId: string) => {
            if (userId === trade?.creator) {
                alert('An offer has been accepted.');
                // Refresh trade details or handle accepted offer
                fetchTradeDetails();
            }
        });

        return () => {
            socket.off('newOffer');
            socket.off('offerAccepted');
        };
    }, [id, userId]); 

    useEffect(() => {
        // Joining and leaving the trade room
        socket.emit('joinTradeRoom', id);
        return () => {
            socket.emit('leaveTradeRoom', id);
        };
    }, [id]); // This effect only runs when id changes


    const fetchOfferDetails = async (offerId: string) => {
        try {
          const response = await axios.get(`http://localhost:8000/offer/details/${offerId}`);
          const offerData: Offer = response.data;
          setOffers(prevOffers => [...prevOffers, offerData]);
      
          // After fetching the offer, fetch the user details if not already in the `users` state
          if (!users[offerData.user]) {
            const userResponse = await axios.get(`http://localhost:8000/user/user-details`);
            const userData: User = userResponse.data;
            setUsers(prevUsers => ({ ...prevUsers, [offerData.user]: userData }));
          }
        } catch (error) {
          console.error("Error fetching offer details:", error);
        }
    };


    const acceptOffer = (offerId: string) => {
        socket.emit('acceptOffer', { tradeId: id, offerId });
    };

    const rejectOffer = (offerId: string) => {
        socket.emit('rejectOffer', { tradeId: id, offerId });
    };

    if (!trade) {
        return <div>Loading...</div>;
    }

    const isCreator = userId === trade.creator; 

    return (
        <div>
            <h1>Title of the item: {trade.title}</h1>
            <p>Description: {trade.description}</p>
            <p>Conditions: {trade.conditions}</p>
            {isCreator && (
                <div>
                    <h2>Incoming Offers</h2>
                    {offers.map((offer) => (
                        <div key={offer._id}>
                            {/* Render the username using the users state */}
                            <p>{users[offer.user]?.username || 'User'} offers ${offer.cashOffered} and items: {offer.itemsOffered.join(', ')}</p>
                            <button onClick={() => acceptOffer(offer._id)}>Accept</button>
                            <button onClick={() => rejectOffer(offer._id)}>Reject</button>
                        </div>
                    ))}
                </div>
            )}
            {!isCreator && <Link to={`/create-offer/${trade._id}`}>Create Offer</Link>}
        </div>
    );
}