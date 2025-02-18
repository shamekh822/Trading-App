import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Login() {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");  

    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleLogin = async (event:any) => {
        event.preventDefault(); 

        try {
            const response = await axios.post('http://localhost:8000/user/login', formData);
            console.log("Login Success:", response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/home')

        } catch (err:any) {
            if (err.response) {
                console.log("Error: ", err.response.data);
                setError(err.response.data.error || "An error occurred during login. Please Sign Up if you don't have an account.");
            } else {
                console.log("Error: ", err.message);
                setError("The server could not be reached.");
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Log In</button>
            </form>
            <div>
                <Link to="/signup">SignUp</Link>
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}
