import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", username: "", password: "" });
    const [error, setError] = useState("");

    function handleInputChange(event:any) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    async function handleSignUp(event:any) {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/user/signup', formData);
            console.log("SignUp Success:", response.data);
            navigate('/login');
        } catch (err:any) {
            if (err.response) {
                // Handle errors returned from the backend
                console.log("Error: ", err.response.data);
                setError(err.response.data.error || "An error occurred during sign up.");
            } else {
                // Handle errors not caught by the backend
                console.log("Error: ", err.message);
                setError("The server could not be reached.");
            }
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        name="name"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={formData.username}
                        name="username"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        name="password"
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
