import React, { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    username: "",
    currentPassword: "",
    newPassword: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleInputChange(event:any) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleSubmit(event:any) {
    event.preventDefault();

    // Reset message and error state
    setMessage("");
    setError("");

    try {
      const response = await axios.post('http://localhost:8000/user/changePassword', formData);
      setMessage(response.data.message);
    } catch (err:any) {
      setError(err.response ? err.response.data.error : err.message);
    }
  }

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
