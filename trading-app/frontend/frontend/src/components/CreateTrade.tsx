import React, { useState } from "react";
import axios from "axios";

interface FormData {
    title: string;
    description: string;
    conditions: string[];
}

export default function CreateTrade() {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        conditions: [],
    });
    const [conditionInput, setConditionInput] = useState("");
    const [message, setMessage] = useState("");
    const [authToken, setAuthToken] = useState("");

    React.useEffect(() => {
        const token = localStorage.getItem("token") || "";
        setAuthToken(token);
    }, []);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    function handleConditionChange(event: React.ChangeEvent<HTMLInputElement>) {
        setConditionInput(event.target.value);
    }

    function handleAddCondition() {
        if (!conditionInput) return; // Prevent adding empty conditions
        setFormData(prevFormData => ({
            ...prevFormData,
            conditions: [...prevFormData.conditions, conditionInput]
        }));
        setConditionInput(""); // Clear the condition input after adding
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/trade/create-trade', formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setMessage(`Trade Created Successfully! Trade ID: ${response.data.trade._id}`);
        } catch (err: any) {
            setMessage("Failed to create trade: " + (err.response?.data?.error || err.message));
        }
    }

    return (
        <div>
            <h1>Create Trade</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Conditions:</label>
                    <input
                        type="text"
                        value={conditionInput}
                        onChange={handleConditionChange}
                    />
                    <button type="button" onClick={handleAddCondition}>Add Condition</button>
                </div>
                {formData.conditions.map((condition, index) => (
                    <div key={index}>{condition}</div>
                ))}
                <button type="submit">Create Trade</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
